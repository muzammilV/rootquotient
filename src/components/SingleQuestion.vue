<template>
  <div>
    <div class="row q-pa-xs-md q-pa-sm-md q-pa-md-xl q-pa-xl text-weight-bold">
      <div class="col-2">Views</div>
      <div class="col-8 q-px-md">Questions</div>
    </div>
    <div class="row q-px-xs-md q-px-sm-md q-px-md-xl q-px-xl">
      <div class="col-2">{{views}}</div>
      <div class="col-8 q-px-md">
        <div>
          <b>{{title}}</b>
        </div>
        <div class="text-body1" style="width:100%;text-align:justify;word-break: break-all">
          <p>{{desc}}</p>
          <b>Answers</b>
        </div>
      </div>
    </div>

    <div class="row q-px-xs-md q-px-sm-md q-px-md-xl q-px-xl">
      <div class="col-2"></div>
      <div class="col-8 q-px-md">
        <div class="text-body1" style="width:100%;text-align:justify;word-break: break-all">
          <div v-if="noans" class="text-center">
            <b>No Answers Submitter yet!!</b>
          </div>
          <div
            class="q-pa-xs"
            v-else
            v-for="(ans,i) in answers"
            :key="ans._id"
          >{{i+1}}.{{ans.answer}}</div>
        </div>
      </div>
    </div>
    <div class="row justify-center q-pa-xs-md q-pa-sm-md q-pa-md-xl q-pa-xl">
      <div class="col-6 col-xs-12 col-sm-12 col-md-6">
        <h6 class="q-my-sm">ANSWERS</h6>
        <q-input color="secodary" outlined v-model="newans" type="textarea" label="Answer" />
        <q-btn class="q-mt-xs" color="secondary" label="POst answer" @click="onSubmittingAns" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SingleQuestion",
  data() {
    return {
      id: "",
      title: "",
      views: "",
      desc: "",
      answers: [],
      newans: "",
      noans: true
    };
  },
  beforeMount() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id;
      this.$axios
        .get(`api/ask/single?id=${this.$route.query.id}&page=1`)
        .then(res => {
          console.log(res.data);
          if (res.data.answers.length > 0) {
            this.answers = res.data.answers;
            this.noans = false;
          }
          this.title = res.data.questions.title;
          this.desc = res.data.questions.desc;
          this.views = res.data.questions.views;
        })
        .catch(err => {});
    } else {
      this.$store.dispatch("showAlert", "Invalid URL");
      this.$router.push("/");
    }
  },
  methods: {
    onSubmittingAns() {
      if (this.$store.getters.getAuth) {
        this.$axios
          .post(
            "api/ask/answer",
            {
              questionId: this.id,
              answer: this.newans
            },
            {
              headers: {
                Authorization: `Bearer ${this.$store.getters.getAuthToken}`
              }
            }
          )
          .then(res => {
            // console.log(res);
            this.$router.go();
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$store.dispatch("showAlert", "Please login to ans");
      }
    }
  }
};
</script>

<style>
</style>