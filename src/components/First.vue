<template>
<div>
    <div>
       <router-link class="ys1" to="aaa">滚去A</router-link>
            |||
       <router-link class="ys1" to="bbb">滚去B</router-link>

       <router-view></router-view>   <!-- //挂载点 -->
    </div>
    <div class="main">
            <div class="left">
                <Left></Left>
            </div>
                <div class="right">
                    <div class="top">
                        <!-- style="transform: rotate(90deg);" -->
                        <img src="../assets/haha.png" >
                    </div>
                    <div class="bottom">
                        <Right></Right>
                    </div>
                </div>
    </div>
</div>
</template>
<script>
import Left from "../components/Left.vue"
import Right from "../components/Right.vue"
export default {
    components:{
        Left,
        Right
    }
}
</script>
<style type="text/css"> 
@import "../../public/first.css";
    *{
        padding: 0;
        margin: 0;
    }
    .left{
        width: 100px;
        float: left;
        margin-right: 20px;
    }
    .right{
        width: 1000px;
        float: left;
    }
    .main{
        width: 1200px;
        margin: 20px auto;
    }
    /* .top img{
        height: 200px;
        width: 1000px;
    } */
    .left,.right{
        background: #f5f5f5;
        height: 500px;
    }
</style>