import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import { toast } from 'react-toastify'


const useAuthStore = create((set, get) => ({
    authUser: null,
    userRole: 'user',
    setUserRole: (role) => set({ userRole: role }),
    token: localStorage.getItem('token') || '',
    isSigningUp: false,
    isLoggingIn: false,
    isCheckingAuth: true,
    isFetchSingers: false,
    isFetchSingerProfile: false,
    isBooking: false,
    isUpdatingProfile: false,
    approvedSingers: [],
    singer: [],
    userAppointments: [],
    singerAppointments: [],
    filterdSingers: [],
    isUploading: false,
    appointment: null,
    userInfo: null,

    createUser: async (data) => {

        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post('/user/register', data);
            if (res.data.success) {
                toast.success("account created.")
                set({ authUser: res.data.data })
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error.message);
            toast.error("Error")
        } finally {
            set({ isSigningUp: false })
        }
    },

    createSinger: async (data) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post('/singer/register', data, { headers: { 'Content-Type': 'multipart/form-data' } });
            if (res.data.success) {
                toast.success("account created.");
                // set({ authUser: res.data.data })
            } else {
                toast.error("error")
            }
        } catch (error) {
            console.log("error in create singer" + error);
        } finally {
            set({ isSigningUp: false });
        }
    },

    userLogin: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post('/user/login', data);
            if (res.data.success) {
                toast.success(res.data.message)
                set({ authUser: res.data.data })
                console.log(res.data);
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error.message);
            toast.error('Network error')
        } finally {
            set({ isLoggingIn: false });
        }
    },

    singerLogin: async (data) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post('/singer/login', data);
            if (res.data.success) {
                toast.success(res.data.message)
                set({ authUser: res.data.data })
                get().checkAuth();
                console.log(res.data);
            } else {
                toast.error(res.data.message)
                // set({ token: localStorage.removeItem('token') })
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            set({ isLoggingIn: false });
        }
    },

    getUserInfo: async (userId) => {
        try {
            const res = await axiosInstance.post('/user/get-user-info-by-id', { userId });
            set({ userInfo: res.data.data })
        } catch (error) {
            console.log(error.message);
        }
    },

    checkAuth: async () => {
        try {
            const response = await axiosInstance.get('/auth/check');
            console.log(response.data.data);
            set({ authUser: response.data.data.user });
        } catch (error) {
            console.log(error.message);
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    logoutuser: async () => {
        try {
            const res = await axiosInstance.post('/auth/logout');
            set({ authUser: null });
            toast.success(res.data.message)
        } catch (error) {
            console.log(error.message);
        }
    },

    fetchSingers: async () => {
        set({ isFetchSingers: true })
        try {
            const response = await axiosInstance.get('/user/get-all-approved-singers');
            console.log(response.data.data);
            if (response.data.success) {
                set({ approvedSingers: response.data.data })
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            set({ isFetchSingers: false })
        }
    },

    checkAvailability: async (data) => {
        set({ isBooking: true });
        try {
            const response = await axiosInstance.post('/user/check-booking-availability', data);
            console.log(response.data.data);
            if (response.data.success) {
                toast.success(response.data.message)
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            set({ isBooking: false })
        }
    },

    getSingerProfile: async (singerId) => {
        set({ isFetchSingerProfile: true });
        try {
            const response = await axiosInstance.post('/singer/get-singer-info-by-id', { singerId });
            console.log(response.data.data);
            set({ singer: response.data.data });
        } catch (error) {
            console.log(error.message);
        } finally {
            set({ isFetchSingerProfile: false });
        }
    },

    updateSingerProfile: async (data) => {
        // send data to backend and image path

        set({ isUpdatingProfile: true });
        try {
            const response = await axiosInstance.post('/singer/update-singer-profile', data, { headers: { 'Content-Type': 'multipart/form-data' } });
            if (response.data.success) {
                toast.success("update successfully.");
                set({ authUser: response.data.data })
            } else {
                toast.error(response.data.message);
                console.log(response.data.data);
            }
        } catch (error) {
            console.log(error.message);
            toast.error("Network error.");
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    verifyEmail: async (data) => {
        try {
            const response = await axiosInstance.post('/auth/verify-email', data);
            if (response.data.success) {
                toast.success(response.data.message);
                // set({ authUser: response.data.data })
                console.log(response.data.message);

            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message)
        }
    },

    bookingRequest: async (data) => {
        set({ isBooking: true });
        try {
            const response = await axiosInstance.post('/user/book-appointment', data)
            if (response.data.success) {
                toast.success("booking request sent.")
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            set({ isBooking: false })
        }
    },

    getSingerAppointments: async (singerId) => {
        try {
            const response = await axiosInstance.post('/singer/get-appointments-by-singer-id', { singerId });
            if (response.data.success) {
                console.log(response.data);
                set({ singerAppointments: response.data.data })
            } else {
                console.log(error.message);
            }
        } catch (error) {
            console.log(error.message);
            toast.error("Network error.")
        }
    },

    uploadVideo: async (singerId, videoFile) => {
        set({ isUploading: true })
        try {
            const formData = new FormData();
            formData.append("singerId", singerId);
            formData.append("videos", videoFile);

            const response = await axiosInstance.post('/singer/singer-post-videos', formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
            })
            if (response.data.success) {
                toast.success("video uploaded.")
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error.message);
            toast.error("Network error.")
        } finally {
            set({ isUploading: false })
        }
    },

    deleteVideo: async (singerId, videoFile) => {
        set({ isUploading: true })
        try {
            const formData = new FormData();
            // formData.append("singerId", singerId);
            // formData.append("video", videoFile);

            const response = await axiosInstance.delete(`/singer/singer-delete-video`, {
                data: { singerId, videoFile }, // Sending both singerId and videoId in the body
                headers: {
                    "Content-Type": "application/json", // Use application/json for DELETE requests with data
                },
            });

            if (response.data.success) {
                toast.success("video deleted.")
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error.message);
            toast.error("Network error.")
        } finally {
            set({ isUploading: false })
        }
    },

    getSingerVideos: async (singerId) => {
        try {
            const response = await axiosInstance.get('/singer/get-videos', { singerId });
            console.log(response.data);
        } catch (error) {
            console.log(error.message);

        }
    },

    getAppointMent: async (id) => {
        try {
            const response = await axiosInstance.post('/singer/get-appointment-by-id', { id });
            console.log(response.data);
            set({ appointment: response.data.data })

        } catch (error) {
            console.log(error.message);

        }
    },

    approvedBySinger: async (appointmentId, status) => {
        try {
            const response = await axiosInstance.post('/singer/change-appointment-status', { appointmentId, status: "approved" })
            if (response.data.success) {
                toast.success('approved successfully.');
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error.message);

        }
    },
    rejectBySinger: async (appointmentId, status) => {
        try {
            const response = await axiosInstance.post('/singer/change-appointment-status', { appointmentId, status: "reject" })
            if (response.data.success) {
                toast.success('rejected.');
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error.message);

        }
    },

    // 
    searchSingers: async (key) => {
        try {
            const response = await axiosInstance.get(`/user/search-singers/${key}`)
            set({ filterdSingers: response.data.data })
            // console.log(response.data);

        } catch (error) {

        }
    },

    getUserAppointments: async (userId) => {
        try {
            const response = await axiosInstance.post('/user/get-appointments-by-user-id', { userId });
            if (response.data.success) {
                console.log(response.data);
                set({ userAppointments: response.data.data })
            } else {
                console.log(error.message);
            }
        } catch (error) {

        }
    },

    updateUserProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const response = await axiosInstance.post('/user/update-user-profile', data, { headers: { 'Content-Type': 'multipart/form-data' } });
            if (response.data.success) {
                toast.success("Update successfully.");
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error("Network error.")
        } finally {
            set({ isUpdatingProfile: false })
        }
    },

    cancelBooking: async (data) => {
        try {
            const response = await axiosInstance.post('/user/booking-cancel-by-user', data);
            if (response.data.success) {
                toast.success("booking cancle successfully.");
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error("Network error.")
        } finally {
            set({ isUpdatingProfile: false })
        }
    }

}));

export default useAuthStore;