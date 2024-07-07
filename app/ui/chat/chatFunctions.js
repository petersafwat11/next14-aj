import axios from "axios";
import Cookies from "js-cookie";

export const scrollToBottom = (lastMessageRef) => {
  const chatContainer = lastMessageRef.current;
  chatContainer.scrollTop = chatContainer.scrollHeight;
};
const AJUser = Cookies.get("user");

export const autoLogin = async () => {
  try {
    if (AJUser) {
      return AJUser;
    }

    const confirmName = await axios.post(
      `${process.env.BACKEND_SERVER}/users/generateRandom`
    );
    Cookies.set("user", JSON.stringify(confirmName.data.data.user), {
      expires: 1,
    });
    return confirmName;
  } catch (err) {
    console.log("err happend please try again later", err);
  }
};
