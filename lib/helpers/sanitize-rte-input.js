const sanitizeRteInput = (input) => {
  if (typeof input !== 'string') return input;
  return input
    .replace(/<p><\/p>/g, '')           // Remove empty <p> tags
    .replace(/<p>\s+<\/p>/g, '')        // Remove empty <p> tags
    .replace(/<br>/g, '')               // Remove line breaks
    .replace(/<br\/>/g, '')             // Remove line breaks
    .replace(/<br\s+\/>/g, '')          // Remove line breaks
    .replace(/\t/g, '')                 // Remove tabs
    .replace(/<p>\s+\[/g, '[')       // Shortcode start with whitespace
    .replace(/<p>\[/g, '[')          // Shortcode start w/o whitespace
    .replace(/\]\s+<\/p>/g, ']')     // Shortcode end with whitespace
    .replace(/\]<\/p>/g, ']')        // Shortcode end w/o whitespace
    .replace(/\]<br>\s+<\/p>/g, ']') // Shortcode end br with newline
    .replace(/\]<br><\/p>/g, ']')    // Shortcode end br w/o newline
    .replace(/”/g, '"')                 // Malformed quotes
    .replace(/“/g, '"')                 // Malformed quotes
}

module.exports = sanitizeRteInput;
