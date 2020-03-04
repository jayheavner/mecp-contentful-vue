<template>
  <section>
    <h3>{{ title }}</h3>
    <div v-html="text"></div>
  </section>
</template>

<script>
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { MARKS, BLOCKS, INLINES } from '@contentful/rich-text-types';

const options = {
  renderMark: {
    [MARKS.BOLD]: text => `<strong>${text}</strong>`
  },
  renderNode: {
    [INLINES.EMBEDDED_ENTRY]: (node, next) => {
      let obj = node.data.target.fields;
      switch (node.data.target.sys.contentType.sys.id) {
        case 'floatedImage':
          return `<img alt="" max-width="100%" src="${obj.image.fields.file.url}" style="float: ${obj.floatDirection}; margin: 10px 15px;">`;
        default:
          debugger;
      }
    },
    [INLINES.ASSET_HYPERLINK]: (node, next) => {
      return `<a href="${node.data.target.fields.file.url}">${next(node.content)}</a>`;
    }
  }
};

export default {
  name: 'Copy',
  props: {
    widget: Object
  },
  computed: {
    title() {
      return this.widget.fields.title;
    },
    text() {
      return documentToHtmlString(this.widget.fields.text, options);
    }
  }
};
</script>
