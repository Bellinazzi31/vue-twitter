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
      <p>Email</p>
      <input type="text" id="email-input" v-model="email" />
      <p>Password</p>
      <input type="password" id="password-input" v-model="password" /><br />
    </div>
    <button @click="loginUser" class="button is-info">Login</button>
    <h5 id="login-status">{{ loginStatus }}</h5>
    <p>Create Account ?</p>
    <button class="button is-info" @click="signup">Sign Up</button>
  </div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      loginStatus: "",
    };
  },
  methods: {
    loginUser: function () {
      this.loginStatus = "Loading..";
      axios
        .request({
          method: "POST",
          url: "https://tweeterest.ml/api/login",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key":  "QEYysOftSHseKha8slzLGq2WnFmPVmOqLvNJ5f45MEovC",
          },
          data: {
            email: this.email,
            password: this.password,
            loginStatus: this.loginStatus,
          },
        })
        .then((response) => {
          this.loginStatus = "Success";
          cookies.set("session", response.data.loginToken);
          cookies.set("userId", response.data.userId);
          this.$router.push("/feed");
        })
        .catch((error) => {
          console.log(error);
          this.loginStatus = "Error";
          alert("Invalid email or password");
        });
    },
    signup() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss">
.container {
  width: 100%;
  height: 100%;
  padding: 0 16px;
  margin: auto;
  place-content: center;
  place-items: center;
  display: grid;
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