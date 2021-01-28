<template>
  <div class="follow-container">
    <button
      class="button is-success is-rounded"
      @click="follow"
      v-if="isFollowing == false"
    >
      Follow
    </button>
    <button
      class="button is-success is-rounded"
      @click="unfollow"
      v-else-if="isFollowing == true"
    >
      Unfollow
    </button>
    <span>follows: {{ followAmount }}</span>
    <following-user></following-user>
  </div>
</template>






<script>
import axios from "axios";
import cookies from "vue-cookies";
import Followinguser from "./Follow.vue";
export default {
  name: "FollowButton",
  components: {
    Followinguser,
  },
  data() {
    return {
      isFollowing: false,
      usersFollowing: [],
      followAmount: 0,
    };
  },
  props: {
    userId: Number,
  },
  mounted() {
    this.following();
  },
  methods: {
    follow() {
      axios
        .request({
          url: "https://tweeterest.ml/api/follows",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key":  "QEYysOftSHseKha8slzLGq2WnFmPVmOqLvNJ5f45MEovC",
          },
          data: {
            loginToken: cookies.get("session"),
            followId: this.userId,
          },
        })
        .then((response) => {
          console.log(response);
          this.isFollowing = true;
          this.followAmount++;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    unfollow() {
      axios
        .request({
          url: "https://tweeterest.ml/api/follows",
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key":  "QEYysOftSHseKha8slzLGq2WnFmPVmOqLvNJ5f45MEovC",
          },
          data: {
            loginToken: cookies.get("session"),
            followId: this.userId,
          },
        })
        .then((response) => {
          console.log(response);
          this.isFollowing = false;
          this.followAmount--;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    following() {
      axios
        .request({
          url: "https://tweeterest.ml/api/follows",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key":  "QEYysOftSHseKha8slzLGq2WnFmPVmOqLvNJ5f45MEovC",
          },
          params: {
            userId: cookies.get("userId"),
          },
        })
        .then((response) => {
          console.log(response);
          this.usersFollowing = response.data;
          this.followAmount = this.usersFollowing.length;

          let currentUser = cookies.get("userId");
          for (let i = 0; i < this.usersFollowing.length; i++) {
            if (currentUser == this.usersFollowing[i].userId) {
              this.isFollowing = true;
            }
          }
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