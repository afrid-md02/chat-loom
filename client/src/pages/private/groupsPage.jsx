import Heading2 from "../../components/headings/h2/heading2";
import GeneralRoomList from "../../components/lists/General room/list";
import MainText from "../../components/paragraphs/mainTxt";

const GroupsPage = () => {
  return (
    <section className="background_animations mx-auto max-w-5xl space-y-3 px-3 pb-[4rem] pt-4 sm:px-6">
      <div className="space-y-1">
        <Heading2>General room</Heading2>
        <GeneralRoomList />
      </div>
      <div className="space-y-1">
        <Heading2>Rooms</Heading2>
        <MainText>Private rooms will be implemented in future.</MainText>
      </div>
    </section>
  );
};

export default GroupsPage;
