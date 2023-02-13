<template>
  <b-container fluid>
    <h3>Список пользователей с фильтрацией по Username и сортировкой по ID</h3>
    <!-- ======= filtration/search ======== -->
    <SearchUser
      :value="search"
      placeholder="Search username"
      @search="search = $event"
    />
    <!-- ======= user creating ======== -->
    <div>
      <b-button @click="showModal" ref="btnShow">Создать пользователя</b-button>
      <b-modal id="modal-1" title="Создание пользователя" hide-footer>
        <b-form-input v-model="id" class="mb-2"></b-form-input>
        <b-form-input v-model="username"></b-form-input>
        <b-button @click="hideModal">Закрой меня</b-button>
      </b-modal>
    </div>

    <!-- Main table element -->
    <b-table
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :items="itemsFilter"
      :filter-included-fields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      stacked="md"
      show-empty
      small
      @filtered="onFiltered"
    >
      <template #cell(actions)="row">
        <b-button
          size="sm"
          @click="info(row.item, row.index, $event.target)"
          class="mr-1"
        >
          Редактировать
        </b-button>
      </template>
    </b-table>

    <!-- ======= user editing ======== -->
    <b-modal
      :id="infoModal.id"
      title="Редактирование пользователя"
      @hide="resetInfoModal"
      hide-footer
    >
      <!-- Вывожу инпуты в модалке, привязаные к значению из таблицы -->
      <b-form-input v-model="id" class="mb-2"></b-form-input>
      <b-form-input v-model="username"></b-form-input>
      <!-- Добавили свою кнопку + метод на сохранение данных при редактировании -->
      <b-button @click="editUser(infoModal.id)">Сохранить</b-button>
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
      id: "", // для редактирования, что бы менялось по клику на кнопку, а не реактивно в табл.
      username: "", //  ---------- // ------------ // ----------
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
          label: "Username",
          sortable: true,
          sortDirection: "desc",
        },
        // {
        //   key: "isActive",
        //   label: "Is Active",
        //   formatter: (value) => {
        //     // убрал  key, item
        //     return value ? "Yes" : "No";
        //   },
        //   sortable: true,
        //   sortByFormatted: true,
        //   filterByFormatted: true,
        // },
        {
          key: "actions",
          label: "Edit",
        },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 15,
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
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
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
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
    // bootstrap method
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = item; // заменил JSON на item, т.е. мой объект
      this.id = this.infoModal.content.id;
      this.username = this.infoModal.content.username;
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    // editing user
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
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    showModal() {
      this.$root.$emit("bv::show::modal", "modal-1", "#btnShow");
    },
    hideModal() {
      this.$root.$emit("bv::hide::modal", "modal-1", "#btnShow");
    },
  },
};
</script>

<style scoped>
h3 {
  padding: 20px;
}
.container-fluid {
  width: 75%;
  background-color: rgb(241, 241, 241);
  padding-bottom: 5px;
}
.table {
  margin-top: 40px;
  background-color: white;
}
</style>