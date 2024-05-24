export const scrollToBottom = (lastMessageRef) => {
  const chatContainer = lastMessageRef.current;
  chatContainer.scrollTop = chatContainer.scrollHeight;
};
