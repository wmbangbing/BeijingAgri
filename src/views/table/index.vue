<template>
  <div class="app-container">
    <div>
      <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%"
        size="mini"
        class="table">
         <el-table-column :label="key" v-for ="(value,key) in tableData[0]"  :key="key" >
            <template slot-scope="scope">
                    <span>{{scope.row[key]}}</span>
            </template>
        </el-table-column>
      </el-table>
      </div>
  </div>
</template>

<script>
import axios from "axios"
import { getList } from '@/api/FieldBlock'

export default {
  data() {
    return {
      tableData:[],
      loading:true,
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      getList().then(response => {
        debugger;
        this.tableData = response.data
        this.loading = false
      })
    }
    //   var _this = this;
    //   axios.get('http://202.114.148.160/webapi/api/values')
    //   .then(function (response) { 
    //     debugger;   
    //     _this.tableData = response.data;     
    //     _this.loading = false;
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    // }
  },
  // mounted(){
  //   var _this = this;
  //   axios.get('http://202.114.148.160/webapi/api/values')
  //   .then(function (response) {    
  //     _this.tableData = response.data;     
  //     _this.loading = false;
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  // }
}
</script>

<style>
</style>

