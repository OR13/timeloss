
import { Uniform } from "./Uniform.js";
import { Rect } from "./Rect.js";
import { addShader } from "./addShader.js";

console.log('✨')

var width, height;
var mouseX = 0;
var mouseY = 0;
var startTime = new Date().getTime(); // Get start time for animating

async function main() {
  const canvas = document.querySelector("#canvas");
  const gl = canvas.getContext("webgl");
  var program = gl.createProgram();
  // add shaders
  let vertexShaderSource = await (await fetch('./shaders/vertex-shader.glsl')).text() 
  let fragmentShaderSource = await (await fetch('./shaders/fragment-shader.glsl')).text() 
  addShader(gl, program, vertexShaderSource, gl.VERTEX_SHADER);
  addShader(gl, program, fragmentShaderSource, gl.FRAGMENT_SHADER);
  // link & use program
  gl.linkProgram(program);
  gl.useProgram(program);
  // create fragment uniforms
  var uResolution = new Uniform(gl, program, 'u_resolution', '2f');
  var uMouse = new Uniform(gl, program, 'u_mouse', '2f');
  var uTime = new Uniform(gl, program, 'u_time', '1f');
  // create position attrib
  var billboard = new Rect(gl);
  var positionLocation = gl.getAttribLocation(program, 'a_position');
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    uResolution.set(width, height);
    gl.viewport(0, 0, width, height);
  }
  function animate() {
    // update
    var now = new Date().getTime();
    var currentTime = (now - startTime) / 1000;
    uTime.set(currentTime);
    uMouse.set(mouseX, mouseY);
    // render
    billboard.render(gl);
    // animate next frame
    requestAnimationFrame(animate);
  }
  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', function (event) {
    mouseX = event.pageX;
    mouseY = height - event.pageY;
    // console.log(mouseX, mouseY)
  });
  resize();
  animate();
}

main()

