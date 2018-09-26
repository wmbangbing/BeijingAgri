<template>
    <el-container class="container">
        <el-aside width="200px" class="aside">Aside</el-aside>
        <el-container>
            <el-header class="header">
                Header
                <el-button type="primary" @click="logout">退出</el-button>
            </el-header>
            <el-main class="main">Main
                <el-button type="primary" @click="getApi">获取数据</el-button>               
            </el-main>
            <el-footer class="footer">foot</el-footer>
        </el-container>
    </el-container>
</template>
<script>
    import axios from "axios"
    export default{
        name:"Layout",
        methods: {
            logout() {
                this.$store.dispatch('LogOut').then(() => {
                    location.reload()// In order to re-instantiate the vue-router object to avoid bugs
                })
            },
            getApi(){
                axios.get('http://202.114.148.160/webapi/api/values')
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
        }
    }
</script>

<style scopedSlots>
    .container{
        position: fixed;
        height: 100%;
        width: 100%;
    }

    .header{
        background-color: darkkhaki
    } 

    .aside{
        background-color:darkseagreen
    } 

    .main{
        background-color:whitesmoke
    }

    .footer{
        background-color:sienna
    }
</style>
