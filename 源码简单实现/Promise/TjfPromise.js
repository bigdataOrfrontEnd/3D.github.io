// https://juejin.cn/post/7014402115053322247#heading-10

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
    this._status = PENDING; // 新增变量，配合status的set,get,具体要他干啥还不知道
    this.FULFILLED_CALLBACK = [];
    this.REJECTED_CALLBACK = [];
    try {
      callback(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }
  get status() {
    return this._status;
  }
  set status(newStatus) {
    this._status = newStatus; // 用_status防止嵌套触发set,陷入死循环
    // 状态改变的时候立即调用存储的回调
    if (newStatus === FULFILLED) {
      this.FULFILLED_CALLBACK.forEach((caback) => caback(this.value));
    }
    if (newStatus === REJECTED) {
      this.REJECTED_CALLBACK.forEach((caback) => caback(this.reason));
    }
  }
  //promise的状态只能由pending(待定)-->fulfilled(已兑现)或者pending--->rejected(已拒绝)
  //调用resolve方法的时候,status由pending变为fulfilled

  //   情况一：如果resolve传入一个普通的值或者对象，那么这个值会作为then回调的参数
  //   情况二：如果resolve中传入的是另外一个Promise，那么这个新Promise会决定原Promise的状态：
  // 情况三：如果resolve中传入的是一个对象，并且这个对象有实现then方法，那么会执行该then方法，并且根据then方法的结果来决定Promise的状态

  resolve(value) {
    if (this.status === PENDING) {
      this.value = value; //// 赋值要在状态改变的前面，顺序不能变,否则输出null
      this.status = FULFILLED;
    }
  }
  reject(reason) {
    if (this.status === PENDING) {
      this.reason = reason;
      this.status = REJECTED;
    }
  }
  //实现then方法
  //1.then方法对异步的支持,当状态处于pending的时候,要把回调函数存放起来,等到状态改变了再调用(使用了get和set方法)
  //2.then方法本身是有返回值的，它的返回值是一个Promise,然后是具体这个promise处于什么状态
  //2.1 then方法中对回调参数的判断----then方法如果传入的参数不是或者没有传值，应该做处理为一个直接返回的函数

  then(onFulfilled, onRejected) {
    const realOnFulfilled = this.isFunction(onFulfilled)
      ? onFulfilled
      : (value) => value;
    const realOnRejected = this.isFunction(onRejected)
      ? onRejected
      : (reason) => {
          throw reason;
        };
    const Promise2 = new MyPromise((resolve, reject) => {
      const fulfilledMicrotask = () => {
        try {
          queueMicrotask(() => {
            const x = realOnFulfilled(this.value);
            this.resolvePromise(Promise2, x, resolve, reject);
          });
        } catch (error) {
          reject(error);
        }
      };
      const rejectedMicrotask = () => {
        try {
          queueMicrotask(() => {
            const x = realOnFulfilled(this.reason);
            this.resolvePromise(Promise2, x, resolve, reject);
          });
        } catch (error) {
          reject(error);
        }
      };

      switch (this.status) {
        case FULFILLED:
          fulfilledMicrotask(this.value);
          break;
        case REJECTED:
          rejectedMicrotask(this.reason);
          break;
        case PENDING:
          //将回调函数存储起来,等待调用
          this.FULFILLED_CALLBACK.push(onFulfilled);
          this.REJECTED_CALLBACK.push(onRejected);
      }
    });
    return Promise2;
  }
  resolvePromise(promise2, x, resolve, reject) {
    if (x === promise2) {
      return new TypeError("the promise and x refer to the same");
    }
    if (x instanceof MyPromise) {
      queueMicrotask(() => {
        x.then((y) => {
          this.resolvePromise(promise2, y, resolve, reject);
        }, reject);
      });
    } else if (typeof x === "object" || this.isFunction(x)) {
      if (x === null) resolve(x);
      let then = null;
      try {
        then = x.then;
      } catch (error) {
        return reject(error);
      }
      resolve(x);
    }
  }

  //验证是否为函数
  isFunction(func) {
    return typeof func === "function";
  }
}
//test1
// new MyPromise((resolve, reject) => {
//   resolve(11);
// }).then((value) => console.log(value));

// new MyPromise((resolve, reject) => {
//   // 定时器是异步的
//   setTimeout(() => {
//     resolve(11);
//   }, 1000);
// }).then((value) => console.log(value));
// 测试一下多次调用
// const promise = new MyPromise((resolve, reject) => {
//   // 定时器是异步的
//   setTimeout(() => {
//     resolve(11);
//   }, 1000);
// });
// promise.then((value) => console.log("1", value));
// promise.then((value) => console.log("2", value));
// promise.then((value) => console.log("3", value));
