import { AddCoute, ChangeBaner } from "./constants.js";
import axios from "axios";
export const AddCoutAction = (name) => {
  return { type: AddCoute, couter: name };
};
export const ActionBanners = (banners) => {
  return { type: ChangeBaner, banners: banners };
};
export const fetchHomeMultidataAction = () => {
  //如果是一个普通的action,那么我们在这里需要返回action对象
  //问题:对象中是不能拿到从服务器请求来的异步数据的
  //return{}
  // function foo(dispatch, getState) {
  //   console.log("----被执行了");
  //   // 这里面可以放异步请求,相当于回调函数
  //   axios.get("http://123.207.32.32:8000/home/multidata").then((res) => {
  //     const banners = res.data.data.banner.list;
  //     dispatch(ActionBanners(banners));
  //   });
  // }
  // //但是我们返回的是一个函数,那么redux是不支持的,这样就可以拿到数据了
  // return foo;

  // 更简单的写法
  return (dispatch, getState) => {
    console.log("----被执行了");
    // 这里面可以放异步请求,相当于回调函数
    axios.get("http://123.207.32.32:8000/home/multidata").then((res) => {
      const banners = res.data.data.banner.list;
      dispatch(ActionBanners(banners));
    });
  };
};
