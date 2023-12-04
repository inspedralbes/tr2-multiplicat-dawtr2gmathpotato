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
            console.log(this.users);
        },
        getUsers(){
            return this.users;
        },
        setGuestInfo(username, id) {
            this.guestInfo.username = username;
            this.guestInfo.id = id;

            console.log('infoGuest');
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
        updateUsersOnDisconnect(users) {
            this.setUsers(users);
        }
    }
});