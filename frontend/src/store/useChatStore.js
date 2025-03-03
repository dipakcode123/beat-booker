import { create } from "zustand";
import { toast } from "react-toastify";
import { axiosInstance } from "../lib/axios"

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    allUsers: [],
    chats: [],

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/message/users");
            set({ users: res.data.data });
        } catch (error) {
            toast.error(error.message);
            console.log("error", error.message);

        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`message/message/${userId}`);
            if (res.data.success) {
                set({ messages: res.data.data });
            }
        } catch (error) {
            // toast.error(error.response.data.message);
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (data) => {
        const { selectedUser, messages } = get();
        try {
            const res = await axiosInstance.post(`/message/send-message/`, data);
            set({ messages: [...messages, res.data] });
            // get().getUsers()
        } catch (error) {
            toast.error(error.message);
            console.log("error", error);
        }
    },

    setSelectedUser: (selectedUser) => {
        set({ selectedUser });
    },

    getAllUsers: async () => {
        try {
            const res = await axiosInstance.get("/message/get-all-users");
            set({ allUsers: res.data.data });
        } catch (error) {
            toast.error(error.message);
            console.log("error", error.message);
        }
    },


    getAllSingers: async () => {
        try {
            const res = await axiosInstance.get("/message/get-all-singers");
            set({ allUsers: res.data.data });
        } catch (error) {
            toast.error(error.message);
            console.log("error", error.message);
        }
    },

    getUsersByAuth: async () => {
        try {
            const res = await axiosInstance.get("/message/singer-chats");
            set({ chats: res.data.chats });
            console.log(res.data.chats);

        } catch (error) {
            toast.error(error.message);
            console.log("error", error.message);
        }
    },

    blockUser: async ({userId, singerId}) => {
        try {
            const res = await axiosInstance.post("/message/block-user", { userId, singerId });
            set({ chats: res.data.chats });
            console.log(res.data.chats);

        } catch (error) {
            toast.error(error.message);
            console.log("error", error.message);
        }
    }



}))


export default useChatStore