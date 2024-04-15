"use client";
import React, { useEffect, useRef, useState } from "react";
import avatars from "./avatarsIterator";
import ChangeAvatar from "./changeAvatars/changeAvatar";
import classes from "./chat.module.css";
import ChatBody from "./chatBody/ChatBody";
import ChatBottom from "./chatBottom/ChatBottom";
import ChatRules from "./chatRules/ChatRules";
import ChatTop from "./chatTop/ChatTop";
import dummyMessages from "./dummyMessages";
import EmojiaAndGifs from "./emojiAndGifs/EmojiaAndGifs";
import Poll from "./poll/Poll";
import UserInfo from "./userInfo/UserInfo";
import { getData } from "@/utils/dashboardTablePagesFunctions";
import SelectColor from "./userInfo/selectColor/SelectColor";
import Cookies from "js-cookie";
import { useSession } from "next-auth/react";
import io from "socket.io-client";
import axios from "axios";
import Popup from "@/components/popupWrapper/Popup";
import TagUsers from "./tagUsers/TagUsers";

const Chat = ({
  chatRules,
  chatFilteredWords,
  chatMessages,
  setExtendMode,
  setInputActive,
}) => {
  console.log("chatMessages", chatMessages);
  const { data: session, status } = useSession();
  console.log("session", session);
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
    ? JSON.parse(userFromCookies)?.name
    : null;

  const [selectedAvatar, setSelectedAvatar] = useState(
    session?.user?.image || initialAvatar
  );
  const [changeAvatar, setChangeAvatar] = useState(false);
  // tag users
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
  const [messages, setMessages] = useState(chatMessages);
  const messagesRef = useRef(null);
  // show chat ruls
  const [showRules, setShowRules] = useState(true);

  // username color
  const [color, setColor] = useState(session?.user?.color || initialColor);

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
      console.log("response", response);
      setMessage({ ...message, color: response?.data?.user?.color });
      setShowUsernameColor(!showUsernameColor);
    } catch (err) {
      console.log(
        "err happend while trying change your username color , please try again later"
      );
    }
  };

  const selectAvatar = async (avatar) => {
    console.log("avatar", avatar);

    if (!session?.user?.name || initialName === null) {
      setMessage({ ...message, image: avatar });
      setChangeAvatar(!changeAvatar);
      setSelectedAvatar(avatar);
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
      console.log("response", response);
      setMessage({ ...message, image: response?.data?.user?.image });
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
  const handleClick = async () => {
    try {
      const response = await axios.post(`${process.env.BACKEND_SERVER}/chat`, {
        message: message,
      });
      console.log(response);
      socket.emit(`chat message ${chatRoomSelection}`, message);

      setMessages((prevState) => {
        return [...prevState, message];
      });
      setMessage({
        ...message,
        message: "",
      });
      scrollToBottom();
      setIsSending(true);
      setTimeout(() => {
        setIsSending(false);
      }, 500);
    } catch (err) {
      console.log("error", err);
    }
  };
  const sendGif = async (gif) => {
    try {
      const response = await axios.post(`${process.env.BACKEND_SERVER}/chat`, {
        message: { ...message, message: gif },
      });
      console.log(response);
      socket.emit(`chat message ${chatRoomSelection}`, {
        ...message,
        message: gif,
      });

      setMessages((prevState) => {
        return [...prevState, { ...message, message: gif }];
      });
      scrollToBottom();
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
    if (message.message.includes(`@${mention}`)) {
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
        return prevState;
      }
    });

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  const contollChatRoom = async (room) => {
    try {
      const roomMessages = await axios.get("chat", {
        limit: 40,
        room: room,
        sort: { eventDate: 1 },
      });
      console.log("roomMessages", roomMessages?.data?.data);
      setChatRoomSelection(room);
      setMessages(roomMessages?.data?.data);
      setMessage({ ...messageDefaultState, room: room });
    } catch (err) {
      console.log("error happed while loading message", err);
    }
  };
  const chooseGifOrEmojies = (choose) => {
    setEmojyOrGifs(choose);
  };

  useEffect(() => {
    // Event listeners can be added here
    socket.on(`chat message ${chatRoomSelection}`, (msg) => {
      setMessages((prevState) => {
        return [...prevState, msg];
      });
      scrollToBottom();
      console.log("message ", msg);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, [socket, chatRoomSelection]);

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
    scrollToBottom();
  }, []);
  return (
    <div className={classes["chat"]}>
      {true && <Poll />}
      {showRules && (
        <ChatRules data={chatRules} rulesVisability={rulesVisability} />
      )}
      {showUserInfo && (
        <div className={classes["chat-info"]}>
          <UserInfo
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
        contollChatRoom={contollChatRoom}
        setExtendMode={setExtendMode}
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
