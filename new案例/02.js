// 1. 获取canvas
// 2. 创建上下文
// 3. 着色器编写，将位置坐标和颜色都用变量去替代
// 4. 清空canvas
// 5. 绘制一条线
const canvas = document.querySelector("#canvas2");
const gl = canvas.getContext("webgl");
const VERTEX_SHADER_SOURCE2 = `
    attribute vec4 a_Position;
    void main(){
        gl_Position=vec4(0.0,0.0,0.0,1.0);
        gl_PointSize=5.0;
    }
    `;

const FRAGMENT_SHADER_SOURCE2 = `
    void main(){
        //uv坐标
        vec2 uv=gl_FragCoord.xy/u_resolution;
        gl_FragColor=vec4(uv.x,uv.y,0.0,1.0);
    }
    `;
//指定着色器源码
const vertextshader2 = gl.createShader(gl.VERTEX_SHADER);
const fragmentshade2 = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(vertextshader2, VERTEX_SHADER_SOURCE2);
gl.shaderSource(fragmentshade2, FRAGMENT_SHADER_SOURCE2);
//编译着色器
gl.compileShader(vertextshader2);
gl.compileShader(fragmentshade2);
// 创建一个程序对象
const program2 = gl.createProgram();
gl.attachShader(program2, vertextshader2);
gl.attachShader(program2, fragmentshade2);
gl.linkProgram(program2);
gl.useProgram(program2);
gl.drawArrays(gl.POINTS, 0, 2);
