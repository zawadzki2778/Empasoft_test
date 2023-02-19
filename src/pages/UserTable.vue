<template>
  <b-container fluid>
    <h3 class="text-center p-3">СПИСОК ПОЛЬЗОВАТЕЛЕЙ</h3>
    <!-- ==============  user creating ============== -->
    <div class="d-flex justify-content-center flex-wrap">
      <SearchUser :value="search" @search="search = $event" />
      <div class="text-center">
        <b-button
          lg="4"
          class="plr-2"
          pill
          variant="outline-primary"
          @click="openCreateModal"
          >Создать пользователя</b-button
        >
        <b-modal id="createUser" title="Создание пользователя" hide-footer>
          <!-- <b-form-input
            type="number"
            :state="idState"
            v-model="id"
            class="mb-2"
            placeholder="Введите ваш ID"
            aria-describedby="input-live-help input-live-id"
            trim
          ></b-form-input> -->
          <label>имя пользователя</label>
          <b-form-input
            :state="usernameState"
            v-model="form.username"
            class="mb-2"
            placeholder="username"
            aria-describedby="input-live-help input-live-username"
            trim
          ></b-form-input>
          <b-form-invalid-feedback id="input-live-username">
            только латинские буквы, от 3 до 150 символов
          </b-form-invalid-feedback>
          <label class="mt-2 text-left">имя</label>
          <b-form-input
            :state="firstNameState"
            v-model="form.firstName"
            class="mb-2"
            placeholder="введите ваше имя"
            aria-describedby="input-live-help input-live-firstName"
            trim
          ></b-form-input>
          <b-form-invalid-feedback id="input-live-username">
            от 3 до 150 символов
          </b-form-invalid-feedback>
          <label class="mt-2 text-left">фамилия</label>
          <b-form-input
            :state="lastNameState"
            v-model="form.lastName"
            class="mb-2"
            placeholder="введите вашу фамилию"
            aria-describedby="input-live-help input-live-lastName"
            trim
          ></b-form-input>
          <b-form-invalid-feedback id="input-live-username">
            от 3 до 150 символов
          </b-form-invalid-feedback>
          <label class="mt-2 text-left">пароль</label>
          <b-form-input
            :state="passwordState"
            v-model="form.password"
            class="mb-2"
            placeholder="введите пароль"
            aria-describedby="input-live-help input-live-password"
            trim
          ></b-form-input>
          <b-form-invalid-feedback id="input-live-password">
            только латинские буквы, от 8 до 128 символов, 1 цифра, 1 заглавнвя
            буква
          </b-form-invalid-feedback>
          <!-- вывод ошибки от бэка -->
          <!-- <span>{{ error[0] }}</span> -->
          <b-button
            class="m-2"
            @click="addUser"
            variant="success"
            :disabled="
              usernameState && firstNameState && lastNameState && passwordState
                ? (disabled = false)
                : (disabled = true)
            "
            >Создать</b-button
          >
        </b-modal>
      </div>
    </div>

    <!-- Main table element -->
    <b-table
      class="mt-3"
      :fields="fields"
      :filter="filter"
      :items="itemsFilter"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      stacked="md"
      show-empty
      small
    >
      <!-- ========== eddit and delete ========= -->
      <template #cell(actions)="row">
        <b-button
          size="sm"
          @click="info(row.item, $event.target)"
          class="mr-4"
          variant="link"
        >
          Редактировать
        </b-button>
        <b-button size="sm" @click="deleteUser(row.item)" variant="link"
          >Удалить</b-button
        >
      </template>
    </b-table>
    <!-- =======  editing user in modal ======== -->
    <b-modal
      :id="infoModal.id"
      title="Редактировать"
      @hide="resetInfoModal"
      hide-footer
    >
      <label>имя пользователя</label>
      <b-form-input
        v-model="infoModal.content.username"
        class="mb-2"
        placeholder="username"
        aria-describedby="input-live-help input-live-username"
        trim
      ></b-form-input>
      <label class="mt-2 text-left">имя</label>
      <b-form-input
        v-model="infoModal.content.first_name"
        class="mb-2"
        placeholder="имя"
      ></b-form-input>
      <label class="mt-2 text-left">фамилия</label>
      <b-form-input
        v-model="infoModal.content.last_name"
        class="mb-2"
        placeholder="фамилия"
      ></b-form-input>
      <!-- Добавили свою кнопку + метод на сохранение данных при редактировании -->
      <b-button
        class="m-2"
        @click="editUser(infoModal.content.id)"
        variant="success"
        >Редактировать</b-button
      >
    </b-modal>
  </b-container>
</template>

<script>
import SearchUser from "@/components/SearchUser.vue";
export default {
  name: "UserTable",
  components: { SearchUser },
  data() {
    return {
      items: [],
      form: {
        username: "",
        firstName: "",
        lastName: "",
        password: "",
        isActive: true,
      },
      error: "",
      search: "", // Добавил для фильтрации
      id: "",
      errors: [],
      fields: [
        {
          key: "id",
          label: "ID",
          sortable: true,
        },
        {
          key: "username",
          label: "USERNAME",
          sortable: false,
        },
        {
          key: "first_name",
          label: "FIRST NAME",
          sortable: false,
        },
        {
          key: "last_name",
          label: "LAST NAME",
          sortable: false,
        },
        {
          key: "is_active",
          label: "ACTIVE",
          sortable: false,
        },
        {
          key: "actions",
          label: "",
        },
      ],
      sortBy: "", // bootstrap
      sortDesc: false, // bootstrap
      filter: null, // bootstrap
      infoModal: {
        // bootstrap
        id: "info-modal",
        content: "",
      },
    };
  },
  computed: {
    // ============ My filtration ========== //
    itemsFilter() {
      let array = this.items,
        search = this.search;
      if (!search) return array;
      search = search.trim().toLowerCase();
      array = array.filter(function (item) {
        if (item.username.toLowerCase().indexOf(search) !== -1) {
          return item;
        }
      });
      return array;
    },
    // idState() {
    //   //написал медот для проверки на уникальность по ID
    //   let userId = this.tems.find((item) => item.id === this.id);
    //   return userId === undefined ? false : true;
    // },
    // ============ Validation ============== //
    usernameState() {
      const validUsername = /^[\w.@+-]+$/.test(this.form.username);
      return validUsername &&
        this.form.username.length > 2 &&
        this.form.username.length < 150
        ? true
        : false;
    },
    firstNameState() {
      return this.form.firstName.length > 2 && this.form.firstName.length < 150
        ? true
        : false;
    },
    lastNameState() {
      return this.form.lastName.length > 2 && this.form.lastName.length < 150
        ? true
        : false;
    },
    passwordState() {
      const validPassword = /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(
        this.form.password
      );
      return validPassword &&
        this.form.password.length > 8 &&
        this.form.password.length < 128
        ? true
        : false;
    },
  },
  mounted() {
    this.getUserData();
  },
  methods: {
    getUserData() {
      this.$http({
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
          "Content-Type": "application/json; charset=UTF-8",
        },
        url: `https://test-assignment.emphasoft.com/api/v1/users/`,
      }).then((res) => {
        this.items = res.data;
      });
    },
    // ========== bootstrap method =============== //
    info(item, button) {
      this.infoModal.content = item; // заменил JSON на item, т.е. мой объект
      this.id = this.infoModal.content.id; // добавил
      this.username = this.infoModal.content.username; // добавил
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    // =============== Create user =============== //
    addUser() {
      this.$http({
        method: "POST",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
          "Content-Type": "application/json; charset=UTF-8",
        },
        url: `https://test-assignment.emphasoft.com/api/v1/users/`,
        data: {
          username: this.form.username,
          first_name: this.form.firstName,
          last_name: this.form.lastName,
          password: this.form.password,
          is_active: true,
        },
      })
        .then((res) => {
          this.$bvModal.hide("createUser");
          (this.form.username =
            this.form.firstName =
            this.form.lastName =
            this.form.password =
              ""), // очищаем инпуты
            this.getUserData(); // объявляем для реактивности
          console.log(res);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    },
    // ============== Edit user ============== //
    editUser(item) {
      this.$http({
        method: "PUT",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
          "Content-Type": "application/json; charset=UTF-8",
        },
        url: `https://test-assignment.emphasoft.com/api/v1/users/${item}`,
        data: {
          username: this.infoModal.content.username,
          first_name: this.infoModal.content.first_name,
          last_name: this.infoModal.content.last_name,
          password: "5OD3h/ZD}7T0!'K}|%1b!CSl[iAqO",
          is_active: true,
        },
      })
        .then((res) => {
          this.$bvModal.hide("info-modal");
          this.getUserData(); // объявляем для реактивности
          console.log(res);
        })
        .catch((err) => {
          console.log(err.response.data);
          // this.error = err.response.data.;
        });
    },
    // ==================== Delete user =================== //
    deleteUser(item) {
      this.$http({
        method: "DELETE",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
          "Content-Type": "application/json; charset=UTF-8",
        },
        url: `https://test-assignment.emphasoft.com/api/v1/users/${item.id}`, // т.к. в запросе от бэка указан ID
      }).then(() => {
        this.getUserData();
      });
    },
    // =========== bootstrap method ============== //
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    openCreateModal() {
      this.$bvModal.show("createUser"); // открываем
      this.id = this.username = ""; // очищаем инпуты
    },
  },
};
</script>

<style scoped>
h3 {
  font-weight: 600;
}
@media (max-width: 700px) {
  h3 {
    font-size: 18px;
  }
}
label {
  color: #007bff;
}
.container-fluid {
  background-color: #e3f0ff;
  padding-bottom: 5px;
  border: 2px solid slategrey;
  border-radius: 5px;
}
.table {
  background-color: white;
  border-radius: 5px;
}
</style>