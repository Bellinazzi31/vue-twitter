<template>
  <div class="container">
    <div>
      <img id="img" src="@/assets/logo.jpg" alt="tweeter logo" />
    </div>
    <div id="text">
      <h1>Tweeter</h1>
      <p>Welcome to Tweeter!</p>
    </div>
    <div class="details">
      <p>Username</p>
      <input type="text" id="username-input" v-model="username" />
      <p>Email</p>
      <input
        type="text"
        id="email-input"
        v-model="email"
        class="starndard-input"
      />
      <p>Password</p>
      <input type="password" id="password-input" v-model="password" />
      <p>Bio</p>
      <input type="text" id="bio-input" v-model="bio" />
      <p>birthdate</p>
      <input
        type="text"
        id="birthdate-input"
        v-model="birthdate"
        placeholder="yyyy-mm-dd"
      />
      <br />
    </div>
    <button @click="signupUser" class="button is-info">Sign up</button>

    <p>Already have an Account?</p>
    <button @click="signin" class="button is-info">Sign in</button>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "Signup",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      bio: "",
      birthdate: "",
    };
  },
  methods: {
    signupUser: function () {
      axios
        .request({
          method: "POST",
          url: "https://tweeterest.ml/api/users",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key":  "QEYysOftSHseKha8slzLGq2WnFmPVmOqLvNJ5f45MEovC",
          },
          data: {
            email: this.email,
            username: this.username,
            password: this.password,
            bio: this.bio,
            birthdate: this.birthdate,
          },
        })
        .then((response) => {
          console.log(response);
          cookies.set("session", response.data.loginToken);
          cookies.set("userId", response.data.userId);
          this.$router.push("/feed");
        })
        .catch((error) => {
          console.log(error);
        });
    },

    signin: function () {
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="scss">
#img {
  margin-top: 1rem;
}
#text {
  p {
    font-size: 1.5rem;
  }
}
.details p {
  margin-bottom: 0;
}
input {
  margin-bottom: 1rem;
  width: 60%;
}
button {
  margin-bottom: 1rem;
}
</style>