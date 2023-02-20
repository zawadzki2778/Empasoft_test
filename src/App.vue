<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 20px;
}
/* **************** переопределяю стили bootstrap **************** */
.moko,
.foo {
  padding-left: 30px !important;
  height: 40px;
}
.moko-title {
  background-color: #d1d1d1;
}
.foo div {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100px;
}
.actions {
  padding-left: 20px !important;
  height: 40px;
}
@media (max-width: 470px) {
  .actions {
    height: 70px;
  }
}
@media (max-width: 867.98px) {
  .table.b-table.b-table-stacked-md > caption,
  .table.b-table.b-table-stacked-md > tbody,
  .table.b-table.b-table-stacked-md > tbody > tr,
  .table.b-table.b-table-stacked-md > tbody > tr > td,
  .table.b-table.b-table-stacked-md > tbody > tr > th {
    display: block;
  }
  .table.b-table.b-table-stacked-md > tbody > tr > [data-label]::before {
    content: attr(data-label);
    width: 40%;
    float: left;
    text-align: left;
    overflow-wrap: break-word;
    font-weight: bold;
    font-style: normal;
    padding: 0 calc(1rem / 2) 0 0;
    margin: 0;
  }
  .table.b-table.b-table-stacked-md > tbody > tr > [data-label]::after {
    display: block;
    clear: both;
    content: "";
  }
  .table.b-table.b-table-stacked-md > thead,
  .table.b-table.b-table-stacked-md > tfoot {
    display: none;
  }
  .actions {
    padding-left: 30px !important;
  }
  tr {
    border-bottom: 10px solid #e3f0ff; /* граница для разделения */
  }
}
@media (max-width: 373px) {
  .table.b-table.b-table-stacked-md > tbody > tr > [data-label]::before {
    font-size: 14px;
  }
}
@media (max-width: 342px) {
  .table.b-table.b-table-stacked-md > tbody > tr > [data-label]::before {
    font-size: 12px;
  }
}
</style>
