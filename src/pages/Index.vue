<template>
  <q-page>
    <div class="row justify-center">
      <div class="col-md-8">
        <h4 class="q-my-md">Expert Advice</h4>
        <p>Get answer to difficult questions.</p>
      </div>
    </div>
    <div class="row justify-evenly">
      <div class="col-md-6 col-xs-10">
        <q-input outlined v-model="searchText" color="secondary" class="q-ml-md">
          <template v-slot:append>
            <q-icon class="cursor-pointer" name="search" @click="search" />
            <!-- <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''" /> -->
          </template>
        </q-input>
      </div>
      <div class="col-md-2 col-xs-8 text-center">
        <q-btn
          color="secondary"
          class="q-pa-sm q-my-xs"
          label="Ask a qoestion"
          @click="goToAskPage"
        />
      </div>
    </div>
    <div class="row q-ma-md-xl">
      <div class="col-2 col-md-2">Views</div>
      <div class="col-10 col-md-10">Questions</div>
    </div>
    <Questions />
  </q-page>
</template>

<script>
import Questions from "components/Questions";
export default {
  name: "PageIndex",
  components: {
    Questions
  },
  data() {
    return {
      searchText: ""
    };
  },
  methods: {
    search() {
      if (this.searchText === "") {
        this.$store.dispatch("showAlert", "Enter title or tags to search");
      } else {
        this.$q.loading.show({
          message: "Please wait...."
        });
        this.$router.push("/search?id=" + this.searchText);
      }
    },
    goToAskPage() {
      if (this.$store.getters.getAuth) {
        this.$router.push("/ask");
      } else {
        this.$store.dispatch("showAlert", "Please login to ask questions.");
      }
    }
  }
};
</script>
