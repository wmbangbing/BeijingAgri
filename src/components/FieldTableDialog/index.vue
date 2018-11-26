<template>
  <el-dialog
    :visible="visible"
    @close='closeDialog'
    width="90%">
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
  </el-dialog>   
</template>
<script>
import { getList } from '@/api/FieldBlock'
import { getMPData } from '@/api/MonitoringPoint'


export default {
  data(){
    return {
      visible:this.fieldTableParam.visible,
      tableData:[],
      loading:true,
    }
  },
  props:['fieldTableParam'],
  watch:{
    "fieldTableParam.visible":function(curVal,oldVal){
      this.visible = true;
      if(this.fieldTableParam.id === "fieldTableDK"){
        this.loading = true
        getList().then(response => {
          // debugger;
          this.tableData = response.data
          this.loading = false
        })
      }else{
        this.loading = true
        getMPData().then(response => {
          // debugger;
          this.tableData = response.data
          this.loading = false
        })
      }
    }
  },
  methods:{
    closeDialog(){
      this.visible = false;
    }
  }
}
</script>
