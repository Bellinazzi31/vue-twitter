<template>
  <div class="like-container">
    <button @click="likeTweet(tweetId)" v-if="isLiked == false">
      <i class="fas fa-thumbs-up"></i>
    </button>
    <button @click="unlikeTweet" v-else-if="isLiked == true">
      <i class="fas fa-thumbs-down"></i>
    </button>
    <span>Likes: {{ likesAmount }}</span>
  </div>
</template>


<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "TweetLikes",
  data() {
    return {
      likesNum: [],
      isLiked: false,
      likesAmount: 0,
    };
  },
  props: {
    tweetId: Number,
  },
  mounted() {
    this.getLikes();
  },
  methods: {
    likeTweet(tweetId) {
      (this.isLiked = true),
        axios
          .request({
            url: "https://tweeterest.ml/api/tweet-likes",
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'X-Api-Key':  'QEYysOftSHseKha8slzLGq2WnFmPVmOqLvNJ5f45MEovC',
            },
            data: {
              loginToken: cookies.get("session"),
              tweetId: this.tweetId,
            },
          })
          .then((response) => {
            console.log(response);
            this.likesAmount++;
          })
          .catch((error) => {
            console.log(error);
          });
    },
    getLikes() {
      axios
        .request({
          url: "https://tweeterest.ml/api/tweet-likes",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key":  "QEYysOftSHseKha8slzLGq2WnFmPVmOqLvNJ5f45MEovC",
          },
          params: {
            tweetId: this.tweetId,
          },
        })
        .then((response) => {
          console.log(response);
          this.likesNum = response.data;
          this.likesAmount = this.likesNum.length;

          let currentUser = cookies.get("userId");
          for (let i = 0; i < this.likesNum.length; i++) {
            if (currentUser == this.likesNum[i].userId) {
              this.isLiked = true;
              return;
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    unlikeTweet() {
      (this.isLiked = false),
        axios
          .request({
            url: "https://tweeterest.ml/api/tweet-likes",
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              "X-Api-Key":  "QEYysOftSHseKha8slzLGq2WnFmPVmOqLvNJ5f45MEovC",
            },
            data: {
              loginToken: cookies.get("session"),
              tweetId: this.tweetId,
            },
          })
          .then((response) => {
            console.log(response);
            this.likesAmount--;
          })
          .catch((error) => {
            console.log(error);
          });
    },
  },
};
</script>


<style scoped>
</style>