import Vue from "vue";
import VueRouter from "vue-router";
import LoginPage from "../views/Login.vue";
import SignupPage from "../views/Signup.vue";
import FeedPage from "../views/Feed.vue";
import UserProfile from "../views/Profile.vue";

Vue.use(VueRouter);

const routes = [
  
  {
   
    path: '/',
    name: 'signup-page',
    component: SignupPage
  },
  {
   
    path: '/login',
    name: 'login-page',
    component: LoginPage
  },
  {
    path: '/feed',
    name: 'feed-page',
    component: FeedPage
    
  },
  {
    path: '/profile',
    name: 'user-profile',
    component: UserProfile
  },
 

];

const router = new VueRouter({
  routes
});

export default router;