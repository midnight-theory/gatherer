const FlatToNested = require('flat-to-nested');

/**
 * Transforms data returned from GatherContent API by properly nesting
 * children in parent objects.
 * 
 * @type {function}
 * @param {array} items - Array of JSON objects
 * @return {Promise} - Promise that resolves with transformed data
 */
const nest = ({
  items,
  id,
  parent,
}) => {
  return new Promise((resolve, reject) => {
    if (items.constructor !== Array) reject('Items must be an array');

    const flatToNested = new FlatToNested({
      id,
      parent,
    });

    // Remove `parent_id` key for the `flatToNested` function,
    // else it will not work because of `parent_id: 0`
    // const transformedItems = items.map(item => {
    //   if (!item['parent_id']) delete item['parent_id'];
    //   return item;
    // })

    // Convert the structure from flat to nested based on `parent_id` key
    let nestedItems = flatToNested.convert(items);

    // If `nestedItems` has an ID key at the root-level,
    // then there is only 1 parent item in the dataset.
    // In this case, we move the item into a `children` array
    // so that the data structure is consistent with most cases
    // where there are multiple top-level parent items.
    // if ('uuid' in nestedItems) nestedItems = {
    //   children: [nestedItems]
    // };

    resolve(nestedItems);
  });
}

module.exports = nest;