<template>
  <div class="search">   
    <!-- Search input -->
    <b-form-input
      class="input-search"
      type="text"
      :placeholder="placeholder"
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
    placeholder: {
      type: String,
      default: "Search",
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
  width: 50%;
  height: auto;
}
</style>
