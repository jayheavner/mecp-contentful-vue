<template>
  <section v-if='loaded'>
    <Header />
    <div class='mainBlock'>
      <section class='container padding-top-lg subPage'>
        <h2>
          <p></p>
          <p>{{ page.pageName }}</p>
          <p></p>
        </h2>
      </section>

      <section class='container padding-bottom-lg'>
        <div class='padding-vertical-lg' v-html='pageContent'></div>
      </section>
    </div>
  </section>
</template>

<script>
import Header from '@/components/Header';
import api from '@/api';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';

function renderEmbeded(node) {
  debugger;
  let linkedObject = node.data.target.sys.contentType.sys;
  switch (linkedObject.id) {
    case 'calloutLinkedContent':
      debugger;
      return renderLinkButton(node.data.target.fields);
    case 'iframe':
      return renderIFrame(node.data.target.fields);
    case 'simplePage':
      break;
      //return renderLinkButton(node.data.target.fields);
    default:
      console.log(
        `type: ${linkedObject.type}\nlinkType: ${linkedObject.linkType}\nid: ${linkedObject.id}\n`
      );
  }
}

function renderLinkButton(fields) {
  debugger;
  let html = `<div class='row'>
      <div class='col-sm-offset-6 col-sm-6 col-md-offset-8 col-md-4'>
        <a href="/${fields.linkedPage.fields.slug}" class="link-button">${fields.calloutText}<span>&gt;</span></a>
      </div>
    </div>`;
  return html;
}

function renderList(node) {
  debugger;
}

function renderImage(image) {
  return `<img alt="" max-width="100%" src="${image.url}" style='"loat: right; margin: 10px 15px;">`;
}

function renderIFrame(fields) {
  let height = fields.height ? `${fields.height}px` : '100%';
  let width = fields.width ? `${fields.width}px` : '100%';
  return `<iframe frameborder="0" height="${height}" src="${fields.link}" title="${fields.title}" width="${width}"></iframe>`;
}

//types of blocks can be found here - https://github.com/contentful/rich-text/blob/master/packages/rich-text-types/src/blocks.ts
//types of inlines can be found here - https://github.com/contentful/rich-text/blob/master/packages/rich-text-types/src/inlines.ts
const options = {
  renderNode: {
    // [BLOCKS.PARAGRAPH]: (node, next) => {
    //   try {
    //     if ( node.content.length > 1 && node.content[1].nodeType === 'embedded-entry-inline') {
    //       let embed = node.content[1];
    //       const { sys, fields } = embed.data.target;
    //       if (sys.contentType.sys.id) {
    //         return renderIFrame(fields);
    //       }
    //     }
    //   } catch (err) {
    //     debugger;
    //   }
    //   let html = '';
    //   for (const item of node.content) {
    //     switch (item.nodeType) {
    //       case 'text':
    //         html += item.value;
    //         break;
    //         case 'hyperlink':
    //           html += `<a href='${item.data.url}>${item.value}</a>`;
    //           break;
    //       default:
    //       console.log(item.nodeType);
    //     }
    //   }
    //   let content = node.content;
    //   let nextContent = next(content);
    //   let h = documentToHtmlString(content);
    //   let h1 = documentToHtmlString(nextContent);
    //   return html;
    //   // `<custom-paragraph>${next(node.content)}</custom-paragraph>`;
    // },
    [BLOCKS.EMBEDDED_ENTRY]: (node, next) => {
      debugger;
      return renderEmbeded(node);
    },
    // [BLOCKS.EMBEDDED_ASSET]: (node, next) => {
    //   debugger;
    // },
    [INLINES.HYPERLINK]: (node, next) => {
      // debugger;
      var a = document.createElement('a');
      let uri = new URL(node.data.uri);
      a.href = uri;
      if (uri.hostname !== location.hostname) a.target = '_blank';
      if (node.content.length === 1) {
        let item = node.content[0];
        a.appendChild(document.createTextNode(item.value));
        if (item.nodeType === 'text' && item.value === 'LEARN MORE') {
          a.classList.add('link-button');
          let span = document.createElement('span');
          span.appendChild(document.createTextNode('>'));
          a.appendChild(span);
        }
      } else {
        debugger;
      }
      // for (const item in node.content) {
      //   if (item.nodeType === 'text' && item.value === 'Learn More>')
      //     a.class = 'link-button';

      //   debugger;
      // a.appendChild(document.createTextNode(item.value));
      // return `<a href='${item.data.uri} class='link-button'>${item.value}</a>`;
      //   return a;
      // }

      // console.log(node.data.uri);
      if (a.classList.contains('link-button')) {
        // let's get crazy
        return `<div class='row'>
            <div class='col-sm-offset-6 col-sm-6 col-md-offset-8 col-md-4'>
                ${a.outerHTML}
            </div>
        </div>`;
      } else return a.outerHTML;
    },
    [INLINES.ENTRY_HYPERLINK]: (node, next) => {
      debugger;
    },
    [INLINES.ASSET_HYPERLINK]: (node, next) => {
      debugger;
    },
    [INLINES.EMBEDDED_ENTRY]: (node, next) => {
      debugger;
      return renderEmbeded(node);
    },
    [BLOCKS.EMBEDDED_ASSET]: (node, next) => {
      debugger;
      const { title, description, file } = node.data.target.fields;
      const mimeType = file.contentType;
      const mimeGroup = mimeType.split('/')[0];

      switch (mimeGroup) {
        case 'image':
          return renderImage(file);
        default:
          debugger;
          return (
            <span style={{ backgroundColor: 'red', color: 'white' }}>
              {' '}
              {mimeType} embedded asset{' '}
            </span>
          );
      }
    }
    // [BLOCKS.LIST_ITEM]: (node, next) => {
    //   return `<li>${documentToHtmlString(node.content[0])}</li>`;
    // },
    // [BLOCKS.EMBEDDED_ENTRY]: node => {
    //   debugger;
    //   const fields = node.data.target.fields;
    //   switch (node.data.target.sys.contentType.sys.id) {
    //     case 'blockquote':
    //       return (
    //         <div>
    //           <BlockQuote
    //             quoteText={fields.quoteText['en-US']}
    //             quoter={fields.quoter['en-US']}
    //           />
    //         </div>
    //       );
    //     default:
    //       return '';
    //   }
    // }
  }
};

export default {
  name: 'Page',
  components: {
    Header
  },
  props: {},
  data: () => ({
    page: Object
  }),
  computed: {
    loaded() {
      return Object.keys(this.page).length > 0;
    },
    pageContent() {
      return documentToHtmlString(this.page.content, options);
    }
  },
  watch: {
    $route() {
      this.init();
    }
  },
  created: function() {
    this.init();
  },
  methods: {
    async byId(id) {
      this.page = (await api.contentful.byId(id)).fields;
    },
    async bySlug(slug) {
      this.page = (await api.contentful.bySlug(slug)).fields;
    },
    init() {
      let id = this.$route.params.id;
      if (id) this.byId(this.$route.params.id);
      else {
        let slug = this.$route.params.subPage || this.$route.params.slug;
        this.bySlug(slug);
      }
    }
  }
};
</script>

<style lang='scss'>
@import '../assets/style/style';
</style>
