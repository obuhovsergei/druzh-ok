import { defineStore } from 'pinia'
import { IUser } from "@/models/user.model";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: {
            firstName: 'Ivan',
            lastName: "Ivanov"
        },
        isAuthenticated: false
    }),
    actions: {
        login(userData: IUser) {
            this.user = userData
            this.isAuthenticated = true
        },
        logout() {
            this.user = {
                firstName: '',
                lastName: ''
            }
            this.isAuthenticated = false
        }
    }
})
