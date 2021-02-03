const slugify = require('slugify');
const sanitizeWhitespace = require('./sanitize-whitespace');
const sanitizeRteInput = require('./sanitize-rte-input');

module.exports = (fieldGroupLabel, fieldLabel, item) => {
  const fieldGroup = item.config.filter(fieldGroup => {
    return slugify(fieldGroup.label.toLowerCase().trim()) === slugify(fieldGroupLabel.toLowerCase().trim());
  })[0];

  const field = fieldGroup.elements.filter(field => {
    return slugify(field.label.toLowerCase().trim()) === slugify(fieldLabel.toLowerCase().trim());
  })[0];

  let value = field.value;

  if (field.type === 'text') {
    value = sanitizeWhitespace(value);
    if (!field.plain_text) value = sanitizeRteInput(value);
  }

  return value;
}
