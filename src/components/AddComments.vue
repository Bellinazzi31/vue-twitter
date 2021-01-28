<template>
    <div>
        <div class="row">
            <div class="col"><br>
                <h5>Post A Comment</h5>
            </div>
        </div>
        <div class="row"><br>
            <textarea class="col" v-model="tweetComment" placeholder="Enter your comments here"></textarea>
        </div>
        <div class="row">
                <div class="col">
                </div>
            <div class="col"><br>
                <button type="submit" class="btn btn-outline-light btn-sm" @click="postComment()">Post Comment</button>
            </div>
            <div class="col">
                </div>
        </div>
        <div class="row">
                <div class="col"><br>
                </div>
            </div>
    </div>
</template>

<script>
import cookies from 'vue-cookies'
import axios from "axios"
    export default {
        name: "add-comments",
        components: {
            
        },
        data() {
            return {
                comments: [],
                tweetComment: "",
                
            }
        },
        props: {
            tweetid: {
                type: Number,
                required: true 
            },
        },
        methods: {
            postComment: function() {
                axios.request({
                    url: "https://tweeterest.ml/api/comments",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'X-Api-Key':  'QEYysOftSHseKha8slzLGq2WnFmPVmOqLvNJ5f45MEovC',
                    }, 
                    data: {
                        loginToken: cookies.get("session"),
                        tweetId: this.tweetid,
                        content: this.tweetComment
                    },
                     
                }).then((response) => {
                    console.log(response)
                    window.location.reload()
                }).catch((error) => {
                    console.log(error)
                })
            }
        }
    }
    
</script>

<style scoped>
  .Mybutton{
        align-items: center;
        background-color: rgb(11, 111, 241);
        border-color: darkmagenta;
        border-width: thick;
    }
</style>