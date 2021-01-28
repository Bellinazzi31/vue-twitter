<template>
  <div>
    <button id="tweet-delete" class="button is-danger" @click="deleteTweet">
      <i class="fas fa-trash-alt">Tweet</i>
    </button>
  </div>
</template>


<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "tweet-delete",
  props: {
    tweetId: {
      type: Number,
      required: true,
    },
  },
  methods: {
    deleteTweet: function () {
      axios
        .request({
          url: "https://tweeterest.ml/api/tweets",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key":  "QEYysOftSHseKha8slzLGq2WnFmPVmOqLvNJ5f45MEovC",
          },
          method: "DELETE",
          data: {
            loginToken: cookies.get("session"),
            tweetId: this.tweetId,
          },
        })
        .then((response) => {
          console.log(response);
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