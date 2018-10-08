<template>
  <div class="app-container">
    <div>
      <el-table
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

export default {
  data() {
    return {
      tableData: ""
    }
  },
  mounted(){
    var _this = this;
    axios.get('http://202.114.148.160/webapi/api/values')
    .then(function (response) {    
      _this.tableData = response.data;     
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}
</script>

<style>
.table{
  position: relative
}
</style>

