"use client";
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import avatars from "../../chat/avatarsIterator";

const Poll = dynamic(() => import("../../chat/poll/Poll"), {
  ssr: false,
});
const ChangeAvatar = dynamic(
  () => import("../../chat/changeAvatars/changeAvatar"),
  {
    ssr: false,
  }
);
const EmojiaAndGifs = dynamic(() => import("./emojiAndGifs/EmojiaAndGifs"), {
  ssr: false,
});

const UserInfo = dynamic(() => import("../../chat/userInfo/UserInfo"), {
  ssr: false,
});
const SelectColor = dynamic(
  () => import("../../chat/userInfo/selectColor/SelectColor"),
  {
    ssr: false,
  }
);
const Popup = dynamic(() => import("../../popupWrapper/Popup"), {
  ssr: false,
});

// import avatars from "./avatarsIterator";
// import ChangeAvatar from "./changeAvatars/changeAvatar";
import classes from "./chat.module.css";
import ChatBody from "./chatBody/ChatBody";
import ChatBottom from "./chatBottom/ChatBottom";
import ChatRules from "./chatRules/ChatRules";
import ChatTop from "./chatTop/ChatTop";
// import EmojiaAndGifs from "./emojiAndGifs/EmojiaAndGifs";
// import Poll from "./poll/Poll";
// import UserInfo from "./userInfo/UserInfo";
// import { getData } from "@/utils/dashboardTablePagesFunctions";
// import SelectColor from "./userInfo/selectColor/SelectColor";
import Cookies from "js-cookie";
import { useSession } from "next-auth/react";
import io from "socket.io-client";
import axios from "axios";
import { getTimeRemainingInMinutes } from "@/app/lib/datesFunctions";
// import Popup from "../../popupWrapper/Popup";
// import TagUsers from "./tagUsers/TagUsers";

const Chat = ({
  chatRules,
  chatFilteredWords,
  chatMessages,
  exitExtenMode,
  setInputActive,
  mode,
}) => {
  const { data: session, status } = useSession();

  const scrollToBottom = () => {
    const chatContainer = messagesRef.current;
    console.log(
      "chatContainer chatContainer chatContainerchatContainer",
      chatContainer.scrollHeight
    );
    chatContainer.scrollTop = chatContainer.scrollHeight;
  };

  const socket = io(`${process.env.STATIC_SERVER}`);

  //show emojy and gifs pickers
  const [showEmojiesAndGifs, setShowEmojiesAndGifs] = useState(false);
  const [emojyOrGifs, setEmojyOrGifs] = useState("emojy");

  //chat mode
  const [chatMode, setChatMode] = useState(mode);

  //chat poll
  const [polls, setPolls] = useState([]);
  const [pollsRemainingTime, setPollsRemainingTime] = useState(false);

  // show username color
  const [showUsernameColor, setShowUsernameColor] = useState(false);

  // show user info and signin
  const [showUserInfo, setShowUserInfo] = useState(false);

  // intial values for user data
  const userFromCookies = Cookies.get("user");
  const initialAvatar = userFromCookies
    ? JSON.parse(userFromCookies)?.image
    : "/svg/chat/avatars/Avatars/222.svg";

  const initialName = userFromCookies
    ? JSON.parse(userFromCookies)?.name
    : "anonymous";
  const initialColor = userFromCookies
    ? JSON.parse(userFromCookies)?.color
    : null;

  const [selectedAvatar, setSelectedAvatar] = useState(
    session?.user?.image || initialAvatar
  );
  const [changeAvatar, setChangeAvatar] = useState(false);

  //chat room top selection
  const [chatRoomSelection, setChatRoomSelection] =
    useState("English (Default)");

  // message state
  const messageDefaultState = {
    username: session?.user?.name || initialName,
    message: "",
    image: session?.user?.image || initialAvatar,
    room: chatRoomSelection,
    color: session?.user?.color || initialColor,
  };
  const [message, setMessage] = useState(messageDefaultState);
  const inputRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const messagesRef = useRef(null);
  // show chat ruls
  const [showRules, setShowRules] = useState(true);

  // username color
  const [color, setColor] = useState(session?.user?.color || initialColor);

  const [slowModeRemainingSec, setSlowModeRemainingSec] = useState(false);
  //toggle functions
  const toggleChangeAvatar = () => {
    const { image } = message;
    setSelectedAvatar(image);
    setChangeAvatar(!changeAvatar);
  };
  const toggleUserInf = () => {
    setShowUserInfo(!showUserInfo);
  };
  const toggleUsernameColor = () => {
    const { color } = message;
    setColor(color);
    setShowUsernameColor(!showUsernameColor);
  };
  const confirmUserNameColor = async () => {
    try {
      const response = await axios.patch(
        `${process.env.BACKEND_SERVER}/users/regulerUsers/looks`,
        {
          user: {
            name: session?.user?.name || initialName,
            color: color,
          },
        }
      );
      console.log("response1", response);

      if (userFromCookies) {
        const pasedData = JSON.parse(userFromCookies);
        const newData = {
          ...pasedData,
          color: response?.data?.user?.color,
        };
        Cookies.remove("user");
        Cookies.set("user", JSON.stringify(newData));
      }
      console.log("response2", response);
      setMessage({ ...message, color: response?.data?.user?.color });
      setShowUsernameColor(!showUsernameColor);
      toggleUserInf();
    } catch (err) {
      console.log(
        "err happend while trying change your username color , please try again later"
      );
    }
  };

  const selectAvatar = async (avatar) => {
    if ((!session?.user?.name && !initialName) || initialName === "anonymous") {
      console.log("anon", avatar);
      setMessage({ ...message, image: avatar });

      setChangeAvatar(!changeAvatar);
      setSelectedAvatar(avatar);
      Cookies.set("user", JSON.stringify({ ...message, image: avatar }), {
        expires: 1,
      });

      return;
    }
    try {
      const response = await axios.patch(
        `${process.env.BACKEND_SERVER}/users/regulerUsers/looks`,
        {
          user: {
            name: session?.user?.name || initialName,
            image: avatar,
          },
        }
      );
      if (userFromCookies) {
        console.log("userFromCookies", userFromCookies);
        const parsedData = JSON.parse(userFromCookies);
        const newData = {
          ...parsedData,
          image: avatar,
        };
        Cookies.remove("user");
        console.log("newData", newData);

        Cookies.set("user", JSON.stringify(newData));
      }

      console.log("response", response);
      setMessage({ ...message, image: response?.data?.user?.image });
      toggleUserInf();
      setChangeAvatar(!changeAvatar);
      setSelectedAvatar(avatar);
    } catch (err) {
      console.log(
        "err happend while trying change your username color , please try again later"
      );
    }
  };
  // make sending effect
  const [isSending, setIsSending] = useState(false);
  const sendGif = async (gif) => {
    if (chatMode?.mode !== "Anyone Can Send" || slowModeRemainingSec) {
      return;
    }
    try {
      const response = await axios.post(`${process.env.BACKEND_SERVER}/chat`, {
        message: { ...message, message: gif },
      });
      socket.emit(`chat message ${chatRoomSelection}`, {
        ...message,
        message: gif,
      });
      setMessages((prevState) => {
        return [...prevState, { ...message, message: gif }];
      });
      scrollToBottom();
      setIsSending(true);
      setTimeout(() => {
        setIsSending(false);
      }, 500);
      if (chatMode.slowMode.value === true) {
        setSlowModeRemainingSec(true);
        setTimeout(() => {
          setSlowModeRemainingSec(false);
        }, 10000 * chatMode.slowMode.time);
      }
    } catch (err) {
      console.log("error", err);
    }
  };
  const handleClick = async () => {
    try {
      //  mode check
      if (chatMode?.mode !== "Anyone Can Send" || slowModeRemainingSec) {
        console.log("still remaining time ");
        return;
      }
      // const messageDestructure = { ...message };
      const response = await axios.post(`${process.env.BACKEND_SERVER}/chat`, {
        message: message,
      });
      console.log(response);
      socket.emit(`chat message ${chatRoomSelection}`, message);
      console.log("emited");
      setMessage({
        ...message,
        message: "",
      });

      setMessages((prevState) => {
        return [...prevState, message];
      });
      setIsSending(true);
      setTimeout(() => {
        scrollToBottom();
        setIsSending(false);
      }, 500);

      // slow mode update state
      if (chatMode.slowMode.value === true) {
        setSlowModeRemainingSec(true);
        setTimeout(() => {
          setSlowModeRemainingSec(false);
        }, 1000 * chatMode.slowMode.time);
      }
    } catch (err) {
      console.log("error", err);
    }
  };
  const rulesVisability = () => {
    setShowRules(false);
  };
  const displayEmojisAndGifs = () => {
    setShowEmojiesAndGifs(!showEmojiesAndGifs);
  };
  const inputMessageChange = (textMessage, emojie) => {
    if (!emojie) {
      setMessage({ ...message, message: textMessage });
    } else {
      setMessage({ ...message, message: message.message + textMessage });
    }
  };
  const setMentionSomeone = (mention) => {
    // setMentions((prevState)=>[...prevState, mention]);
    console.log("mention", mention);
    if (message?.message?.includes(`@${mention}`)) {
      return;
    }
    setMessage((prevState) => {
      if (!prevState.message.startsWith("@")) {
        return { ...prevState, message: `@${mention} ${prevState.message} ` };
      } else {
        const match = prevState.message.match(/@[^\s]+(\s+[^\s]+)*/);

        const taggedName = match[0];
        const indexOfLastSpace = taggedName.lastIndexOf(" ");
        console.log("indexOfLastSpace", indexOfLastSpace);
        if (indexOfLastSpace === -1) {
          return { ...prevState, message: `${prevState.message} @${mention} ` };
        } else {
          // Insert something after the last space
          const modifiedString =
            prevState.message.slice(0, indexOfLastSpace + 1) +
            `@${mention} ` +
            prevState.message.slice(indexOfLastSpace + 1);
          console.log("modifiedString", modifiedString);
          return { ...prevState, message: modifiedString };
        }
      }
    });

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  const chooseGifOrEmojies = (choose) => {
    setEmojyOrGifs(choose);
  };

  useEffect(() => {
    // Event listeners can be added here
    socket.on(`chat message English (Default)`, (msg) => {
      console.log("message recieved", msg);
      setMessages((prevState) => {
        return [...prevState, msg];
      });
      scrollToBottom();
    });
    socket.on(`chat mode`, (data) => {
      setChatMode(data);
    });
    socket.on(`chat poll`, (data) => {
      // const newPools = [data, ...polls];
      setPolls(data);

      const remaining = getTimeRemainingInMinutes(
        data[0]?.createdAt,
        data[0]?.time
      );
      console.log("remaining", data);
      setPollsRemainingTime(remaining);
      console.log("chat poll updated", data);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, [socket, chatRoomSelection, polls]);

  useEffect(() => {
    setMessage({
      message: "",
      image: session?.user?.image || initialAvatar,
      room: chatRoomSelection,
      username: session?.user?.name || initialName,
      color: session?.user?.color || initialColor,
    });
  }, [session, chatRoomSelection, initialAvatar, initialName, initialColor]);
  useEffect(() => {
    const fetchChatData = async () => {
      try {
        const chatPolls = await axios.get(
          `${process.env.BACKEND_SERVER}/chat/chatPoll`,
          {
            params: {
              sort: { createdAt: -1 },
            },
          }
        );

        const chatMode = await axios.get(
          `${process.env.BACKEND_SERVER}/chat/chatMode`
        );
        console.log("chatPolls?.data?.data", chatPolls?.data?.data);
        setChatMode(chatMode?.data?.data?.data[0]);
        setPolls(chatPolls?.data?.data?.data || []);
        // console.log("chat polls", chatPolls?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    const intervalId = setInterval(fetchChatData, 60000);

    // Clean up the interval to prevent memory leaks
    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    const getFirstData = async () => {
      try {
        const chatPolls = await axios.get(
          `${process.env.BACKEND_SERVER}/chat/chatPoll`,
          {
            params: { sort: { createdAt: -1 } },
          }
        );
        const response = await axios.get(`${process.env.BACKEND_SERVER}/chat`, {
          params: {
            limit: 10,
            room: "English (Default)",
            sort: { _id: -1 },
            mode: "normal",
          },
        });
        setMessages(response?.data?.data?.data.reverse());

        setPolls(chatPolls?.data?.data);
        const remaining = getTimeRemainingInMinutes(
          chatPolls?.data?.data[0]?.createdAt,
          chatPolls?.data?.data[0]?.time
        );
        setPollsRemainingTime(remaining);
      } catch (err) {
        console.log("Error :", err);
      }
    };
    getFirstData();
    scrollToBottom();
  }, []);
  useEffect(() => {
    const intervalId = setInterval(() => {
      const remaining = getTimeRemainingInMinutes(
        polls[0]?.createdAt,
        polls[0]?.time
      );
      setPollsRemainingTime(remaining);
    }, 60000);

    return () => clearInterval(intervalId);
  }, [polls]);

  return (
    <div className={classes["chat"]}>
      {pollsRemainingTime && <Poll polls={polls} />}
      {showRules && (
        <ChatRules data={chatRules} rulesVisability={rulesVisability} />
      )}
      {showUserInfo && (
        <div className={classes["chat-info"]}>
          <UserInfo
            setColor={setColor}
            color={color}
            toggleUsernameColor={toggleUsernameColor}
            toggleUserInf={toggleUserInf}
            selectedAvatar={message?.image}
            toggleChangeAvatar={toggleChangeAvatar}
          />
        </div>
      )}
      {showUsernameColor && (
        <Popup>
          <SelectColor
            color={color}
            setColor={setColor}
            confirmUserNameColor={confirmUserNameColor}
            toggleUsernameColor={toggleUsernameColor}
          />
        </Popup>
      )}
      {changeAvatar && (
        <div className={classes["change-avatar-wrapper"]}>
          <ChangeAvatar
            selectedAvatar={selectedAvatar}
            selectAvatar={selectAvatar}
            avatars={avatars}
            toggleChangeAvatar={toggleChangeAvatar}
          />
        </div>
      )}

      {showEmojiesAndGifs && (
        <EmojiaAndGifs
          emojyOrGifs={emojyOrGifs}
          chooseGifOrEmojies={chooseGifOrEmojies}
          displayEmojisAndGifs={displayEmojisAndGifs}
          message={message}
          setInputMessage={inputMessageChange}
          sendGif={sendGif}
        />
      )}
      {/* {showTagUsers && (
        <div className={classes["tag-user"]}>
          <TagUsers
            toggleTagUsers={toggleTagUsers}
            setMentionSomeone={setMentionSomeone}
          />
        </div>
      )} */}
      <ChatTop
        chatRoomSelection={chatRoomSelection}
        // contollChatRoom={contollChatRoom}
        exitExtenMode={exitExtenMode}
      />
      <ChatBody
        messagesRef={messagesRef}
        username={session?.user?.name || initialName}
        messages={messages}
        setMentionSomeone={setMentionSomeone}
      />
      <ChatBottom
        toggleUserInf={toggleUserInf}
        displayEmojisAndGifs={displayEmojisAndGifs}
        message={message.message}
        setInputMessage={inputMessageChange}
        setMentionSomeone={setMentionSomeone}
        handleClick={handleClick}
        isSending={isSending}
        inputRef={inputRef}
        setInputActive={setInputActive}
      />
    </div>
  );
};

export default Chat;
