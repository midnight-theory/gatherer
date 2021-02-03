/**
 * Transforms the item responses returned from GC
 * @type {function}
 * @param {object} data - Data to transform
 * @return {object} - Transformed data
 */
const transform = ({
  item: {
    id,
    folder_uuid: parent_uuid,
    name,
    position,
    created_at,
    updated_at,
    content,
    structure,
    status_id,
  },
  statuses,
}) => {
  // Pluck the important keys from the GC response
  let result = {
    id,
    position,
    status: '',
    name,
    created_at,
    updated_at,
    parent_uuid,
  };

  let fieldDetail = [];
  let structuredContent = {};

  // Perform transformations for each field group
  if (content && structure) {

    // extract all fields detail
    structure.groups.forEach((group) => {
      if (group && group.fields.length)
        group.fields.forEach(field => {
          fieldDetail.push({
            ...field
          })
        });
    });


    // populate field
    fieldDetail.forEach(field => {
      structuredContent[field.label] = {
        value: content[field.uuid],
        field_type: field.field_type,
      }
    });

    result.content = structuredContent;
  }

  // Map status to item
  const status = statuses.find(stat => stat.id === status_id.toString());
  if (status) result.status = status.name;

  return result;
}
module.exports = transform;