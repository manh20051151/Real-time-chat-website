import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
  images: [],
  setImages: (images) => set({ images }),
  groups: [],
  setGroups: (groups) => set({ groups }),
  // isSockett: "",
  // setIsSockett: (isSockett) => set({ isSockett }),
  selectedConversationGroup: null,
  setSelectedConversationGroup: (selectedConversationGroup) =>
    set({ selectedConversationGroup }),
  selectedAddFriend: false,
  setSelectedAddFriend: (selectedAddFriend) => set({ selectedAddFriend }),
  ismodel: false,
  setIsmodel: (ismodel) => set({ ismodel }),
  selectedAddMember: false,
  setSelectedAddMember: (selectedAddMember) => set({ selectedAddMember }),
  selectedAddDeputy: false,
  setSelectedAddDeputy: (selectedAddDeputy) => set({ selectedAddDeputy }),
  selectedUpdateLeader: false,
  setSelectedUpdateLeader: (selectedUpdateLeader) =>
    set({ selectedUpdateLeader }),
  isModelUpdateNameGroup: false,
  setIsModelUpdateNameGroup: (isModelUpdateNameGroup) =>
    set({ isModelUpdateNameGroup }),
  isUpdateAvatarGroup: false,
  setIsUpdateAvatarGroup: (isUpdateAvatarGroup) => set({ isUpdateAvatarGroup }),
}));

export default useConversation;
