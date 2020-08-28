import axios from 'axios'
import service from './collegeApi'
import { Message, Loading } from 'element-ui'

let instance = axios.create({
    baseURL: 'http://10.88.54.225:8080/cqc-academy',
    timeout: 1000
})
// let instance = axios.create({
//     baseURL: 'http://cqctj.bytedance.net/cqc-academy',
//     timeout: 1000
// })
const Http = {}; //包裹请求方法的的容器
//请求参数统一格式
for (let key in service) {
    let api = service[key] //url
    //method
    Http[key] = async function (
        params,//请求参数 get:delete put,post,patch
        isFormData = false,//标识是否是form-data请求
        config = {}//配置参数

    ) {
        let newParams = {}
        //判断content-type是否为form-data
        if (params && isFormData) {
            newParams = new FormData()
            for (let i in params) {
                newParams.append(i, params[i])
            }
        } else {
            newParams = params
        }
        let response = {}//请求的返回值
        if (api.method === 'put' || api.method === 'post' ||
            api.method === 'patch') {//修改
            try {
                response = await instance[api.method]
                    (api.url, newParams, config)
            } catch (err) {
                response = err
            }

        } else if (api.method === 'delete' || api.method === 'get') {//删除
            config.params = newParams
            try {
                response = await instance[api.method]
                    (api.url, config)
            } catch (err) {
                response = err
            }
        }
        return response;//返回响应值
    }
}
let loading;
const startLoading = () => {
    loading = Loading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)'
    });
};

const endLoading = () => {
    loading.close();
};
//请求拦截器的添加
instance.interceptors.request.use(config => {
    //遮罩层的loading
    startLoading();
    return config;
}, () => {
    endLoading();
    Message.error("请求错误,请联系管理员");
});

//响应拦截器
instance.interceptors.response.use(response => {
    endLoading();
    return response;
}, () => {
    endLoading();
    Message.error("响应错误,请联系管理员");
});
export default Http

