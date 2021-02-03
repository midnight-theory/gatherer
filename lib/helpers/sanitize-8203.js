module.exports = (string) => {
  return string.replace(new RegExp(String.fromCharCode(8203), 'g'), '');
}
