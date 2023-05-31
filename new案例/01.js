// 1. 获取canvas
// 2. 创建上下文
// 3. 着色器编写
// 4. 清空canvas
// 5. 绘制一个点
const canvas1 = document.querySelector("#canvas1");
const gl1 = canvas1.getContext("webgl");
const VERTEX_SHADER_SOURCE = `
    void main(){
        gl_Position=vec4(0.0,0.0,0.0,1.0);
        gl_PointSize=5.0;
    }
    `;

const FRAGMENT_SHADER_SOURCE = `
    void main(){
        gl_FragColor=vec4(1.0,0.0,0.0,1.0);
    }
    `;
//指定着色器源码
const vertextshader = gl1.createShader(gl1.VERTEX_SHADER);
const fragmentshade = gl1.createShader(gl1.FRAGMENT_SHADER);
gl1.shaderSource(vertextshader, VERTEX_SHADER_SOURCE);
gl1.shaderSource(fragmentshade, FRAGMENT_SHADER_SOURCE);
//编译着色器
gl1.compileShader(vertextshader);
gl1.compileShader(fragmentshade);
gl1.clearColor(1, 0.5, 0.5, 3);
gl1.clear(gl1.COLOR_BUFFER_BIT);
// 创建一个程序对象
const program = gl1.createProgram();
gl1.attachShader(program, vertextshader);
gl1.attachShader(program, fragmentshade);
gl1.linkProgram(program);
gl1.useProgram(program);
gl1.drawArrays(gl1.POINTS, 0, 1);
