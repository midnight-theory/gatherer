module.exports = (string) => {
  return string.replace(/\s/g, '').replace(new RegExp(String.fromCharCode(8203), 'g'), '');
}
