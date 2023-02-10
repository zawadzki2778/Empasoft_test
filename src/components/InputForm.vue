<template>
  <div>
    <label>Пример диапазона с минимальным и максимальным</label>
    <b-form-input
      v-model="username"
      placeholder="Введите ваше имя"
      :state="nameState"
      aria-describedby="input-live-help input-live-feedback"
      trim
    ></b-form-input>
    <b-form-invalid-feedback id="input-live-feedback">
      Введите не менее 3 букв
    </b-form-invalid-feedback>
    <label>Пример диапазона с минимальным и максимальным</label>
    <b-form-input
      class="mt-2"
      type="password"
      v-model="password"
      placeholder="Введите ваш пароль"
    ></b-form-input>
     <b-button @click="openTable" variant="outline-primary">Кнопка</b-button>
  </div>
</template>

<script>
export default {
  name: "InputForm"
}
</script>