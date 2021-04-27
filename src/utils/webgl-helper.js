export function randomColor() {
  return {
    r: Math.random() * 255,
    g: Math.random() * 255,
    b: Math.random() * 255,
    a: Math.random() * 1
  };
}

function $$(str) {
  if (!str) return null
  if (str.startsWith('#')) {
    return document.querySelector(str)
  }
  let result = document.querySelectorAll(str)
  if (result.length == 1) {
    return result[0]
  }
  return result
}

export function getCanvas(id) {
  return $$(id)
}

export function resizeCanvas(canvas, width, height) {
  if (canvas.width !== width) {
    canvas.width = width ? width : window.innerWidth
  }
  if (canvas.height !== height) {
    canvas.height = height ? height : window.innerHeight
  }
}

function createShader(gl, type, source) {
  let shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  // 检测是否编译正常
  let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS)
  if (success) {
    return shader
  }
  console.error(gl.getShaderInfoLog(shader))
  gl.deleteShader(shader)
}

export function getWebGLContext(canvas) {
  return canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
}

export function createShaderFromScript(gl, type, scriptId) {
  let sourceScript = $$('#' + scriptId)
  if (!sourceScript) {
    return null
  }
  return createShader(gl, type, sourceScript.innerHTML)
}

export function createProgram(gl, vertexShader, fragmentShader) {
  if (!vertexShader || !fragmentShader) {
    console.warn('着色器不能为空')
    return
  }
  let program = gl.createProgram()
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  let success = gl.getProgramParameter(program, gl.LINK_STATUS)
  if (success) {
    return program
  }
  console.error(gl.getProgramInfoLog(program))
  gl.deleteProgram(program)
}

export function createBuffer(gl, attribute, vertexAttribPointer) {
  let { size, type, normalize, stride, offset } = vertexAttribPointer
  gl.enableVertexAttribArray(attribute)
  let buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.vertexAttribPointer(attribute, size, type || gl.FLOAT, normalize || false, stride || 0, offset || 0)
  return buffer
}
