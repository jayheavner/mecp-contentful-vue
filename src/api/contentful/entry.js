import { client } from './client';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import {parse, stringify} from 'flatted/esm';

export default {
  all() {
    debugger;
    console.log(client);
    client
      .getEntries()
      .then(response => {
        debugger;
        console.log(response.items);
      })
      .catch(console.error);
  },

  async getMainNav() {
    try {
      if (getLocalStorage('nav'))
        return getLocalStorage('nav');

      const response = await client.getEntries({
        content_type: 'homePage',
        'sys.id': process.env.VUE_APP_HOME_PAGE_ENTRY_ID,
        select: 'fields.children',
        include: 5
      });
      debugger;
      let children = response.items[0].fields.children;
      setLocalStorage('nav', children);
      return children;
    } catch (err) {
      debugger;
      console.err;
    }
  },

  async getAsset(id) {
    if (getLocalStorage(id))
    return getLocalStorage(id);

    const response = await client.getAsset(id);
    setLocalStorage(id, response);
    return response;
  },
  async byId(id) {
    if (getLocalStorage(id))
      return getLocalStorage(id);

      // const response = await client.getEntry(id);
      const response = await client.getEntries({'sys.id': id});
      setLocalStorage(id, response);
    return response;
  },

  async bySlug(slug) {
    // if (getLocalStorage(slug))
    // return getLocalStorage(slug);

    try {
      let response = await client.getEntries({
        content_type: 'page',
        'fields.slug[in]': slug,
        limit: 1,
        include: 5
      });
      if (response === undefined || response.items === undefined || response.items.length === 0)
        response = await client.getEntries({
          content_type: 'page',
          'fields.altSlugs[in]': slug,
          limit: 1,
          include: 5
        });
        // setLocalStorage(slug, response.items[0]);
      return response.items[0];
    } catch (err) {
      console.err;
    }
  },

  async byType(type) {
    debugger;
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
    const key = `${type}-${title}`;
    let local = getLocalStorage(key);
    if (local)
      return local;

    try {
      const response = await client.getEntries({
        content_type: type,
        'fields.pageName[in]': title,
        limit: 1,
        include: 2
      });
      console.log(response.items[0]);
      setLocalStorage(key, response.items[0]);
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

const getLocalStorage = key => {
  if (window.localStorage.getItem(key))
    return parse(window.localStorage.getItem(key));
}

const setLocalStorage = (key, val) => {
  let json = stringify(val);
  window.localStorage.setItem(key, json);

}
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
