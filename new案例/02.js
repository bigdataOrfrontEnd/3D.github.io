const canvas = document.querySelector("#canvas2");
const gl = canvas.getContext("webgl");
const VERTEX_SHADER_SOURCE2 = `
    void main(){
        gl_Position=vec4(0.0,0.0,0.0,1.0);
        gl_PointSize=5.0;
    }
    `;

const FRAGMENT_SHADER_SOURCE2 = `
    void main(){
        gl_FragColor=vec4(1.0,0.0,0.0,1.0);
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
