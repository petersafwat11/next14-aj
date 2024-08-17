"use client";
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const Poll = dynamic(() => import("./poll/Poll"), {
  ssr: false,
});
const ChangeAvatar = dynamic(() => import("./changeAvatars/changeAvatar"), {
  ssr: false,
});
import EmojiaAndGifs from "./emojiAndGifs/EmojiaAndGifs";

// const EmojiaAndGifs = dynamic(() => import("./emojiAndGifs/EmojiaAndGifs"), {
//   ssr: false,
// });
const UserInfo = dynamic(() => import("./userInfo/UserInfo"), {
  ssr: false,
});
const SelectColor = dynamic(
  () => import("./userInfo/selectColor/SelectColor"),
  {
    ssr: false,
  }
);
const Popup = dynamic(() => import("../popupWrapper/Popup"), {
  ssr: false,
});
import avatars from "./avatarsIterator";
import classes from "./chat.module.css";
import ChatBody from "./chatBody/ChatBody";
import ChatBottom from "./chatBottom/ChatBottom";
import ChatRules from "./chatRules/ChatRules";
import ChatTop from "./chatTop/ChatTop";
import Cookies from "js-cookie";
import io from "socket.io-client";
import axios from "axios";
import { getTimeRemainingInMinutes } from "@/app/lib/datesFunctions";
import { autoLogin, scrollToBottom } from "./chatFunctions";
import { useDebouncedCallback } from "use-debounce";
import ArrowDown from "./arrowDown/ArrowDown";
import { SiProtools } from "react-icons/si";

// import { getTimeRemainingInMinutes } from "@/utils/convertDateFormat";

const Chat = ({ toggleChat, chatRules, chatFilteredWords, mode }) => {

  // const socket = io(`${process.env.STATIC_SERVER}`);
  const socket = useRef(null);

  //show emojy and gifs pickers
  const [showEmojiesAndGifs, setShowEmojiesAndGifs] = useState(false);
  const [emojyOrGifs, setEmojyOrGifs] = useState("emojy");
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

  const [selectedAvatar, setSelectedAvatar] = useState(initialAvatar);
  const [changeAvatar, setChangeAvatar] = useState(false);

  //chat room top selection
  const [chatRoomSelection, setChatRoomSelection] =
    useState("English (Default)");

  // message state
  const messageDefaultState = {
    username: initialName,
    message: "",
    image: initialAvatar,
    room: chatRoomSelection,
    color: initialColor,
  };
  const [message, setMessage] = useState(messageDefaultState);
  const inputRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const lastMessageRef = useRef(null);
  const oldScrollHeightRef = useRef(0);
  const messagesRef = useRef(null);
  const [showArrowDown, setShowArrowDown] = useState(false);
  const [disableChat, setDisableChat] = useState({ value: false, reason: "" });
  // show chat ruls
  const [showRules, setShowRules] = useState(true);

  // username color
  const [color, setColor] = useState(initialColor);

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
            name: initialName,
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
    if (!initialName || initialName === "anonymous") {
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
            name: initialName,
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
        scrollToBottom(messagesRef);
        setIsSending(false);
      }, 500);
      if (chatMode.slowMode.value === true) {
        setSlowModeRemainingSec(chatMode.slowMode.time);
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
        setSlowModeRemainingSec(chatMode.slowMode.time);
      }
    } catch (err) {
      console.log("error", err);
    }
  }, 700);
  // count down if the slow mode is on
  useEffect(() => {
    let intervalId;

    if (chatMode.slowMode.value === true && slowModeRemainingSec !== false) {
      let remainingTime = slowModeRemainingSec; // Time in seconds
      setSlowModeRemainingSec(remainingTime);

      intervalId = setInterval(() => {
        remainingTime -= 1;
        setSlowModeRemainingSec(remainingTime);

        if (remainingTime <= 0) {
          clearInterval(intervalId);
          setSlowModeRemainingSec(false);
          setTimeout(() => {
            setMessage("");
          }, [500]);

          // Could also set it to 0 if desired
        }
      }, 1000); // Decrement every second
    }

    // Clean up the interval when component unmounts or chatMode changes
    return () => {
      clearInterval(intervalId);
    };
  }, [chatMode.slowMode.value, chatMode.slowMode.time, slowModeRemainingSec]);

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
    const disableChatMember = (banMessage) => {
      alert(
        banMessage === "IP banned"
          ? "You have been banned."
          : "You are Muted to the end of the day"
      );
      setDisableChat({
        value: true,
        reason:
          banMessage === "IP banned"
            ? "You have been banned."
            : "You are Muted to the end of the day",
      });
    };

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
    socket.current.on("banned", (socket) => {
      if (socket.state === "connection") {
        disableChatMember(socket.message);
      } else {
        message.username === socket.name && disableChatMember(socket.message);
      }
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
    const getFirstData = async () => {
      try {
        const response = await axios.get(`${process.env.BACKEND_SERVER}/chat`, {
          params: {
            limit: 20,
            room: "English (Default)",
            sort: { createdAt: -1 },
            mode: "normal",
          },
        });
        setMessages(response?.data?.data?.data?.reverse());
      } catch (err) {
        console.log("Error :", err);
      }
    };
    const fetchChatData = async () => {
      try {
        // const chatPolls = await axios.get(
        //   `${process.env.BACKEND_SERVER}/chat/chatPoll`,
        //   {
        //     params: {
        //       sort: { createdAt: -1 },
        //     },
        //   }
        // );

        const chatMode = await axios.get(
          `${process.env.BACKEND_SERVER}/chat/chatMode`
        );
        setChatMode(chatMode?.data?.data?.data[0]);
        // setPolls(chatPolls?.data?.data?.data || []);
        // const remaining = getTimeRemainingInMinutes(
        //   chatPolls?.data?.data[0]?.createdAt,
        //   chatPolls?.data?.data[0]?.time
        // );
        // setPollsRemainingTime(remaining);
      } catch (error) {
        console.log(error);
      }
    };

    getFirstData();
    scrollToBottom(messagesRef);
    fetchChatData();
    const intervalId = setInterval(fetchChatData, 60000);

    // Clean up the interval to prevent memory leaks
    return () => clearInterval(intervalId);
  }, []);
  // useEffect(() => {
  //   if (polls && polls.length > 0) {
  //     const updateRemainingTime = () => {
  //       const remaining = getTimeRemainingInMinutes(
  //         polls[0].createdAt,
  //         polls[0].time
  //       );
  //       console.log("remaining", remaining);
  //       setPollsRemainingTime(remaining);
  //     };

  //     // Initial call
  //     updateRemainingTime();

  //     const intervalId = setInterval(updateRemainingTime, 60000);

  //     return () => clearInterval(intervalId);
  //   }
  // }, [polls]);
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

      {/* {pollsRemainingTime && <Poll polls={polls} />} */}
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
            toggleUserInf={toggleUserInf}
            confirmUserNameColor={confirmUserNameColor}
            toggleUsernameColor={toggleUsernameColor}
          />
        </Popup>
      )}
      {changeAvatar && (
        <div className={classes["change-avatar-wrapper"]}>
          <ChangeAvatar
            message={message}
            setMessage={setMessage}
            setSelectedAvatar={setSelectedAvatar}
            name={message.username}
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
      <ChatTop
        // chatRoomSelection={chatRoomSelection}
        // contollChatRoom={contollChatRoom}
        toggleChat={toggleChat}
      />
      <ChatBody
        chatFilteredWords={chatFilteredWords}
        lastMessageRef={lastMessageRef}
        messagesRef={messagesRef}
        username={initialName}
        messages={messages}
        setMentionSomeone={setMentionSomeone}
      />
      <ChatBottom
        disableChat={disableChat}
        slowModeRemainingSec={slowModeRemainingSec}
        chatMode={chatMode}
        toggleUserInf={toggleUserInf}
        displayEmojisAndGifs={displayEmojisAndGifs}
        message={message.message}
        setInputMessage={inputMessageChange}
        setMentionSomeone={setMentionSomeone}
        handleClick={handleClick}
        isSending={isSending}
        inputRef={inputRef}
      />
    </div>
  );
};

export default Chat;
