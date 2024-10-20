#ifdef GL_ES
  precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main() {
  vec2 pixel = gl_FragCoord.xy / u_resolution.xy;
  gl_FragColor = vec4( pixel.y, 0.0, pixel.x, 1.0 );
}