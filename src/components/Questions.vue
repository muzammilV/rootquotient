<template>
  <div>
    <div class="row justify-center" v-if="!questionsLoaded">
      <q-spinner-comment color="secondary" size="50px " />
    </div>
    <!-- <div class="row" v-else> -->
    <div class="row" v-for="x in questions" :key="x._id" v-else>
      <div class="col-2 q-pl-md-xl q-pl-sm">{{x.views}}</div>
      <div
        class="col-10 font-weight-bold text-secondary cursor-pointer questions"
        @click="openQuestion(x._id,x.title,x.desc)"
      >
        <div>{{x.title}}</div>
        <q-chip v-for="(xx,i) in x.tags" :key="i" text-color="white" color="secondary">{{xx}}</q-chip>
      </div>
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  name: "Questions",
  data() {
    return {
      questionsLoaded: false,
      questions: []
    };
  },
  beforeMount() {
    this.$axios
      .get("api/ask?page=1")
      .then(res => {
        this.questionsLoaded = true;
        this.questions = res.data.questions;
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    openQuestion(id, title, desc) {
      this.$axios
        .get(`api/ask/addviews?id=${id}`)
        .then(res => {
          console.log(res);
        })
        .catch();
      this.$router.push(`/ask-one?id=${id}`);
    }
  }
};
</script>

<style lang="scss">
.questions {
  font-size: 20px;
  transition: all 0.3s ease-in-out;
}
.questions:hover {
  font-weight: bolder;
}
</style>