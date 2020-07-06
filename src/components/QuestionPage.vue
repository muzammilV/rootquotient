<template>
  <div>
    <div class="row justify-center">
      <div class="col-md-8">
        <h4 class>Expert Advice</h4>
        <p>Get answer to difficult questions.</p>
      </div>
    </div>
    <div class="row justify-center">
      <div class="col-md-8">
        <h4 class="q-my-md">Ask a question</h4>
      </div>
    </div>
    <div class="row justify-center q-px-xs-sm">
      <div class="col-xs-12 col-sm-6">
        <div class="q-my-sm">
          <label for>Title</label>
          <q-input
            filled
            v-model="title"
            color="secondary"
            :rules="[val => !!val || 'Title is required']"
          />
        </div>
        <div class="q-my-sm">
          <label for>Description</label>
          <div class="q-pa-mda">
            <q-input
              v-model="desc"
              filled
              type="textarea"
              color="secondary"
              :rules="[val => !!val || 'Description is required']"
            />
          </div>
        </div>
        <div class="q-my-sm">
          <label for>Tags (separated by commas)</label>
          <q-input filled v-model="tags" color="secondary" />
        </div>
        <div>
          <q-btn color="secondary" label="post a question" @click="postQuestion" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      desc: "",
      tags: ""
    };
  },
  methods: {
    postQuestion() {
      if (this.title === "" || this.desc === "") {
        this.$store.dispatch("showAlert", "Title and Description is required");
      } else {
        this.$axios
          .post(
            "api/ask",
            {
              title: this.title,
              desc: this.desc,
              tags: this.tags
            },
            {
              headers: {
                Authorization: `Bearer ${this.$store.getters.getAuthToken}`
              }
            }
          )
          .then(res => {
            console.log(res.data);
            this.$store.dispatch("showInfo", res.data.msg);
            this.$router.push("/");
          })
          .catch(err => {
            console.log(err);
            this.$store.dispatch("showAlert", err.response.data.msg);
          });
      }
    }
  }
};
</script>

<style>
</style>