import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
    state: () => ({
        user: null,
        isAuthenticated: false,
        storage: {
            used: 6.5,
            total: 10,
            unit: 'GB'
        }
    }),

    getters: {
        //Get username
        userName: (state) => {
            return state.user ? state.user.name : 'Guest'
        },
        
        //Get user email
        userEmail: (state) => {
            return state.user ? state.user.email : ''
        },

        //Generate user initials for avatar display
        // @returns {string}
        userInitials: (state) => {
            if (!state.user || !state.user.name) return 'GU'

            const names = state.user.name.split(' ')

            if (names.length >= 2) {
                return (names[0][0] + names[names.length - 1][0]).toUpperCase()
            }

            return state.user.name.substring(0, 2).toUpperCase()
        },

        // Returns the used storage percentage (0–100), rounded to the nearest whole number.
        storagePercentage: (state) => {
            return Math.round((state.storage.used / state.storage.total) * 100)
        },

        storageUsedText: (state) => {
            return `${state.storage.used} ${state.storage.unit}`
        },

        storageTotalText: (state) => {
            return `${state.storage.total} ${state.storage.unit}`
        }
    },

    actions: {
        //login function
        login(email, password) {
        // const response = await fetch(`${API_URL}/auth/login`, {...})
        
        if (email && password) {
            this.user = {
                id: Date.now(),
                name: 'John Doe',
                email: email,
                avatar: null
            }
            this.isAuthenticated = true
            
            // Save to localStorage
            localStorage.setItem('user', JSON.stringify(this.user))
            localStorage.setItem('isAuthenticated', 'true')
            
            return true
            }

            return false
        },
        
        register(userData) {
            this.user = {
                id: Date.now(),
                name: userData.name,
                email: userData.email,
                avatar: null
            }
            this.isAuthenticated = true
            
            // Save to localStorage
            localStorage.setItem('user', JSON.stringify(this.user))
            localStorage.setItem('isAuthenticated', 'true')
            
            return true
        },
        
        logout() {
            this.user = null
            this.isAuthenticated = false
            
            // Clear localStorage
            localStorage.removeItem('user')
            localStorage.removeItem('isAuthenticated')
        },
        
        checkAuth() {
            // Check if user is logged in from localStorage
            const user = localStorage.getItem('user')
            const isAuth = localStorage.getItem('isAuthenticated')
            
            if (user && isAuth === 'true') {
                this.user = JSON.parse(user)
                this.isAuthenticated = true
            }
        },
        
        updateStorage(used, total) {
            this.storage.used = used
            this.storage.total = total
        }
    }
})