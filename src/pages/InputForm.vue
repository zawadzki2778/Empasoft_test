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
        только латинские буквы, от 3 до 150 символов
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
        только латинские буквы, от 8 до 128 символов, 1 цифра, 1 заглавнвя буква
      </b-form-invalid-feedback>

      <div class="text-center">
        <b-button
          class="m-3"
          @click="openTable"
          variant="success"
          :disabled="
            nameState && passwordState ? (disabled = false) : (disabled = true)
          "
          >подтвердить</b-button
        >
        <!-- можно забаиндить :disabled="disabledButoon и в computed прописать метод: 
        return this.nameState && this.passwordState ? false : true -->
      </div>
    </b-container>
    <b-modal id="error-modal" title="ERROR!" hide-footer>
      <p class="my-4 text-danger">{{ error[0] }}</p>
      <b-button
        class="mt-2"
        @click="$bvModal.hide('error-modal')" 
        variant="success"
        >Close</b-button
      >
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "InputForm",
  data() {
    return {
      username: "",
      password: "",
      error: "",
      disabled: true,
    };
  },
  computed: {
    nameState() {
      const validUsername = /^[\w.@+-]+$/.test(this.username);
      return validUsername &&
        this.username.length > 2 &&
        this.username.length < 150
        ? true
        : false;
    },
    passwordState() {
      const validPassword = /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(this.password);
      return validPassword &&
        this.username.length > 8 &&
        this.username.length < 150
        ? true
        : false;
    },
  },
  methods: {
    openTable() {
      this.$http({
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        url: `https://test-assignment.emphasoft.com/api/v1/login/`,
        data: {
          username: this.username,
          password: this.password,
        },
      })
        .then((res) => {
          localStorage.setItem("token", res.data.token); // Кладём токен при авторизации  в локольное хранилище
          this.$router.push({ name: "UserTable" });
        })
        .catch((err) => {
          this.error = err.response.data.non_field_errors;
          this.$bvModal.show("error-modal"); // открываем модалку по id
        });
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
label {
  color: #007bff;
}
@media (max-width: 380px) {
  h3 {
    font-size: 18px;
  }
}
</style>