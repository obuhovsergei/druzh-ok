import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { IUser, TLogin } from "@/models/user.model";

const auth_key: string = 'jwt';

export const useAuthStore = defineStore('AuthStore', () => {
    const user = ref<IUser>({
        firstName: "",
        lastName: "",
        email: ""
    });
    const isAuthenticated = ref<boolean>(false);

    const login = (userData: TLogin) => {
        user.value = { ...user.value, ...userData };
        isAuthenticated.value = true;
        saveToStorage();
    };

    const logout = () => {
        user.value = {
            firstName: "",
            lastName: "",
            email: ""
        };
        isAuthenticated.value = false;
        localStorage.removeItem(auth_key);
    };

    const initialize = () => {
        const savedAuth = localStorage.getItem(auth_key);
        if (savedAuth) {
            const authData = JSON.parse(savedAuth);
            user.value = authData.user;
            isAuthenticated.value = authData.isAuthenticated;
        }
    };

    const saveToStorage = () => {
        localStorage.setItem(auth_key, JSON.stringify({
            user: user.value,
            isAuthenticated: isAuthenticated.value
        }));
    };

    const fullName = computed(() : undefined | string => {
        if(!user.value.firstName || !user.value.lastName) return
        return `${user.value.firstName} ${user.value.lastName}`.trim();
    });

    const isLoggedIn = computed(() => isAuthenticated.value);

    return {
        user,
        isAuthenticated,
        login,
        logout,
        initialize,
        fullName,
        isLoggedIn
    };
});
