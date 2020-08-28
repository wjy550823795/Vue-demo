<template>
    <div>
         <div>
            <GoodList :goodId=kk></GoodList>
        </div>
    </div>
</template>
<script>
import Msg from './Msg.js'
import GoodList from './GoodList.vue'
export default {
    data() {
        return {
            kk:0
        }
    },
    mounted:function () {
        var obj = this //当前vue文件 创建一个副本
        Msg.$on('val',function (m) {
            obj.kk = m; 
        })
    },
    components:{
        GoodList        
    }
}
</script>