let parent = [];
const getParent = child => {
  let slug = child.slug;
  if (slug !== undefined) {
    parent.unshift(slug);
    getParent(child.parent.fields);
  }
  return parent;
}

export default {
  urlBuilder(page) {
    let ancestors = getParent(page);
    return `/${ancestors.join('/')}`;
  },  
};