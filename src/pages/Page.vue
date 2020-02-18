<template>
  <section v-if="loaded">
    <Header />
    <div class="mainBlock">
      <section class="container padding-top-lg subPage">
        <h2>
          <p></p>
          <p>{{ page.pageName }}</p>
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
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { BLOCKS, MARKS, INLINES } from '@contentful/rich-text-types';

//types of blocks can be found here - https://github.com/contentful/rich-text/blob/master/packages/rich-text-types/src/blocks.ts
//types of inlines can be found here - https://github.com/contentful/rich-text/blob/master/packages/rich-text-types/src/inlines.ts
const options = {
  renderMark: {
    [MARKS.BOLD]: text => `<custom-bold>${text}<custom-bold>`
  },
  renderNode: {
    // [BLOCKS.PARAGRAPH]: (node, next) => {
    //   debugger;
    //   // `<custom-paragraph>${next(node.content)}</custom-paragraph>`;
    // },
    [INLINES.HYPERLINK]: (node, next) => {
      //debugger;
      return node;
    },
    [INLINES.ENTRY_HYPERLINK]: (node, next) => {
      debugger;
    },
    [INLINES.ASSET_HYPERLINK]: (node, next) => {
      debugger;
    },
    [INLINES.ASSET_HYPERLINK]: (node, next) => {
      debugger;
    },
    [BLOCKS.EMBEDDED_ASSET]: (node, next) => {
      debugger;
      const { title, description, file } = node.data.target.fields;
      debugger;
      const mimeType = file.contentType;
      const mimeGroup = mimeType.split('/')[0];

      switch (mimeGroup) {
        case 'image':
          return `<img src=${file.url} />`;
        case 'application':
          return (
            <a alt={description ? description : null} href={file.url}>
              {title ? title : file.details.fileName}
            </a>
          );
        default:
          return (
            <span style={{ backgroundColor: 'red', color: 'white' }}>
              {' '}
              {mimeType} embedded asset{' '}
            </span>
          );
      }
    },
    [BLOCKS.LIST_ITEM]: (node, next) => {
      debugger;
      return next(node.content);
    },
    [BLOCKS.EMBEDDED_ENTRY]: node => {
      debugger;
      const fields = node.data.target.fields;
      switch (node.data.target.sys.contentType.sys.id) {
        case 'blockquote':
          return (
            <div>
              <BlockQuote
                quoteText={fields.quoteText['en-US']}
                quoter={fields.quoter['en-US']}
              />
            </div>
          );
        default:
          return '';
      }
    }
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
      let h = documentToHtmlString(this.page.content, options);
      debugger;
      return h;
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
      this.page = (await api.contentful.one(id)).fields;
    },
    async bySlug(slug) {
      debugger;
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
@import '../assets/style/sass/config';
</style>
