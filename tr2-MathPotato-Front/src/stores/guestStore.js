import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
    state: () => ({
        guestInfo: {
            username: '',
            id: '',
        },
        users:[]

    }), 
    actions: {
        setUsers(items){
            this.users = items;
        },
        getUsers(){
            return this.users;
        },
        setGuestInfo(items) {
            console.log(items);
            for (let i = 0; i < items.length; i++) {
                this.guestInfo.username = items[i].username;
                this.guestInfo.id = items[i].id;
            }
            console.log(this.guestInfo.username);
            console.log(this.guestInfo.id);
            
        },
        getGuestInfo() {
            return this.guestInfo;
        },
        clearGuestInfo() {
            this.guestInfo.username = '';
            this.guestInfo.id = '';
        },
    }
});