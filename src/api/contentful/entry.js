import { client } from './client';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

export default {
  all() {
    debugger;
    console.log(client);
    client
      .getEntries()
      .then(response => {
        debugger;
        console.log(response.items)
      })
      .catch(console.error);
  },

  async one(id) {
    const response = await client.getEntry(id);
    debugger;
    return response;
  },

  async bySlug(slug) {
    try {
      const response = await client.getEntries({
        content_type: 'simplePage',        
        'fields.slug[in]': slug,
        limit: 1,
        include: 2
      });
      return response.items[0];
    } catch (err) {
      console.err;
    }
  },

  async byType(type) {
    await client
      .getEntries({
        content_type: type,
        order: '-sys.createdAt'
      })
      .then(pages => {
        debugger;
        // return data that should be available
        // in the template
        return {
          navItems: pages.items
        };
      })
      .catch(console.error);
  },

  async byTitle(type, title) {
    try {
      const response = await client.getEntries({
        content_type: type,
        'fields.pageName[in]': title,
        limit: 1,
        include: 2
      });
      console.log(response.items[0]);
      // console.log(parseHtml(response.items[0]));
      return response.items[0];
    } catch (err) {
      console.err;
    }
  },

  async test() {
    return Promise.all([
      // fetch all blog posts sorted by creation date
      client.getEntries({
        content_type: 'topic',
        order: '-sys.createdAt'
      })
    ])
      .then(([pages]) => {
        debugger;
        // return data that should be available
        // in the template
        return {
          navItems: pages.items
        };
      })
      .catch(console.error);
  }
};

const parseHtml = (entry, parent = '', level = 0, maxNesting = 3) => {
  let content = {};
  for (const field in entry.fields) {
    let o = entry.fields[field];
    let value = '';
    debugger;
    if (o.fields !== undefined && level <= maxNesting) {
      let l = level + 1;
      value = parseHtml(o, `${parent}:${field}`, l);
    } else if (o.nodeType !== undefined && o.nodeType === 'document') {
      value = documentToHtmlString(o);
      let v = documentToHtmlString(o.content[0]);
      let v1 = documentToHtmlString(o.content[1]);
      debugger;
    } else {
      value = entry.fields[field];
    }
    if (level === 0)
      // console.log(`   parent > ${parent}\n   level > ${level}`);
      console.log({ [field]: value });
    content[field] = value;
  }
  return content;
};
