/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
import { client } from './client';
import {parse, stringify} from 'flatted/esm';

export default {
  async getMainNav() {
    try {
      // if (getLocalStorage('nav'))
      //   return getLocalStorage('nav');
      const response = await client.getEntries({
        content_type: 'homepage',
        'sys.id': process.env.VUE_APP_HOME_PAGE_ENTRY_ID,
        select: 'fields.children',
        include: 5
      });
      let children = response.items[0].fields.children;
      setLocalStorage('nav', children);
      return children;
    } catch (err) {
      // eslint-disable-next-line no-console
      console.err;
    }
  },

  async getHomePageContent() {
    const id =  process.env.VUE_APP_HOMEPAGE_ID;
    return this.byId(id);
  },
  async getFooterContent() {
    const id =  process.env.VUE_APP_FOOTER_ID;
    return this.byId(id);
  },
  async getAsset(id) {
    if (getLocalStorage(id))
    return getLocalStorage(id);

    const response = await client.getAsset(id);
    setLocalStorage(id, response);
    return response;
  },
  async byId(id) {
    // if (getLocalStorage(id))
    //   return getLocalStorage(id);

      // const response = await client.getEntry(id);
      const response = await client.getEntries({'sys.id': id, limit: 1, include: 10});
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
      // eslint-disable-next-line no-console
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
        // return data that should be available
        // in the template
        return {
          navItems: pages.items
        };
      })
      // eslint-disable-next-line no-console
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
      setLocalStorage(key, response.items[0]);
      // console.log(parseHtml(response.items[0]));
      return response.items[0];
    } catch (err) {
      // eslint-disable-next-line no-console
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
        // return data that should be available
        // in the template
        return {
          navItems: pages.items
        };
      })
      // eslint-disable-next-line no-console
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
// const parseHtml = (entry, parent = '', level = 0, maxNesting = 3) => {
//   let content = {};
//   for (const field in entry.fields) {
//     let o = entry.fields[field];
//     let value = '';
//     if (o.fields !== undefined && level <= maxNesting) {
//       let l = level + 1;
//       value = parseHtml(o, `${parent}:${field}`, l);
//     } else if (o.nodeType !== undefined && o.nodeType === 'document') {
//       value = documentToHtmlString(o);
//     } else {
//       value = entry.fields[field];
//     }
//     if (level === 0)
//       content[field] = value;
//   }
//   return content;
// };
