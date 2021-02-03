const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const slugify = require('slugify');
const transform = require('./transform');
const sanitizeWhitespace = require('./helpers/sanitize-whitespace');

/**
 * Writes transformed data to destination
 * @type {function}
 * @param {object} data - Data to write
 * @param {string} dest - Destination path
 * @return {Promise} - Promise that resolves once all data is written
 */
const writePages = (data, dest) => {
  return new Promise((resolve, reject) => {
    if (typeof data != 'object') reject('Data must be an object');

    const itemCounts = {
      'Files Written': 0,
      'Invalid status': 0,
    };

    /**
     * Recurse through a parent item's children and write data
     */
    const recurseChildrenAndWritefile = ({
      parent,
      parentPath = '',
    }) => {
      return parent.children.map(child => {
        return new Promise((resolve, reject) => {
          // Get the `status` of the item
          // const status = slugify(child.status.data.name.toLowerCase());

          // Skip the item if its status is "Not populated yet"
          // if (status === 'not-populated-yet') { itemCounts['Invalid status']++; return; }

          // Build the output file path for the item
          const childName = slugify(child.name.toLowerCase());
          const fullPath = (parentPath.length ? parentPath + '/' : '') + childName;
          const filePath = path.join(dest, fullPath + '.json');
          const folderPath = path.dirname(filePath);

          if ('content' in child) {
            // Build the data to write
            // const jsonData = JSON.stringify(transform(child));
            const jsonData = JSON.stringify(child);

            itemCounts['Files Written']++;

            // Write the file
            mkdirp(folderPath, (err) => {
              if (err) reject(err);

              fs.writeFile(filePath, jsonData, 'utf8', (err) => {
                if (err) reject(err);
                resolve();
              })
            })
          }

          // If the item has children, run this function recursively on its children
          if ('children' in child) recurseChildrenAndWritefile({
            parent: child,
            parentPath: fullPath
          });
        });
      });
    }

    Promise.all(recurseChildrenAndWritefile({
        parent: data
      }))
      .then(resolve(itemCounts));
  });
}

module.exports = writePages;