
import { Uniform } from "./Uniform.js";
import { Rect } from "./Rect.js";
import { addShader } from "./addShader.js";

console.log('✨')

var width, height;
var mouseX = 0;
var mouseY = 0;
var billboard
var uResolution
var uMouse
var uTime
var gl

let time = 0

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  uResolution.set(width, height);
  gl.viewport(0, 0, width, height);
}

function mousemove(event){
  mouseX = event.pageX;
  mouseY = height - event.pageY;
}

async function init(){
  const canvas = document.querySelector("#canvas");
  gl = canvas.getContext("webgl");
  var program = gl.createProgram();
  // add shaders
  let vertexShaderSource = await (await fetch('./shaders/1_vertex-shader.glsl')).text() 
  let fragmentShaderSource = await (await fetch('./shaders/2_fragment-shader.glsl')).text() 
  addShader(gl, program, vertexShaderSource, gl.VERTEX_SHADER);
  addShader(gl, program, fragmentShaderSource, gl.FRAGMENT_SHADER);
  // link & use program
  gl.linkProgram(program);
  gl.useProgram(program);
  // create fragment uniforms
  uResolution = new Uniform(gl, program, 'u_resolution', '2f');
  uMouse = new Uniform(gl, program, 'u_mouse', '2f');
  uTime = new Uniform(gl, program, 'u_time', '1f');

  
  // create position attrib
  billboard = new Rect(gl);
  var positionLocation = gl.getAttribLocation(program, 'a_position');
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
}

function animate() {
  // tick time
  time++
  // update
  uTime.set(time);
  uMouse.set(mouseX, mouseY);
  // render
  billboard.render(gl);
  // animate next frame
  // if (time > 10){
  //   return
  // }
  requestAnimationFrame(animate);
}

async function main() {
  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', mousemove);
  await init()
  resize();
  animate()
}

main()


