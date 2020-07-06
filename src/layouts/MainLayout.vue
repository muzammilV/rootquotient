<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-dark">
      <q-toolbar>
        <q-toolbar-title
          @click="$router.push('/')"
          class="cursor-pointer text-white text-weight-bold"
        >Expert Advice</q-toolbar-title>
        <div v-if="!$store.getters.getAuth">
          <q-btn text-color="white" flat label="Login" @click="onLoginBtn" />
          <q-btn text-color="white" flat label="SignUp" @click="onSignupBtn" />
        </div>
        <div v-else>
          {{$store.getters.getUserData.email}}
          <q-btn text-color="white" flat label="Menu">
            <q-menu>
              <q-list style="min-width: 100px">
                <q-item clickable v-close-popup>
                  <q-item-section>My Questions</q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section>My Answers</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn text-color="white" flat label="Logout" @click="onLogout" />
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <!-- Login -->
      <q-dialog v-model="showLogin">
        <q-card>
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Login</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>
          <q-card-section style="width:500px">
            <q-input color="secondary" class="q-ma-xs" outlined v-model="email" label="Email" />
            <q-input
              color="secondary"
              class="q-ma-xs"
              outlined
              v-model="password"
              label="Password"
            />
          </q-card-section>
          <div class="text-center">
            <q-btn class="q-ma-sm" flat text-color="secondary" label="Login" @click="onLogin" />
            <q-btn class="q-ma-sm" flat text-color="red" label="Cancel" v-close-popup />
          </div>
        </q-card>
      </q-dialog>

      <!-- Register -->
      <q-dialog v-model="showSignup">
        <q-card>
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Register</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>
          <q-card-section style="width:500px">
            <q-input color="secondary" class="q-ma-xs" outlined v-model="email" label="Email" />
            <q-input
              color="secondary"
              class="q-ma-xs"
              outlined
              v-model="password"
              label="Password"
            />
          </q-card-section>
          <div class="text-center">
            <q-btn class="q-ma-sm" flat text-color="secondary" label="Register" @click="onSignup" />
            <q-btn class="q-ma-sm" flat text-color="red" label="Cancel" v-close-popup />
          </div>
        </q-card>
      </q-dialog>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Dailog from "components/login";
export default {
  name: "MainLayout",
  components: {
    Dailog
  },
  data() {
    return {
      showLogin: false,
      showSignup: false,
      email: "",
      password: ""
    };
  },
  methods: {
    onLoginBtn: function() {
      this.showLogin = !this.showLogin;
    },
    onSignupBtn: function() {
      this.showSignup = !this.showSignup;
    },
    onLogin: function() {
      this.$axios
        .post("/user/login", {
          email: this.email,
          password: this.password
        })
        .then(user => {
          console.warn("User logged in!!", user);
          this.$store.commit("setAuth", true);
          this.showLogin = false;
          this.$store.commit("setAuthToken", user.data.token);
          this.$store.commit("setUserData", user.data);
          this.$store.dispatch("showInfo", user.data.msg);
        })
        .catch(loginErr => {
          console.log(loginErr.response.data);
          this.$store.dispatch("showAlert", loginErr.response.data.msg);
        });
    },
    onSignup: function() {
      this.$axios
        .post("/user", {
          email: this.email,
          password: this.password
        })
        .then(user => {
          this.$store.dispatch("showInfo", user.data.msg);
          console.log("User", user.data.msg);
          this.showSignup = !this.showSignup;
          this.showLogin = true;
        })
        .catch(err => {
          console.error(err);
        });
    },
    onLogout() {
      this.$store.commit("setAuth", false);
      this.$store.commit("clearState", {});
    }
  }
};
</script>
