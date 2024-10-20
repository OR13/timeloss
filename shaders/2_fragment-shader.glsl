#ifdef GL_ES
  precision lowp float;
#endif

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

vec4 black_pixel = vec4(0.0, 0.0, 0.0,1.0);

float PHI = 1.61803398874989484820459;  // Φ = Golden Ratio   
float gold_noise(in vec2 xy, in float seed){
       return fract(tan(distance(xy*PHI, xy)*seed)*xy.x);
}

vec4 noisy_pixel(in float time, in vec2 xy){
  return vec4 (
    gold_noise(xy, time+0.1),  // r
    gold_noise(xy, time+0.2),  // g
    gold_noise(xy, time+0.3),  // b
    gold_noise(xy, time+0.4)   // α
  ); 
}

// epsilon comparison is the new equality check...
const float eps = 0.01;
bool close_enough(in float a, in float b){
  return abs(a - b) < eps;
}

// close enough... but with points
bool near_point(in vec2 a, in vec2 b, in float range){
  return distance(a, b) < range;
}

vec4 pixel(){
  vec2 pixel = gl_FragCoord.xy / u_resolution;
  vec2 mouse_pixel = u_mouse / u_resolution;
  if (near_point(pixel, mouse_pixel, 0.1)){
    return black_pixel;
  }
  return vec4(pixel.x, 0.0, pixel.y, 1.0);
}

void main() {
  gl_FragColor = pixel();
}
