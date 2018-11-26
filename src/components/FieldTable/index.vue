<template >
  <div class="FieldTable" >
     <el-table
        v-if="visible"
        v-loading="loading"
        :data="tableData"
        size="mini"
        height="200"
        class="table">
         <el-table-column :label="key" v-for ="(value,key) in tableData[0]"  :key="key" >
            <template slot-scope="scope">
                    <span>{{scope.row[key]}}</span>
            </template>
        </el-table-column>
      </el-table>
      <div><el-button @click="open">测试</el-button></div>
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
  props:[
    "visible"
  ],
  created() {
    // this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      getList().then(response => {
        // debugger;
        this.tableData = response.data
        this.loading = false
      })
    },
    open() {
      this.$emit('showbox','the msg'); //触发showbox方法，'the msg'为向父组件传递的数据
    }
  },
}
</script>
<style>
.FieldTable{
  /* position: absolute;
  z-index: 9999 */
}
</style>
