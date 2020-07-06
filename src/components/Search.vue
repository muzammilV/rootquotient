<template>
  <div class="row justify-center">
    <div class="col-6">
      <h6>Search Result for "{{searchText}}"</h6>
      <div class="row" v-for="x in questions" :key="x._id">
        <div class="col-2 q-pl-md-xl q-pl-sm">{{x.views}}</div>
        <div
          class="col-10 font-weight-bold text-secondary cursor-pointer questions"
          @click="openQuestion(x._id,x.title,x.desc)"
        >
          <div>{{x.title}}</div>
          <q-chip v-for="(xx,i) in x.tags" :key="i" text-color="white" color="secondary">{{xx}}</q-chip>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchText: "",
      questions: []
    };
  },
  beforeMount() {
    if (this.$route.query.id) {
      this.searchText = this.$route.query.id;
      this.$axios
        .post("/api/ask/search", { text: this.searchText })
        .then(res => {
          console.log(res.data);
          this.questions = res.data.questions;
          this.$q.loading.hide();
        })
        .catch(err => {
          console.error(err.response);
          this.$q.loading.hide();
        });
    } else {
      this.$router.push("/");
    }
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

<style>
</style>