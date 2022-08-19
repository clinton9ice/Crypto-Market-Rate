<template>
<ClientOnly>
  <div class="cont" v-if="!columns && !Array.isArray(columns)">
  No Data
  </div>

  <table v-else  class="table table-dark responsive table-hover bg-dark border-0 table-dark px-3">
    <thead class="thead mb-2">
      <td class="th" v-for="(th, index) in columns" :key="index">
        <th class="border-0">{{ th.title }} </th>
      </td>
    </thead>
    <br />

    <tbody class="tbody pt-5 bg-bodi">
      <slot name="tbData"></slot>
    </tbody>
  </table>
  </ClientOnly>
</template>

<script>
  import ClientOnly from 'vue-client-only'
export default {
  name: 'Tableu',
  components: {
    ClientOnly,
  },
  props: {
    columns: Array,
  },
}
</script>

<style lang="scss" scoped></style>
