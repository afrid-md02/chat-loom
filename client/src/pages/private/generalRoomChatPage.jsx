import GeneralRoomHeader from "../../layout/generalRoomHeader";
import GeneralRoomChat from "../../components/general room data/generalRoomChat";
import GeneralRoomMessageFooter from "../../components/general room data/generalRoomMessageFooter";

const GeneralRoomChatPage = () => {
  return (
    <main className="px-3 sm:px-6">
      <GeneralRoomHeader />
      <GeneralRoomChat />
      <GeneralRoomMessageFooter />
    </main>
  );
};

export default GeneralRoomChatPage;
