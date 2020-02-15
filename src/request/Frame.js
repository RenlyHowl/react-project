
// 引入axios
import axios from "axios"

// 引入antd的message组件来处理错误
import {message} from "antd"


// 获取是否为开发模式
const isEnv = process.env.NODE_ENV === "development";


// 创建一个axios的实例
const service = axios.create({
  /*
  baseUrl如果是开发模式就为我们的mock数据,不是就为空
  */
  baseURL: isEnv ? "http://rap2api.taobao.org/app/mock/243199" : "",
  // baseURL: "http://rap2api.taobao.org/app/mock/243199",

})

// 3.设置拦截器(请求拦截器和响应拦截器)
/*注意 是要设置两个 这里的拦截器是实例的拦截器(不是axios的拦截器
  )*/

// 3.1 发送请求之前的拦截器
service.interceptors.request.use((config) => {
  
  //  输出config
  // console.log(config);
  /*

  config.data = Object.assign(
    {}, config.data, {authToken: window.localStorage.getItem("authToken")}
  );

  */
 // 先设置一个假的token字符串
  config.data = Object.assign(
  {}, config.data, {authToken: "authTokenPlaceholder"}
  );
  return config; //可以在config里面加token
})



// 3.2 接收到数据之前的拦截器
service.interceptors.response.use((resp) => {
  // 打印一下我们返回的数据
  // console.log(resp.data);
  // console.log(resp);
  // 接收响应数据之前的设置
  // console.log(resp.data.data)
  if(resp.data.code === "200") {
    /*
    // 这里的code字段是我们在rap2.taobao.org里设置的
    // 返回我们要渲染的数据列表lists
    */
    return resp.data.data;

  } else {
    // 全局处理错误

    /* 这里的错误我们也采用 antd的组件进行渲染*/

    // console.log("错误")
    // message.error("Error Fetal, can't receive data");
    message.error(resp.data.errMsg);
    
  }
})

// 4.暴露一个方法 返回我们的axios实例
export const getArticleList = (offset = 0, limited = 10) => {
  // 返回的是一个Promise对象

  // 加传token验证
  // return service.post("/api/v1/articlelist", {authToken: "renly"}); // 我们这里的authToken是放在拦截器里面进行设置的
  return service.post("/api/v1/articlelist", {
    offset,
    limited,
  });

  /*
  注意这里的路径是我们后端的接口,而不是前端界面的路由接口;
  也就是我们下面写的地址
  */
  // "/admin/article"
}


// 这里是通过id删除文章的方法
export const deleteArticle = (id) => {
  return service.post(`/api/v1/article/delete/${id}`)
}


// 通过id获取单个文章的方法
export const editArticle = (id) => {
  return service.post(`/api/v1/article/${id}`)
}

// 通过id提交修改后文章的方法
// 通过id获取单个文章的方法

export const saveArticle = (id, params) => {
  return service.post(`/api/v1/articleEdit/${id}`, params)
}
