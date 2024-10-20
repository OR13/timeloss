
function addShader( gl, program, source, type ) {
  var shader = gl.createShader( type );
  gl.shaderSource( shader, source );
  gl.compileShader( shader );
  var isCompiled = gl.getShaderParameter( shader, gl.COMPILE_STATUS );
  if ( !isCompiled ) {
    throw new Error( 'Shader compile error: ' + gl.getShaderInfoLog( shader ) );
  }
  gl.attachShader( program, shader );
}

export { addShader }