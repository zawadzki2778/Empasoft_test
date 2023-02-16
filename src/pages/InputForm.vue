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
      </b-form-invalid-feedback>
      <div class="text-center">
        <b-button
          class="m-3"
          @click="openTable"
          variant="success"
          :disabled="nameState && passwordState ? (disabled = false) : (disabled = true)"
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
      const validUsername = /^[\w.@+-]+$/.test(this.username);
      return validUsername && this.username.length < 150 ? true : false;
    },
    passwordState() {
      const validPassword = /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(this.password);
      return validPassword && this.username.length < 150 ? true : false;
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
      }).then((res) => {
        if (res.status == 400) {
          console.log(res.data.non_field_errors);
        } else {
          console.log(res);
          localStorage.setItem("token", res.data.token); // Кладём токен при авторизации  в локольное хранилище
          this.$router.push({ name: "UserTable" });
        }
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
@media (max-width: 380px) {
  h3 {
    font-size: 18px;
  }
}
</style>