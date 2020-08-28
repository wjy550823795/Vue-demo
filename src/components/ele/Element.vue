<template>
  <div>
    <el-row>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row>
  </div>
</template>
<script>
import qs from 'qs';
export default {
  data() {
    return {
      //  url:"http://10.88.54.225:8080/cqc-academy",
    };
  },
  //get post put patch delete

  created() {
    /**
     * 创建axios实例
     */
    let newAxios = this.axios.create({
      baseURL: "http://10.88.54.225:8080/cqc-academy",
      timeout: "1000"
    });
    /**
     * 拦截器：在请求或响应前处理或拦截
     * 1.请求拦截
     * 2.响应拦截
     */
    newAxios.interceptors.request.use(
      config => {
        config.headers.token = '478965'
        // Do something befreqore request is sent
        // config
        return config;
      },
      error => {
        // Do something with request error
        // 请求错误时
        return Promise.reject(error);
      }
    );
    newAxios.interceptors.response.use(
      response => {
        // Do something before response is sent
        // 请求成功对响应数据处理 
        return response;
      },
      error => {
        // Do something with response error
        //
        return Promise.reject(error);
      }
    );
    /**
     * 并发请求c
     * axios.all([]),axios.spread();
     */
    this.axios.all(
        [
         newAxios.get('/haha',{params:{id:123}}),
         newAxios.get('/haha1',{params:{id:11111111}})
        ]
      ).then(this.axios.spread((res1, res2)=>{
        console.log(res1)
        console.log(res2)
        }
      ))
    /**
     * delete请求
     */
    // this.axios.delete(this.url+'/haha1',
    //   {
    //     params:{//url传参
    //       id:12
    //     }
    //   }).then(res=>{
    //       console.log(res)
    // })
    // this.axios({
    //       method:'delete',
    //       url:this.url+'/haha',
    //       data:{
    //         id:12222
    //       }
    // }).then(res=>{
    //       console.log(res)
    // })

    /***
     * post请求
     */
    // let data = {
    //   id:"12222"
    // }
    // let formData = new FormData();
    // for (let key in data) {
    //   formData.append(key,data[key])
    //   console.log(key+","+data[key])
    // }
    // this.axios.post(this.url+'/haha',formData).then(
    //   res=>{
    //     console.log(res)
    // })
    // this.axios
    //   .get("/json/shouji.json", {
    //     params: {
    //       id: 12
    //     }
    //   })
    //   .then(res => {
    //     console.log(res);
    //   });
    // this.axios({
    //   method: "get",
    //   url: "/json/shouji.json",
    //   params: {
    //       id: 1112
    //   }
    // }).then(res => {
    //   console.log(res);
    // });
  }
};
</script>