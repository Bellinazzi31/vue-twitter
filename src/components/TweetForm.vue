<template>
    <div class="container border border-dark rounded">
        <div class="row">
            <div class="col">
                <h4 class="text-white">Tweet Status: {{ tweetStatus }}</h4>
            </div>
        </div>
        <div class="row">
                <textarea id="tweetbox" class="col" v-model="tweetContent" placeholder="Enter your tweet here"></textarea>
        </div>
        <div class="row">
            <div class="col"><br>
                <button class="btn btn-outline-light btn-sm" @click="postTweet()">Post</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import cookies from 'vue-cookies'
    export default {
        name: 'tweet-form',
        data() {
            return {
                tweetContent: "",
                tweetStatus: "Post your tweet here!"
            }
        },
        methods: {
            postTweet: function() {
                this.tweetStatus = "tweeting!"
                axios.request({
                    url: "https://tweeterest.ml/api/tweets",
                    headers: {
                        "Content-Type": "application/json",
                        "X-Api-Key":  "QEYysOftSHseKha8slzLGq2WnFmPVmOqLvNJ5f45MEovC"
                    },
                    method: "POST",
                    data: {
                        loginToken: cookies.get("session"),
                        content: this.tweetContent
                    }
                }).then((response) => {
                    console.log(response)
                    this.tweetStatus = "Tweeted!"
                    window.location.reload()
                    
                }).catch((error) => {
                        console.log(error)
                        this.tweetStatus = "Failed to tweet!"
                })
            }
        },
            reloadPage() {
                window.location.reload()
            },
    }
</script>

<style scoped>
    .container {
         background-color: rgb(20, 131, 223);
    }

</style>