<template>
  <div class="search col-md-8 col-sm-12">   
    <!-- Search input -->
    <b-form-input
      class="input-search" 
      placeholder="Search username"
      type="text"
      v-model="search"
    />
  </div>
</template>

<script>
export default {
  name: "SearchUser",
  value: {
    props: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      search: "",
    };
  },
  watch: {
    search(val) {
      this.$emit("search", val);
    },
  },
};
</script>

<style>

.input-search {
  margin: 0 auto 20px;
  padding: 6px 6px 6px 24px !important;
  border-radius: 30px;
  font-size: 16px;
  width: 100%;
  height: auto;
}
</style>
