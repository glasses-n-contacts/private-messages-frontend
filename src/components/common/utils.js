export const scrollToMessage = (messageIndex) => {
  const message = document.getElementById(messageIndex);
  if (!message) {
    setTimeout(scrollToMessage, 50, messageIndex);
    return;
  }
  message.scrollIntoView();
  window.scrollBy(0, -100);
};
