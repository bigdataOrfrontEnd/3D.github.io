//在通过new创建Promise对象时，我们需要传入一个回调函数，我们称之为executor
// promise接受一个立即执行的函数，该函数有两个回调参数，resolve,reject
// promise有三个状态，pending, fulfilled, rejected, 且只能由pending转为其他两中状态
// proise的then方法，可以拿到变化后的promise的状态，并返回一个新的promise对象
// then方法中对回调值的处理函数的实现
// promise的静态方法，resolve,reject,race,all

// 定义promise的三种状态
const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
class MyPromise {
  // 传入回调参数并立即执行
  constructor(callback) {
    this.status = PENDING; //初始状态为pending
    this.value = null;
    this.reason = null;
    try {
      callback(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }
  //promise的状态只能由pending(待定)-->fulfilled(已兑现)或者pending--->rejected(已拒绝)
  //调用resolve方法的时候,status由pending变为fulfilled

  //   情况一：如果resolve传入一个普通的值或者对象，那么这个值会作为then回调的参数
  //   情况二：如果resolve中传入的是另外一个Promise，那么这个新Promise会决定原Promise的状态：
  // 情况三：如果resolve中传入的是一个对象，并且这个对象有实现then方法，那么会执行该then方法，并且根据then方法的结果来决定Promise的状态

  resolve(value) {
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;
    }
  }
  reject(reason) {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = reason;
    }
  }
  //实现then方法
  then(onFulfilled, onRejected) {
    switch (this.status) {
      case FULFILLED:
        onFulfilled(this.value);
        break;
      case REJECTED:
        onRejected(this.reason);
        break;
    }
  }
}
//test1
new MyPromise((resolve, reject) => {
  resolve(11);
}).then((value) => console.log(value));
