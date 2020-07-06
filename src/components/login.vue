<template>
  <q-dialog v-model="showLogin">
    <q-card class="full-width cursor-pointer">
      <div class="q-mx-xl shadow-15">
        <q-tabs
          v-model="tab"
          dense
          class="text-grey-7 rounded-borders fit"
          active-color="black"
          indicator-color="black"
        >
          <q-tab name="login" label="Login" />
          <q-tab name="signup" label="Register" />
        </q-tabs>
        <q-btn class="close-btn" rounded color="red" icon="close" v-close-popup />
      </div>
      <q-separator />
      <q-tab-panels v-model="tab" animated swipeable>
        <q-tab-panel name="login" class="q-pa-xl bg-transparent">
          <div class="row">
            <div class="col-12 text-center">
              <div class="text-bold q-my-md" style="font-size:24px;font-family:sans-serif">Login</div>
            </div>
            <div class="col-12">
              <q-form @submit="logIn" @reset="onReset" class="q-gutter-md">
                <q-input outlined v-model="email" type="email" label="Email">
                  <template v-slot:before>
                    <q-icon name="mail" />
                  </template>
                </q-input>
                <q-input
                  outlined
                  v-model="password"
                  :type="isPwd ? 'password' : 'text'"
                  label="Password"
                >
                  <template v-slot:before>
                    <q-icon name="settings" />
                  </template>
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
                <div class="text-center q-mt-lg">
                  <q-btn
                    outline
                    rounded
                    label="Login"
                    type="submit"
                    color="positive"
                    class="q-px-xl q-ma-xs"
                  />
                  <q-btn
                    outline
                    rounded
                    label="Reset"
                    type="reset"
                    color="negative"
                    class="q-px-xl"
                  />
                </div>
              </q-form>
            </div>
          </div>
        </q-tab-panel>
        <q-tab-panel name="signup">
          <div class="row">
            <div class="col-12 text-center">
              <div class="text-bold q-my-md" style="font-size:24px;font-family:sans-serif">Sign up</div>
            </div>
            <div class="col-12">
              <q-form @submit="signUp" @reset="onReset" class="q-gutter-md">
                <q-input outlined v-model="email" type="email" label="Email">
                  <template v-slot:before>
                    <q-icon name="mail" />
                  </template>
                </q-input>
                <q-input
                  outlined
                  v-model="password"
                  :type="isPwd ? 'password' : 'text'"
                  label="Password"
                >
                  <template v-slot:before>
                    <q-icon name="settings" />
                  </template>
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
                <q-input
                  outlined
                  v-model="cpassword"
                  :type="isPwd2 ? 'password' : 'text'"
                  label="Password"
                >
                  <template v-slot:before>
                    <q-icon name="settings" />
                  </template>
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd2 ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd2 = !isPwd2"
                    />
                  </template>
                </q-input>
                <div class="text-center">
                  <q-btn
                    rounded
                    outline
                    label="Register"
                    type="submit"
                    color="primary"
                    class="q-px-xl q-ma-xs"
                  />
                  <q-btn
                    rounded
                    outline
                    label="Reset"
                    type="reset"
                    color="negative"
                    class="q-px-xl"
                  />
                </div>
              </q-form>
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      showLogin: true,
      isPwd: true,
      isPwd2: true,
      tab: "login",
      email: "",
      password: "",
      cpassword: ""
    };
  },
  computed: {
    // showLogin: {
    //   get() {
    //     return this.$store.getters.getLogin;
    //   },
    //   set(value) {
    //     this.$store.commit("setLogin", value);
    //   }
    // }
  },
  methods: {
    onReset() {
      this.email = "";
      this.password = "";
      this.cpassword = "";
    },
    logIn() {
      this.$axios
        .post("/user/login", {
          email: this.email,
          password: this.password
        })
        .then(user => {
          console.warn("User logged in!!");
          this.$store.commit("setAuth", true);
          this.$store.commit("setAuthToken", user.data.token);
          this.$store.commit("setUserData", user.data.data);
          if (user.data.data.isAdmin) {
            console.warn("Logged in as Admin");

            this.$store.commit("setIsAdmin", true);
            this.$router.push("/adminboard");
          } else {
            this.$router.push("/dashboard");
          }
          this.$store.dispatch("showInfo", user.data.msg);
        })
        .catch(loginErr => {
          if (!this._.isUndefined(loginErr.response)) {
            this.$store.dispatch("showAlert", loginErr.response.data.msg);
            console.log(loginErr.response);
          } else {
            console.log(loginErr);
          }
        });
    },
    signUp() {
      this.$axios
        .post("/user", {
          email: this.email,
          password: this.password,
          cpassword: this.cpassword
        })
        .then(user => {
          this.$store.dispatch("showInfo", user.data.msg);
        })
        .catch(loginErr => {
          if (!this._.isUndefined(loginErr.response)) {
            this.$store.dispatch("showAlert", loginErr.response.data.msg);
            // console.log(loginErr.response);
          } else {
            // console.log(loginErr);
          }
        });
    }
  }
};
</script>

<style scoped>
.close-btn {
  position: absolute;
  top: -50px;
}
</style>