<template v-if="visible">
  <div class="FieldTable">
     <el-table
        v-loading="loading"
        :data="tableData"
        style="width: 100%"
        size="mini"
        height="200"
        class="table">
         <el-table-column :label="key" v-for ="(value,key) in tableData[0]"  :key="key" >
            <template slot-scope="scope">
                    <span>{{scope.row[key]}}</span>
            </template>
        </el-table-column>
      </el-table>
  </div>
</template>
<script>
import axios from "axios"
import { getList } from '@/api/table'

export default {
  data() {
    return {
      tableData:[],
      loading:true,
    }
  },
  props:[
    'visible'
  ],
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
  },
}
</script>
<style>
.FieldTable{
  position: absolute;
  z-index: 9999
}
</style>
