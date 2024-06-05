import { createSlice } from "@reduxjs/toolkit";

const initialStoreState = {
  chats: [],
  messages: [],
  generalRoomMessages: [],
};

const storeSlice = createSlice({
  name: "chat-store",
  initialState: initialStoreState,
  reducers: {
    setChats(state, action) {
      state.chats = action.payload.chats;
    },
    setMessages(state, action) {
      state.messages = action.payload.messages;
    },
    setAddOneMessage(state, action) {
      const targetDate = action.payload.date;
      const newMessage = { ...action.payload.newMessage };
      const newMessageId = newMessage._id;

      if (state.messages.length === 0) {
        const newObj = {
          _id: `${targetDate}`,
          messages: [newMessage],
        };
        state.messages.push(newObj);
        return;
      }

      const index = state.messages.findIndex(
        (object) => object._id === targetDate,
      );

      if (index !== -1) {
        const messageSet = new Set(
          state.messages[index].messages.map((msg) => msg._id),
        );
        if (!messageSet.has(newMessageId))
          state.messages[index].messages.push(newMessage);
      } else {
        const newObj = {
          _id: `${targetDate}`,
          messages: [newMessage],
        };
        state.messages.push(newObj);
      }

      state.messages[index].messages = Array.from(
        new Set(
          state.messages[index].messages.map((msg) => JSON.stringify(msg)),
        ),
      ).map((str) => JSON.parse(str));
    },
    resetChatStore(state) {
      state.chats = [];
      state.messages = [];
      state.generalRoomMessages = [];
    },
    setGeneralRoomMessages(state, action) {
      state.generalRoomMessages = action.payload.generalRoomMessages;
    },
    setGeneralRoomAddOneMessage(state, action) {
      const targetDate = action.payload.date;
      const newMessage = { ...action.payload.newMessage };
      const newMessageId = newMessage._id;

      // Check if the date group exists
      const dateGroupIndex = state.generalRoomMessages.findIndex(
        (group) => group._id === targetDate,
      );

      if (dateGroupIndex !== -1) {
        // Date group exists, add the new message to this group
        const messageSet = new Set(
          state.generalRoomMessages[dateGroupIndex].messages.map(
            (msg) => msg._id,
          ),
        );
        if (!messageSet.has(newMessageId)) {
          state.generalRoomMessages[dateGroupIndex].messages.push(newMessage);
        }
        // Ensure all messages within the date group are unique
        state.generalRoomMessages[dateGroupIndex].messages = Array.from(
          new Set(
            state.generalRoomMessages[dateGroupIndex].messages.map((msg) =>
              JSON.stringify(msg),
            ),
          ),
        ).map((str) => JSON.parse(str));
      } else {
        // Date group does not exist, create a new one
        const newDateGroup = {
          _id: targetDate,
          messages: [newMessage],
        };
        state.generalRoomMessages.push(newDateGroup);
      }
    },
  },
});

export const {
  setOnlineUsers,
  setChats,
  setMessages,
  setAddOneMessage,
  resetChatStore,
  setGeneralRoomMessages,
  setGeneralRoomAddOneMessage,
} = storeSlice.actions;
export default storeSlice.reducer;
