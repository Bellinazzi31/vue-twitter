<template>
  <div>
    <h3>{{ tweetObject.username }}</h3>
    <p>{{ content }}</p>
    <tweet-likes :tweetId="tweetObject.tweetId"></tweet-likes>
    <tweet-delete v-if="isOwned" :tweetId="tweetObject.tweetId"></tweet-delete>
  </div>
</template>

<script>
import TweetDelete from "./TweetDelete.vue";
import cookies from "vue-cookies";
import TweetLikes from "./TweetLikes.vue";

export default {
  name: "page-tweet",
  components: {
    TweetDelete,
    TweetLikes,
  },
  props: {
    tweetObject: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isOwned: cookies.get("userId") == this.tweetObject.userId,
      content: this.tweetObject.content,
    };
  },
  methods: {
    updateTweet(newContent) {
      this.content = newContent;
    },
  },
};
</script>


<style scoped>
</style>