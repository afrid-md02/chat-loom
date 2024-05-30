import ChatHeader from "../../layout/chatHeader";
import Chat from "../../components/chat/chat";
import MessageFooter from "../../layout/messageFooter";

const ChatPage = () => {
  return (
    <main className="px-3 sm:px-6">
      <ChatHeader />
      <Chat />
      <MessageFooter />
    </main>
  );
};

export default ChatPage;
