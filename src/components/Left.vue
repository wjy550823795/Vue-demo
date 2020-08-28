<template>
    <div>
        <div class="title">热门推荐</div>
        <ul class="menu">
            <li @click="menu1">儿子</li>
            <li @click="menu2" >孙子</li>
            <li @click="menu3" >曾孙子</li>
            <li @click="menu4" >儿子</li>
            <li>孙子</li>
            <li>曾孙子</li>
            <li>暗示自己是个弟弟？</li>
        </ul>
    </div>
</template>
<style>
.title{
    width: 100px;
    color: red;
}
.menu li{
    list-style: none;
    height: 50px;
    line-height: 50px;
    margin-top: 2px;
    background-color: white;
    cursor: pointer;
}
</style>
<script>
import Msg from './Msg.js'
export default {
    methods: {
        menu1:function () {
            Msg.$emit("val",1);
        },
        menu2:function () {
            Msg.$emit("val",2);//触发on事件
        },
        menu3:function () {
            Msg.$emit("val",3);//触发on事件
        },
        menu4:function () {
            Msg.$emit("val",4);//触发on事件
        }
    }
}
</script>