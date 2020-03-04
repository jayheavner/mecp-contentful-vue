<template>
  <section v-if="loaded">
    <Header />
    <div class="mainBlock">
      <section class="container padding-top-lg subPage">
        <h2>
          <p></p>
          <p>{{ page.title === undefined ? page.pageName : page.title }}</p>
          <p></p>
        </h2>
      </section>

      <section class="container padding-bottom-lg">
        <div class="padding-vertical-lg" v-html="pageContent"></div>
      </section>
    </div>
  </section>
</template>

<script>
import Header from '@/components/Header';
import api from '@/api';
import helpers from '@/helpers';

import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';

function renderEmbeded(node) {
  if (node.data.target.sys.contentType === undefined) return node;

  let linkedObject = node.data.target.sys.contentType.sys;
  switch (linkedObject.id) {
    case 'calloutLinkedContent':
      debugger;
      return renderLinkButton(node.data.target.fields);
    case 'embeddedVideo':
      return renderEmbeddedVideo(node.data.target.fields);
    case 'formStack':
      return renderFormStack(node.data.target.fields);
    case 'studyGuide':
      return renderStudyGuide(node.data.target.fields);
    case 'iframe':
      //return renderIFrame(node.data.target.fields);
      debugger;
      break;
    case 'simplePage':
      return `<a href="${helpers.url.urlBuilder(node.data.target.fields)}">${
        node.data.target.fields.pageName
      }</a>`;
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
  return `<img alt="" max-width="100%" src="${image.url}" style="float: right; margin: 10px 15px;">`;
}

function renderEmbeddedVideo(fields) {
  let height = fields.height ? `${fields.height}px` : '100%';
  let width = fields.width ? `${fields.width}px` : '100%';
  let fullscreen = fields.allowFullScreen
    ? `allowfullscreen="" mozallowfullscreen="" webkitallowfullscreen=""`
    : '';
  return `<iframe frameborder="0" height="${height}" src="${fields.link}" title="${fields.name}" width="${width}" ${fullscreen}></iframe>`;
}

function renderFormStack(fields) {
  let height = fields.height ? `${fields.height}px` : '100%';
  let width = fields.width ? `${fields.width}px` : '100%';
  return `<iframe frameborder="0" height="${height}" src="https://cea.formstack.com/forms/${fields.slug}" title="${fields.name}" width="${width}"></iframe>`;
}

function renderStudyGuide(fields) {
  let html = `
    <div class="col-sm-6 col-lg-3 padding-bottom-sm text-xs-center text-sm-left">
      <div class="image-wrapper">
        <img class="img-fluid" src="${fields.coverImage.fields.file.url}" alt="${fields.title}">
      </div>
      <div class="guide-title">${fields.title}</div>
      <div class="price"><a href="https://members.cta.tech/ctaMerchandiseDetail/?id=${fields.link}">Member Price: $${fields.memberPrice}.00</a></div>
      <div class="price"><a href="https://members.cta.tech/ctaMerchandiseDetail/?id=${fields.link}">Nonmember Price: ${fields.nonmemberPrice}.00</a></div>
    </div>`;
  return html;
}
//types of blocks can be found here - https://github.com/contentful/rich-text/blob/master/packages/rich-text-types/src/blocks.ts
//types of inlines can be found here - https://github.com/contentful/rich-text/blob/master/packages/rich-text-types/src/inlines.ts
const options = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, next) => {
      if (node.content.length === 1 && node.content[0].nodeType === 'text' && node.content[0].value.match(/^ *$/) !== null)
        return '<p>&nbsp</p>';
      else {
        return `<p>${next(node.content)}</p>`;
        }
    },
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
    // [BLOCKS.UL_LIST]: (node, next) => {
    //   debugger;
    //   return next(node.content);
    // },
    [BLOCKS.EMBEDDED_ENTRY]: (node, next) => {
      // debugger;
      return renderEmbeded(node);
    },
    [BLOCKS.EMBEDDED_ASSET]: (node, next) => {
      debugger;
    },
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
      let pre = ''; let post = '';
      let val = node.content[0].value;
      for (let mark of node.content[0].marks) {
        switch (mark.type) {
          case 'bold':
            pre += '<strong>';
            post += '</strong>';
            val = `<strong>${val}</strong>`;
            break;
          case 'italic':
            pre += '<i>';
            post += '</i>';
            val = `<i>${val}</i>`;
            break;
          case 'underline':
            pre += '<u>';
            post += '</u>';
            val = `<u>${val}</u>`;            
            break;
            
          default:
            debugger;
        }
      }
      let text = `${pre}${val}${post}`;
      return `<a href="${helpers.url.urlBuilder(node.data.target.fields)}">${val}</a>`;
    },
    [INLINES.ASSET_HYPERLINK]: (node, next) => {
      debugger;
      const { title, description, file } = node.data.target.fields;
      const mimeType = file.contentType;

      switch (mimeType) {
        case 'application/pdf':
          var a = document.createElement('a');
          // eslint-disable-next-line no-case-declarations
          a.href = node.data.target.fields.file.url;
          a.target = '_blank';
          // eslint-disable-next-line no-case-declarations
          let item = node.content[0];
          a.appendChild(document.createTextNode(item.value));
          if (item.nodeType === 'text' && item.value === 'LEARN MORE') {
            a.classList.add('link-button');
            let span = document.createElement('span');
            span.appendChild(document.createTextNode('>'));
            a.appendChild(span);
          }
          return `<div class='row'>
              <div class='col-sm-offset-6 col-sm-6 col-md-offset-8 col-md-4'>
                ${a.outerHTML}
              </div>
            </div>`;
        default:
          debugger;
      }
    },
    [INLINES.EMBEDDED_ENTRY]: (node, next) => {
      // debugger;
      return renderEmbeded(node);
    },
    [BLOCKS.EMBEDDED_ASSET]: (node, next) => {
      // debugger;
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

<style lang="scss">
@import '../assets/style/style';
</style>
