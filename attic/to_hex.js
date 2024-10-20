function to_hex(array) { // array: Uint8Array
  return [...new Uint8Array(array)]
    .map(x => x.toString(16).padStart(2, '0'))
    .join('');
}

export { to_hex }