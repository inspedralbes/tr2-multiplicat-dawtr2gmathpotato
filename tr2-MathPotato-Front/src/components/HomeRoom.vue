

<template>
        <div>
            <div class="math-potato">
                <div class="profile-box">
                    <img :src="user.image" alt="Profile Image" />
                    <p>{{ user.username }}</p>
                </div>
                <button class="skin-button">Change Skin</button>
                <button class="play-button">Play</button>
                <!-- <button class="create-button">Create</button> -->
            </div>
        </div>
    </template>
    
    <script>
import { useAppStore } from '../stores/guestStore';
    export default {
        name: "MathPotato",
        data() {
            return {

            };
        },
        methods: {

        },
        computed(){
                let store = useAppStore();
                return 
        },
        mounted() {

        },
    };
    </script>
    
    <style scoped>
    .math-potato {
        font-family: "Arial", sans-serif;
        text-align: center;
        margin: 20px;
        padding: 20px;
        border: 2px solid #ccc;
        border-radius: 10px;
        background-color: #f5f5f5;
    }
    
    .profile-box {
        width: 100px;
        height: 100px;
        background-color: #ddd;
        border-radius: 50%;
        margin: 10px auto;
    }
    
    .skin-button,
    .play-button,
    .create-button {
        background-color: #4caf50;
        color: white;
        border: none;
        padding: 10px 20px;
        margin: 5px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        cursor: pointer;
        border-radius: 5px;
    }
    
    .skin-button:hover,
    .play-button:hover,
    .create-button:hover {
        background-color: #45a049;
    }
    </style>
