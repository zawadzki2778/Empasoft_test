<template>
  <b-container class="col-lg-6 col-md-6 col-sm-6" fluid>
    <h3 class="text-center p-3">СПИСОК ПОЛЬЗОВАТЕЛЕЙ</h3>
    <!-- ======= filtration/search ======== -->

    <!-- ======= user creating ======== -->
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
          <b-form-input
            :state="idState"
            v-model="id"
            class="mb-2"
            placeholder="Введите ваш ID"
            aria-describedby="input-live-help input-live-id"
            trim
          ></b-form-input>
          <!-- <b-form-invalid-feedback id="input-live-id">
            id совпадают
          </b-form-invalid-feedback> -->
          <b-form-input
            :state="usernameState"
            v-model="username"
            class="mb-2"
            placeholder="Введите ваше имя"
            aria-describedby="input-live-help input-live-username"
            trim
          ></b-form-input>
          <b-button @click="addUser" variant="success">Создать</b-button>
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
      <template #cell(actions)="row">
        <b-button
          size="sm"
          @click="info(row.item, $event.target)"
          class="mr-1"
          variant="link"
        >
          Редактировать
        </b-button>
      </template>
    </b-table>

    <!-- ======= user editing ======== -->
    <b-modal
      :id="infoModal.id"
      title="Редактировать"
      @hide="resetInfoModal"
      hide-footer
    >
      <!-- Вывожу инпуты в модалке, привязаные к значению из таблицы -->
      <b-form-input v-model="id" class="mb-2"></b-form-input>
      <b-form-input v-model="username" class="mb-2"></b-form-input>
      <!-- Добавили свою кнопку + метод на сохранение данных при редактировании -->
      <b-button @click="editUser(infoModal.id)" variant="outline-success"
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
      search: "", // Добавил для фильтрации
      id: "", 
      username: "", 
      // disabled: true,
      errors: [],
      fields: [
        {
          key: "id",
          label: "ID",
          sortable: true,
          class: "text-center",
        },
        {
          key: "username",
          label: "USERNAME",
          sortable: false,
        },
        {
          key: "actions",
          label: "EDIT",
        },
      ],
      sortBy: "", // bootstrap
      sortDesc: false, // bootstrap
      filter: null, // bootstrap
      infoModal: {
        // bootstrap
        id: "info-modal",
        title: "",
        content: "",
      },
    };
  },
  computed: {
    // ====== My filtration ======= //
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
    idState() {
      let users = this.items.find(item => item.id == this.id)
      return users
    },
    usernameState() {
      return this.username.length > 2 ? true : false
    }
  },
  mounted() {
    // Getting data from fake-server
    this.getUserData();
  },
  methods: {
    // Getting data from fake-server
    async getUserData() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      try {
        this.items = await response.json();
      } catch (errors) {
        this.errors = await response.json();
      }
    },
    /* getUserData() {
      return this.$http({
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "application/json; charset=UTF-8",
        },
        url: `https://test-assignment.emphasoft.com/api/v1/users/`
      }).then((res) => {
        console.log(res)
      })
    }, */

    // bootstrap method

    info(item, button) {
      this.infoModal.content = item; // заменил JSON на item, т.е. мой объект
      this.id = this.infoModal.content.id; // добавил
      this.username = this.infoModal.content.username; // добавил
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    // Create user
    addUser() {
      this.items.push({
        id: this.id,
        username: this.username,
      });
      this.$bvModal.hide("createUser");
    },
    // Editing user
    editUser(button) {
      this.infoModal.content.id = this.id;
      this.infoModal.content.username = this.username;
      this.$bvModal.hide(button); // добавили закрытие модалки по ID
    },
    // bootstrap method
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