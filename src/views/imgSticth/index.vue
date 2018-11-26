<template>
  <div> 
    <el-button-group class="img-btn">
      <el-button type="primary" @click="centerDialogVisible = true">上传</el-button>      
      <el-button type="primary" @click="sticth">拼接</el-button>
      <el-button type="primary" @click="sticth">重新生成</el-button>
      <!-- <el-button type="primary" @click="sticth">拼接</el-button> -->
    </el-button-group>  
    <el-dialog
      title="上传影像"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
       <el-upload
        class="upload-img"
        drag
        action="http://202.114.148.160/webapi/api/img/TestPostFile"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
    </el-dialog>
     <div class="imgDiv">
        <img id="mergedImg" style="width:100%;" />
      </div>
  </div>
</template>
<script>
  import axios from "axios"
  import imgP from '@/assets/stitch_result.jpg'

  export default  {
    name:"",
    data() {
      return {
        centerDialogVisible: false
      };
    },
    methods:{
      sticth(){
        // console.log("HAHA")
        var _this = this;
        axios.get('http://202.114.148.160/webapi/api/img/GetPicture')
        .then(function (response) { 
          debugger;
          console.log(imgP)
          mergedImg.src = imgP;
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    }
  }
</script>
<style>
.upload-img{
  margin: 0 auto; 
  text-align: center
}
.img-btn{
    position: absolute;
    left: 50%;
    top:20px;
    transform: translate(-50%);
}
.imgDiv{
  width: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
