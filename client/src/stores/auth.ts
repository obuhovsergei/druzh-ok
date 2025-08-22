import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { IUser, TLogin } from "@/models/user.model";

export const useAuthStore = defineStore('auth', () => {
    const user = ref<IUser>({
        firstName: "",
        lastName: "",
        email: ""
    });

    const isAuthenticated = ref(false);

    const login = (userData: TLogin) => {
        user.value = { ...user.value, ...userData };
        isAuthenticated.value = true;
    };

    const logout = () => {
        user.value = {
            firstName: "",
            lastName: "",
            email: "" };
        isAuthenticated.value = false;
    };

    const fullName = computed(() : string | undefined => {
        if(!user.value.firstName && !user.value.lastName) return
        return `${user.value.firstName} ${user.value.lastName}`.trim();
    });

    //const isLoggedIn = computed(() => isAuthenticated.value);

    return {
        user,
        isAuthenticated,
        login,
        logout,
        fullName,
        //isLoggedIn
    };
});
