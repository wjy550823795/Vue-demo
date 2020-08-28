<template>
  <div name="show" class="haha">
    <ul>
      <li v-for="(goods,index) in list" :key="index">
        <img v-bind:src="goods.img" />
        <p>{{goods.name}}</p>
      </li>
    </ul>
  </div>
</template>
<style>
.haha img {
  width: 180px;
  height: auto;
}
.haha li {
  list-style: none;
  float: left;
  width: 200px;
  height: 200px;
  font-size: 9px;
  margin-bottom: 30px;
  color: red;
}
</style>
<script>
export default {
  name: "show",
  data() {
    var obj = this;
    var url = "json/background.json";
    this.axios.get(url).then(function(res) {
      obj.list = res.data;
    });
    return {
      list: []
    };
  },
  props: {
    goodId: Number
  },
  watch: { //监听
    goodId() {
        var obj = this;
        var url = "json/background.json";
        if(obj.goodId==2||obj.goodId==4){
            url = "json/shouji.json";
        }
        this.axios.get(url).then(function(res) {
            obj.list = res.data;
        });
    return {
      list: []
    }; 
    }
  },
  mounted() {},
  methods: {}
};
</script>