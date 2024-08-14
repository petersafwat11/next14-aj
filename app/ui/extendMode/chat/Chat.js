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
import EmojiaAndGifs from "./emojiAndGifs/EmojiaAndGifs";

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

import classes from "./chat.module.css";
import ChatBody from "./chatBody/ChatBody";
import ChatBottom from "./chatBottom/ChatBottom";
import ChatRules from "./chatRules/ChatRules";
import ChatTop from "./chatTop/ChatTop";
import Cookies from "js-cookie";
import { useSession } from "next-auth/react";
import io from "socket.io-client";
import axios from "axios";
import { getTimeRemainingInMinutes } from "@/app/lib/datesFunctions";
import { autoLogin, scrollToBottom } from "../../chat/chatFunctions";
import { useDebouncedCallback } from "use-debounce";
import ArrowDown from "../../chat/arrowDown/ArrowDown";
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

  const socket = useRef(null);

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
  const oldScrollHeightRef = useRef(0);
  const messagesRef = useRef(null);
  const [showArrowDown, setShowArrowDown] = useState(false);
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

      if (userFromCookies) {
        const pasedData = JSON.parse(userFromCookies);
        const newData = {
          ...pasedData,
          color: response?.data?.user?.color,
        };
        Cookies.remove("user");
        Cookies.set("user", JSON.stringify(newData));
      }
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
        const parsedData = JSON.parse(userFromCookies);
        const newData = {
          ...parsedData,
          image: avatar,
        };
        Cookies.remove("user");

        Cookies.set("user", JSON.stringify(newData));
      }

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
  const ensureConnected = async () => {
    return new Promise((resolve, reject) => {
      if (socket.current.connected) {
        resolve();
      } else {
        socket.current.connect();
        socket.current.once("connect", resolve);
        socket.current.once("connect_error", reject);
      }
    });
  };

  const sendGif = useDebouncedCallback(async (gif) => {
    if (chatMode?.mode !== "Anyone Can Send" || slowModeRemainingSec) {
      return;
    }
    try {
      // socket.emit("chat message English (Default)", {
      //   ...message,
      //   message: gif,
      // });
      await ensureConnected();

      const response = await axios.post(`${process.env.BACKEND_SERVER}/chat`, {
        message: { ...message, message: gif },
      });
      socket.current.emit(
        "chat message English (Default)",
        response?.data.message
      );

      setMessages((prevState) => {
        return [...prevState, response?.data.message];
      });
      setIsSending(true);
      setTimeout(() => {
        setIsSending(false);
      }, 500);
      scrollToBottom(messagesRef);
      if (chatMode.slowMode.value === true) {
        setSlowModeRemainingSec(true);
        setTimeout(() => {
          setSlowModeRemainingSec(false);
        }, 10000 * chatMode.slowMode.time);
      }
    } catch (err) {
      console.log("error", err);
    }
  }, 700);
  const handleClick = useDebouncedCallback(async () => {
    try {
      await ensureConnected();

      //  mode check
      if (chatMode?.mode !== "Anyone Can Send" || slowModeRemainingSec) {
        return;
      }
      // const messageDestructure = { ...message };
      const response = await axios.post(`${process.env.BACKEND_SERVER}/chat`, {
        message: message,
      });
      socket.current.emit(
        "chat message English (Default)",
        response?.data.message
      );
      setMessages((prevState) => {
        return [...prevState, response?.data.message];
      });
      setMessage({
        ...message,
        message: "",
      });

      setIsSending(true);
      setTimeout(() => {
        scrollToBottom(messagesRef);
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
  }, 700);
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
        if (indexOfLastSpace === -1) {
          return { ...prevState, message: `${prevState.message} @${mention} ` };
        } else {
          // Insert something after the last space
          const modifiedString =
            prevState.message.slice(0, indexOfLastSpace + 1) +
            `@${mention} ` +
            prevState.message.slice(indexOfLastSpace + 1);
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
    if (!socket.current || !socket?.current?.connected) {
      socket.current = io(`${process.env.STATIC_SERVER}`, {
        autoConnect: false,
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
      });

      socket.current.connect();
    }

    socket.current.on("connect", () => {
      socket.current.emit("register user", {
        type: "connect",
        name: message.username,
      });
      console.log("Connected to socket server");
    });
    socket.current.on("banned", (message) => {
      console.log("message", message);
      alert(
        message.message === "IP banned"
          ? "You have been banned."
          : "You are Muted to the end of the day"
      );
      setDisableChat({
        value: true,
        reason: "You are Muted to the end of the day",
      });
    });

    socket.current.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    socket.current.on("chat message English (Default)", (msg) => {
      setMessages((prevState) => [...prevState, msg]);
      scrollToBottom(messagesRef);
    });

    socket.current.on("chat mode", (data) => {
      setChatMode(data);
    });

    socket.current.on("chat poll", (data) => {
      setPolls(data);
      const remaining = getTimeRemainingInMinutes(
        data[0]?.createdAt,
        data[0]?.time
      );
      setPollsRemainingTime(remaining);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [socket, message.username]);

  useEffect(() => {
    const ensureLogin = async () => {
      if (initialName === "anonymous") {
        const randomUser = await autoLogin();

        const user = randomUser?.data?.data?.user;
        const { color, name, image } = user;
        setColor(color);
        setMessage({
          message: "",
          image: image,
          room: chatRoomSelection,
          username: name,
          color: color,
        });
      }
    };
    ensureLogin();
  }, [chatRoomSelection, initialName]);
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
            limit: 20,
            room: "English (Default)",
            sort: { createdAt: -1 },
            mode: "normal",
          },
        });
        setMessages(response?.data?.data?.data?.reverse());

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
    scrollToBottom(messagesRef);
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
  useEffect(() => {
    const ref = messagesRef.current;
    const getPrevMessages = async () => {
      const response = await axios.get(`${process.env.BACKEND_SERVER}/chat`, {
        params: {
          limit: 20,
          skip: messages.length,
          room: "English (Default)",
          sort: { _id: -1 },
          mode: "normal",
        },
      });
      console.log("response?.data?.data?.data.reverse", response?.data?.data);
      setMessages((prev) => {
        return [...response?.data?.data?.data.reverse(), ...prev];
      });
    };

    const handleScroll = async () => {
      if (
        messagesRef.current.scrollHeight - messagesRef.current.scrollTop >
        700
      ) {
        setShowArrowDown(true);
      } else {
        setShowArrowDown(false);
      }
      if (messagesRef.current.scrollTop === 0) {
        oldScrollHeightRef.current = messagesRef.current.scrollHeight;
        await getPrevMessages();
      }
    };

    if (ref) {
      ref.scrollTop = ref.scrollHeight;
      // Attach the scroll event handler
      ref.addEventListener("scroll", handleScroll);
    }

    // Clean up the event listener when the component is unmounted
    return () => {
      if (ref) {
        ref.removeEventListener("scroll", handleScroll);
      }
    };
  }, [messages]);
  useEffect(() => {
    // Adjust the scroll position after messages are updated
    if (messagesRef.current) {
      const newScrollHeight = messagesRef.current.scrollHeight;
      if (
        newScrollHeight - oldScrollHeightRef.current < 200 &&
        messagesRef.current.scrollHeight - messagesRef.current.scrollTop < 500
      ) {
        {
          scrollToBottom(messagesRef);
        }
      } else {
        messagesRef.current.style.scrollBehavior = "auto";
        messagesRef.current.scrollTop =
          newScrollHeight - oldScrollHeightRef.current;
        messagesRef.current.style.scrollBehavior = "smooth";
      }
    }
  }, [messages]);
  const arrowScroll = () => {
    scrollToBottom(messagesRef);
  };

  return (
    <div className={classes["chat"]}>
      {showArrowDown && <ArrowDown scrollDown={arrowScroll} />}

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
        chatFilteredWords={chatFilteredWords}
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
