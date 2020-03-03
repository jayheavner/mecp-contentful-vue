<template>
  <div class="row padding-vertical-lg">
    <div class="col-xs-12 col-sm-6 col-md-3">
      <div class="logo-wrapper padding-bottom-sm">
        <img :src="imageUrl" alt />
      </div>
    </div>
    <div class="col-xs-12 col-sm-6 col-md-9" v-html="formattedText"></div>
  </div>
</template>

<script>
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

export default {
  name: 'TwoColumns',
  props: {
    section: Object,
    about: Array,
    image: Object,
    text: Object
  },
  data: () => ({
    content: Object
  }),
  watch: {
    $route() {
      this.init();
    }
  },
  created: function() {
    this.init();
  },
  computed: {
    imageUrl() {
      debugger;
      return this.about.image.fields.file.url;
    },
    formattedText() {
      debugger;
      return documentToHtmlString(this.about.text);
    }
  },
  methods: {
    init() {
      debugger;
      this.content = this.section.fields.widgets;
    }
  }
};
</script>
