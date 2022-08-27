<template>
<ClientOnly>
  <div class="cont" v-if="!columns && !Array.isArray(columns)">
  No Data
  </div>
  <div v-else>
        <div class="tb-headline mb-4 d-flex justify-content-end">

          <div class="block">
          <label class="form-label d-block" for="rows"> Number of pages </label>
            <Select v-model="pageSize" style="width:200px">
              <Option v-for="item in selectCounts" :value="item" :key="item">{{ item }}</Option>
              <Option :value="datas.length">{{datas.length}}</Option>
            </Select>
          </div>
        </div>

    <div class="table-container m-auto">
      <table  class="table responsive table-hover bg-dark  table-dark px-3">

        <thead class="thead mb-2">    
          <td class="th" v-for="(th, index) in columns" :key="index">
            <th class="border-0 nowrap" @click="sort(th.title)">{{ th.title }} </th>
          </td>
        </thead>
        <br />

        <tbody class="tbody pt-5 bg-bodi" id="market_table" v-if="loaded">
          <tr  v-for="(item, index) in display_list()" :key="index">
            <slot name="td" :data="item"/>
          </tr>
        </tbody>
        <div class="container" v-else-if="!loaded & !empty">
            <Space size="large">
        
              <Spin size="large" />
          </Space>
        </div>
        <div class="container py-5 text-center" v-if="!loaded && empty">
          Empty Table
        </div>
      </table>
    </div>

    <div class="controls mt-4" v-if="row_count > 0">
      <div class="d-flex gap-1 justify-content-end">
         <button class="btn btn-sm me-2" @click="prev" :class="[currentPage != 1?'btn-light': 'text-secondary border-secondary']" :disabled="currentPage === 1">Prev</button>
         
          <div v-for="item in row_count" :key="item" class="ms-2">
            <button class="btn btn-rounded btn-light btn-sm" @click="selected(item)" :class="[item === currentPage&&'btn-dark']"> 
              {{item}}
            </button> 
          </div>
      <button class="btn btn-sm ms-2" @click="next" :class="[currentPage === row_count-1? 'text-secondary border-secondary': 'btn-secondary']">Next</button>
      </div>
    </div>
  </div>
  </ClientOnly>
</template>

<script>
import ClientOnly from 'vue-client-only' 
import { Space } from "view-design"
  
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
    return {
      row_count: 0,
      lists: [],
      selectCounts: [25, 50, 75, 100],
      pageSize:25,
      currentPage: 1,
      loaded: false,
      empty: false
    }
  },

  watch:  {
    datas(data) {
      if (data) {
        this.lists = data;
        this.row_count = Math.ceil(this.lists.length / this.pageSize);
        this.loaded = true
      }
    }
  },

  methods: {
    prev() { 
      if (this.currentPage > 1) this.currentPage--;
    },

    next() {
       if (this.currentPage  < 1) this.currentPage++;
    },

    selected(index) {
      this.currentPage = index
    },

    display_list() {
       return this.lists.filter((row, index) => {
              let start = (this.currentPage-1)*this.pageSize;
              let end = this.currentPage*this.pageSize;
              if(index >= start && index < end) return true;
       });
  
    }
  },
  created() {
    if(!this.loaded) setTimeout(() => {
      this.empty = true;
    }, 4000);
  },
}
</script>

<style scoped>
.table-container, .tb-headline{
  max-width: 1200px;
}
.table-container{
  overflow-x: auto;
}

</style>
