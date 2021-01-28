<template>
    <div class="row">
        <div class='col'>
            <button class="btn btn-outline-light btn-sm" @click="follow" v-if="following == false">Follow this user</button>
            <button class="btn btn-outline-light btn-sm" @click="unfollow" v-else-if="following == true">unfollow this user</button>
        </div>
        <div class="row">
            <div class="col"><br>
                <h5> followers: {{followerCount}}</h5>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'

    export default {
        name: "follow-user",

        data(){
            return {
                followers: [],
                following: false,
                followerCount: 0,
                }
        },
        props: {
            userId: Number
        },

    mounted(){
        this.getFollowers();
    },

    methods: {
        follow(){
            axios.request({
                url: "https://tweeterest.ml/api/follows",
                method: "POST",
                headers: {
                     'Content-Type': "application/json",
                     'X-Api-Key':  'QEYysOftSHseKha8slzLGq2WnFmPVmOqLvNJ5f45MEovC',
                },
                data: {
                    loginToken: cookies.get('session'),
                    followId: this.userId,
                }
                }).then((response) => {
                    console.log(response);
                    this.following = true;
                    this.followerCount++;
                }).catch((error) => {
                    console.log(error);
                })
        },
        getFollowers(){
            axios.request({
                url: "https://tweeterest.ml/api/follows",
                method: "GET",
                headers: {
                     'Content-Type': "application/json",
                     'X-Api-Key':  'QEYysOftSHseKha8slzLGq2WnFmPVmOqLvNJ5f45MEovC',
                },
                params: {
                    userId: cookies.get('userId'),
                }
                }).then((response) => {
                    console.log(response);
                    this.followers = response.data;
                    this.followerCount = this.followers.length;
                        let currentUser = cookies.get('userId');
                        for (let i = 0; i < this.followers.length; i++){
                            if(currentUser == this.followers[i].userId){
                                this.following = true;
                            }
                        }
                }).catch((error) => {
                    console.log(error);
                })
        },
        unfollow(){
            axios.request({
                url: "https://tweeterest.ml/api/follows",
                method: "DELETE",
                headers: {
                    'Content-Type': "application/json",
                    "X-Api-Key":  "QEYysOftSHseKha8slzLGq2WnFmPVmOqLvNJ5f45MEovC",
                },
                data: {
                    loginToken: cookies.get('session'),
                    followId: this.userId,
                }
                }).then((response) => {
                    console.log(response);
                    this.following = false;
                    this.followerCount--;
                    window.location.reload()
                }).catch((error) => {
                    console.log(error);
                })
        }
    }
}
</script>

<style scoped>
</style>