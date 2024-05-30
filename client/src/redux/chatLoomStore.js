import { createSlice } from "@reduxjs/toolkit";

const initialStoreState = {
  chats: [],
  messages: [],
};

const storeSlice = createSlice({
  name: "chat-store",
  initialState: initialStoreState,
  reducers: {
    setOnlineUsers(state, action) {
      state.onlineUsers = action.payload.onlineUsers;
    },
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
      state.onlineUsers = [];
      state.chats = [];
      state.messages = [];
    },
  },
});

export const {
  setOnlineUsers,
  setChats,
  setMessages,
  setAddOneMessage,
  resetChatStore,
} = storeSlice.actions;
export default storeSlice.reducer;
