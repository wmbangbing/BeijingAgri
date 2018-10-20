<template>
    <el-dialog 
      title="选择作物类型与生长期" 
      :visible="visible"
      @close='closeDialog'
      width="30%">
      <el-form :model="form" class="form">
        <el-form-item label="作物类型" :label-width="formLabelWidth">
          <el-select v-model="form.cropType" clearable placeholder="请选择作物">
            <el-option
              v-for="(item,index) in options.作物类型"
              :key="index"
              :label="item.lable"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作物生长期" :label-width="formLabelWidth">
          <el-select v-model="form.time" clearable placeholder="请选择时间">
            <el-option
              v-for="(item,index) in options.时间"
              :key="index"
              :label="item.lable"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="sureClick">确 定</el-button>
      </div>
    </el-dialog>
</template>

<script>

  import axios from "axios"
  import { getList } from '@/api/table'

  export default {
    data() {
      return {
        form: {
          cropType:'',
          time:'',
        },
        options:[],
        formLabelWidth: '120px',
        visible: this.selectDialogParam.visible,        
      }
    },
    props:[
      'selectDialogParam'
    ],
    watch:{
      "selectDialogParam.visible":function(curVal,oldVal){
        this.visible = true;
        this.fetchData();
      }
    },
    created() {
      // this.fetchData();
    },
    methods: {
      fetchData() {
        // // this.loading = true
        // getList().then(response => {

        //   var arr = response.data;

        //   this.options = this.unique(arr);
        //   // this.loading = false;
        // })

        this.options = this.selectDialogParam.data;
      },
      sureClick(evt) {
        var cropType = this.form.cropType;
        var time = this.form.time;
        var self = this;

        if(cropType !== "" && time !== ""){
          getList().then(response => {

            var arr = [];

            var data = response.data;

            //按选择的作物类型与时间查询，返回编号数组
            for(var i = 0; i < data.length; i++){
              if(data[i].作物类型 == cropType && data[i].时间 == time){
                arr.push(data[i].编号);
              }
            }

          self.$emit('returnId',arr);         
          })
        }else{
          this.$message({
            message:'不能为空!',
            type:"warning"
          });
        }   
      },
      closeDialog(){
        this.visible = false;
      }
    }
  }
</script>
<style scoped>
  .form{
    margin: 0 auto; 
    text-align: center
  }
</style>


