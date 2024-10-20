function Uniform( gl, program, name, suffix ) {
  this.gl = gl
  this.program = program
  this.name = name;
  this.suffix = suffix;
  this.location = this.gl.getUniformLocation( program, name );
}

Uniform.prototype.set = function( ...values ) {
  var method = 'uniform' + this.suffix;
  var args = [ this.location ].concat( values );
  this.gl[ method ].apply( this.gl, args );
};

export {  Uniform }