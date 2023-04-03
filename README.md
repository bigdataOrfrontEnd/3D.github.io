# 3D.github.io

前端程序员学习 3d 效果的笔记

## WebGl 简介

- webgl 是一种 3D 绘图协议，衍生于 OpenGL ES2.0，可以结合 Html5 和 JavaScript 在网页上绘制和渲染二/三维图形。

## webgl 开源框架

1. Three.js：JavaScript 3D WebGL 库
2. Babylon.js：Web3D 图形引擎
3. KickJS：Web 的开源图形和游戏引擎
4. ClayGL：构建可扩展的 Web3D 应⽤程序
5. PlayCanvas：网络游戏和 3D 图形引擎
6. WebGLStudio.js 和 Litescene.js：开源 Web 3D 图形编辑器和创建器
7. Luma：Uber 的 3D WebGL 可视化库
8. A-Frame 是用于构建 VR（虚拟现实）体验的 Web 框架
   01 实现一个最短的 webgl 程序
   - gl.clearColor(r,g,b,a) 指定清空 <canvas> 的颜⾊，接收四个参数（取值区间为 0.0~1.0）
   - gl.clear 需要和 gl.clearColor 提到的函数搭配使用
     -gl.clear 有三个参数： gl.COLOR_BUFFER_BIT 清空颜色缓存，gl.DEPTH_BUFFER_BIT 清空深度缓冲区 gl.STENCIL_BUFFER_BIT 清空模板缓冲区

## 着色器

着色器就是让开发者自己去编写一段程序，用来代替固定渲染管线，来处理图像的渲染。

### 分类

1. 顶点着色器
2. 片元着色器

### 案例：绘制一个点

### 案例：webgl 坐标

canvas 是左上角的
webgl 是画布的正中心

使用 attribute 修改坐标
attribute vec4 aPosition;

### 使用事件控制，这个的鼠标没有控制好，坐标没有计算明白

### 改变点的颜色，主要需要添加精度，如果不指定精度，就会报错，顶点着色器默认的有，不用添加

### 缓冲区对像：可以一次性地向缓冲区对象中填充大量的顶点数据，然后将这些数据保存在其中，供顶点着色器使用

# 问题记录：

这几个数据类型怎么选择
