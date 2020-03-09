<template>
  <section v-if="!loaded">
    <span>loading...</span>
  </section>
  <section v-else>
    <Hero v-bind:hero="hero" />
    <About v-bind:about="about" />
      <section v-for="promo in promos"
      :key="promo.sys.id"
    >
      <Promo v-bind:widget="promo" />
    </section>

  </section>
</template>

<script>
import Hero from '@/components/PageSections/Hero';
import About from '@/components/PageSections/About';
import Promo from '@/components/Widgets/Promo';

// import TwoColumnLayout from '@/components/PageSections/TwoColumnLayout';
// import PromoListLayout from '@/components/PageSections/PromoListLayout';

import api from '@/api';
import helpers from '@/helpers';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

export default {
  name: 'Test',
  components: {
    Hero,
    About,
    Promo
  },
  props: {
    url: String,
    pageType: String
  },
  data: () => ({
    page: Object,
  }),
  computed: {
    loaded() {
      return Object.keys(this.page).length > 0;
    },
    hero() {
      return this.page.heroZone.fields;
    },
    about() {
      return {
        title: this.page.pageTitle,
        logo: this.page.mecpLogo.fields.file.url,
        text: documentToHtmlString(this.page.text)
      }
    },
    promos() {
      return this.page.promoZone;
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
