import {
  calculateDate,
  calculateToday,
  calculateYesterday,
} from "../../utilities/calculator";

import List from "../lists/messages/list";
import ListItem from "../list items/generalroom chat/listItem";
import ScrollToBottomButton from "../buttons/scrollToBottomBtn";

const GeneralRoomMessages = ({ messages: data }) => {
  return (
    <>
      <div className="min-h-[calc(100dvh-9.188rem)] space-y-8 pb-28 pt-8 sm:min-h-[calc(100dvh-9.938rem)] sm:space-y-12 sm:pb-32">
        {data.map((day) => {
          const date = calculateDate(day._id);
          const today = calculateToday();
          const yesterday = calculateYesterday();
          return (
            <div key={date} className="space-y-6">
              <h2 className="flex justify-center px-2">
                <span className="px-2 py-1 tracking-wide rounded bg-themebtnbg font-VT323 text-copy">
                  {date === today
                    ? "Today"
                    : date === yesterday
                      ? "Yesterday"
                      : date}
                </span>
              </h2>
              <List>
                <ListItem messages={day.messages} />
              </List>
            </div>
          );
        })}
      </div>
      <ScrollToBottomButton />
    </>
  );
};

export default GeneralRoomMessages;
