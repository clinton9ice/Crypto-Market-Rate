<template>
<ClientOnly>
  <div class="cont" v-if="!columns && !Array.isArray(columns)">
  No Data
  </div>
  <div v-else>
        <div class="tb-headline mb-4 d-flex justify-content-end">

          <div class="block">
          <label class="form-label d-block" for="rows"> Number of rows </label>
            <Select v-model="rows" style="width:200px">
              <Option v-for="item in selectCounts" :value="item" :key="item">{{ item }}</Option>
            </Select>
          </div>
        </div>
    <div class="table-container">
      <table  class="table responsive table-hover bg-dark  table-dark px-3">

        <thead class="thead mb-2">    
          <td class="th" v-for="(th, index) in columns" :key="index">
            <th class="border-0 nowrap">{{ th.title }} </th>
          </td>
        </thead>
        <br />

        <tbody class="tbody pt-5 bg-bodi" id="market_table">
          <tr  v-for="(item, index) in display_list()" :key="index">
            <slot name="td" :data="item"/>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="controls mt-4" v-if="row_count > 0">
      <div class="d-flex gap-1 justify-content-end">
      <button class="btn btn-sm me-2" @click="prev" :class="[current_column != 1?'btn-light': 'text-secondary border-secondary']" :disabled="current_column === 1">Prev</button>
      <div v-for="item in row_count-1" :key="item" class="ms-2">
        <button class="btn btn-rounded btn-light btn-sm" @click="selected(item)" :class="[item === current_column&&'btn-dark']"> 
          {{item}}
        </button> 
      </div>
      <button class="btn btn-sm ms-2" @click="next" :class="[current_column === row_count-1? 'text-secondary border-secondary': 'btn-secondary']">Next</button>
      </div>
    </div>
  </div>
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
    datas: {
      type: Array,
      required: true
    }
  },

  data() {
    let rows = 25, current_column = 1
    return { rows, current_column, row_count: 0, lists: [], selectCounts:[25, 50, 60, 70] }
  },

  watch:  {
    datas(data) {
      this.lists = data;
        this.row_count = Math.ceil(this.lists.length / this.rows);
    }
  },

  methods: {
    prev() { 
      if (this.current_column > 1) this.current_column--;
    },
    next() {
       if (this.current_column  != this.row_count-1) this.current_column++;
    },
    selected(index) {
      this.current_column = index
    },

    display_list() {
        let loop_start = this.rows * this.current_column;
        let loop_end = loop_start + this.rows;
        let paginatedItems = this.lists.slice(loop_start, loop_end);
        return paginatedItems
    }
  },
}
</script>

<style scoped>
.table-container{
  max-width: 1000px;
  overflow-x: auto;
}

</style>
