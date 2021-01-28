<template>
  <div>
    <img id="img" src="@/assets/logo.jpg" alt="tweeter logo" />
    <h1 id="title">Welcome To Twitter!</h1>
    <p>What's happening in your world</p>

    <tweet-form></tweet-form>
    <div v-for="tweet in tweets" :key="tweet.tweetId">
      <tweet-card :tweetObject="tweet"></tweet-card>
      <comment-add :tweetId="tweet.tweetId"></comment-add>
      <div id="seperate"></div>
    </div>

    <div class="profile">
      <h1>User Profile</h1>
      <button class="button is-info" @click="profile">
        <i class="fas fa-user"></i>
      </button>
    </div>
    <signout-button></signout-button>
  </div>
</template>



<script>
import axios from "axios";
import TweetForm from "../components/TweetForm.vue";
import TweetCard from "../components/Tweet.vue";
import SignoutButton from "../components/Signout";
import CommentAdd from "../components/AddComments.vue";

export default {
  name: "feed-page",
  data() {
    return {
      tweets: [],
    };
  },
  components: {
    TweetForm,
    TweetCard,
    SignoutButton,
    CommentAdd,
  },

  mounted: function () {
    this.getTweets();
  },
  methods: {
    getTweets: function () {
      axios
        .request({
          url: "https://tweeterest.ml/api/tweets",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key":  "QEYysOftSHseKha8slzLGq2WnFmPVmOqLvNJ5f45MEovC",
          },
        })
        .then((response) => {
          console.log(response);
          this.tweets = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    profile() {
      this.$router.push("/profile");
    },
  },
};
</script>

<style scoped>
#img {
  margin-bottom: 1rem;
}
#title {
  background-color: skyblue;
}
#seperate {
  background-color: rgb(190, 228, 243);
  width: 100%;
  height: 0.5rem;
}
</style>