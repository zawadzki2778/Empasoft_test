<template>
  <div id="app">
    <b-container class="col-lg-4 col-md-6 col-sm-6" fluid>
      <h3 class="text-center p-3">АВТОРИЗАЦИЯ</h3>
      <label>имя пользователя</label>
      <b-form-input
        v-model="username"
        placeholder="Введите ваше имя"
        :state="nameState"
        aria-describedby="input-live-help input-live-feedback"
        trim
      ></b-form-input>
      <b-form-invalid-feedback id="input-live-feedback">
        введите не менее 3 символов
      </b-form-invalid-feedback>
      <label class="mt-2 text-left">пароль</label>
      <b-form-input
        type="password"
        v-model="password"
        placeholder="Введите ваш пароль"
        :state="passwordState"
        aria-describedby="input-live-help input-live-password"
        trim
      ></b-form-input>
      <b-form-invalid-feedback id="input-live-password">
        пароль состоит только из цифр и не менее 4х символов
      </b-form-invalid-feedback>
      <div class="text-center">
        <b-button
          class="m-3"
          @click="openTable"
          variant="outline-success"
          :disabled="nameState && passwordState ? disabled = false : disabled = true"
          >подтвердить</b-button
        >
        <!-- можно забаиндить :disabled="disabledButoon и в computed прописать : 
        return this.nameState && this.passwordState ? false : true -->
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "InputForm",
  data() {
    return {
      username: "",
      password: "",
      disabled: true,
    };
  },
  computed: {
    nameState() {
     return this.username.length > 2 ? true : false;

    },
    passwordState() {
      const check = /^\d+$/.test(this.password);
      return check && this.password.length > 3 ? true : false;
    },
  },
  methods: {
    openTable() {
      return this.$router.push({ name: "UserTable" });
    },
  },
};
</script>

<style scoped>
.container-fluid {
  background-color: white;
  padding-bottom: 5px;
  border: 2px solid slategrey;
  border-radius: 5px;
}
h3 {
  font-weight: 600;
}
@media (max-width: 380px) {
  h3 {
    font-size: 18px;
  }
}
</style>