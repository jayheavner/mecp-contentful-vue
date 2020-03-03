<template>
  <section id="aboutMECP" class="padding-top-lg">
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-lg-offset-3 col-lg-9">
          <h2>
            <p>{{ pageTitle }}</p>
          </h2>
        </div>
      </div>
      <div class="row padding-vertical-lg">
        <div class="col-xs-12 col-sm-6 col-md-3">
          <div class="logo-wrapper padding-bottom-sm">
            <img :src="imageUrl" alt />
          </div>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-9" v-html="formattedText"></div>
      </div>
    </div>
  </section>
</template>

<script>
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

export default {
  name: 'About',
  props: {
    section: Object,
  },
  data: () => ({
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
    pageTitle() {
      return this.content.title;
    },
    imageUrl() {
      return this.content.image.fields.file.url;
    },
    formattedText() {
      return documentToHtmlString(this.content.text);
    }
  },
  methods: {
    init() {
      this.content = this.section.fields.widgets[0].fields;
    }
  }
};
</script>
