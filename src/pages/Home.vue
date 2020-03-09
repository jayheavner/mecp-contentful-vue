<template>
  <section v-if="!loaded">
    <span>loading...</span>
  </section>
  <section v-else>
    <Hero v-bind:hero="hero" />
    <section id="aboutMECP" class="padding-top-lg">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-lg-offset-3 col-lg-9">
            <h2>
              <p>{{ page.pageTitle }}</p>
            </h2>
          </div>
        </div>
        <div class="row padding-vertical-lg">
          <div class="col-xs-12 col-sm-6 col-md-3">
            <div class="logo-wrapper padding-bottom-sm">
              <img :src="logo" />
            </div>
          </div>
          <div class="col-xs-12 col-sm-6 col-md-9" v-html="formattedText"></div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import Hero from '@/components/PageSections/Hero';
// import TwoColumnLayout from '@/components/PageSections/TwoColumnLayout';
// import PromoListLayout from '@/components/PageSections/PromoListLayout';

import api from '@/api';
import helpers from '@/helpers';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

export default {
  name: 'Test',
  components: {
    Hero
    // TwoColumnLayout,
    // PromoListLayout
  },
  props: {
    url: String,
    pageType: String
  },
  data: () => ({
    page: Object,
    promos: Object
  }),
  computed: {
    loaded() {
      return Object.keys(this.page).length > 0;
    },
    hero() {
      return this.page.heroZone.fields;
    },
    logo() {
      return this.page.mecpLogo.fields.file.url;
    },
    formattedText() {
      return documentToHtmlString(this.page.text);
    }
  },
  mounted: function() {
    this.getContent();
  },
  methods: {
    getComponent(section) {
      return helpers.components.getComponent(section.sys.contentType.sys.id);
    },
    async getContent() {
      let content = await api.contentful.getHomePageContent();
      this.page = content.items[0].fields;
    }
  }
};
</script>
