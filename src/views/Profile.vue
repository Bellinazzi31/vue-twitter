<template>
  <div>
    <img id="img" src="@/assets/logo.jpg" alt="tweeter logo" /><br />
    <div class="user-profile">
      <button @click="getUser">View Profile</button>
      <div>
        <p>{{ user.username }}</p>
        <p>{{ user.email }}</p>
        <p>{{ user.bio }}</p>
        <p>{{ user.birthdate }}</p>
      </div>
    </div>
    <button @click="shouldShow = !shouldShow">
      <i class="fas fa-edit"></i>Edit Profile
    </button>
    <div v-if="shouldShow">
      <profile-edit></profile-edit>
      <profile-delete></profile-delete>
    </div>
    <div class="users-profile">
      <button @click="getUsers">View Other People Profile</button>
      <div v-for="user in users" :key="user.userId">
        <h3>{{ user.username }}</h3>
        <p>{{ user.email }}</p>
        <p>{{ user.bio }}</p>
        <p>{{ user.birthdate }}</p>
        <follow :userId="userId"></follow>
      </div>
    </div>

    <signout-button></signout-button>
  </div>
</template>


<script>
import axios from "axios";
import cookies from "vue-cookies";
import Follow from "../components/Follow.vue";
import ProfileDelete from "../components/ProfileDelete.vue";
import SignoutButton from "../components/Signout.vue";

export default {
  name: "UserProfile",
  components: {
    ProfileDelete,
    SignoutButton,
    Follow,
  },

  data() {
    return {
      user: {},
      users: [],
      userId: cookies.get("userId"),
      shouldShow: false,
    };
  },

  methods: {
    getUser: function () {
      axios
        .request({
          url: "https://tweeterest.ml/api/users",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key":  "QEYysOftSHseKha8slzLGq2WnFmPVmOqLvNJ5f45MEovC",
          },
          params: {
            userId: this.userId,
          },
        })
        .then((response) => {
          console.log(response);
          this.user = response.data[0];
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getUsers: function () {
      axios
        .request({
          url: "https://tweeterest.ml/api/users",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key":  "QEYysOftSHseKha8slzLGq2WnFmPVmOqLvNJ5f45MEovC",
          },
        })
        .then((response) => {
          console.log(response);
          this.users = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
#img {
  margin-bottom: 1rem;
}
</style>