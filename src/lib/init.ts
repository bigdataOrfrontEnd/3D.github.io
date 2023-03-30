function inits(
  gl: WebGLRenderingContext,
  VERTEX_SHADER_SOURCE: string,
  FRAGMENT_SHADER_SOURCE: string
) {
  //指定着色器源码

  const vertextshader: any = gl.createShader(gl.VERTEX_SHADER);
  const fragmentshade: any = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(vertextshader, VERTEX_SHADER_SOURCE);
  gl.shaderSource(fragmentshade, FRAGMENT_SHADER_SOURCE);
  //编译着色器
  gl.compileShader(vertextshader);
  gl.compileShader(fragmentshade);
  // 创建一个程序对象
  const program: any = gl.createProgram();
  gl.attachShader(program, vertextshader);
  gl.attachShader(program, fragmentshade);
  gl.linkProgram(program);
  gl.useProgram(program);

  return program;
}
