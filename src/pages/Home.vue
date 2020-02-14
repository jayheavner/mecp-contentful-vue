<template>
  <section v-if="!loaded">
    <span>loading...</span>
  </section>
  <section v-else>
    <Hero v-bind:content="hero" />
    <About v-bind:title="content.aboutTitle" v-bind:image="content.aboutImage" v-bind:description="content.aboutDescription" />
    <Promo v-bind:html="content.promos" />
  </section>
</template>

<script>
import Hero from '@/components/Hero';
import About from '@/components/About';
import Promo from '@/components/Promo';

import api from '@/api';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

export default {
  name: 'Home',
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
    content: Object,
    hero: Object,
    linkedItems: Object
  }),
computed: {
    loaded() {
      return Object.keys(this.content).length > 0;
    }
  },
  mounted: function() {
    // let d = api.contentful.one('5lZI4V0fbbQ2JkS5zViFLD');
    // api.contentful.byType('homePage');
    this.getContentByTitle('homePage', 'Home');
  },
  methods: {
    async getContentByTitle(pageType, title) {
      let content = await api.contentful.byTitle(pageType, title);
      console.log(content);
      this.content = content.fields;
      this.hero = { 
        title: documentToHtmlString(this.content.pageTitle),
        image: this.content.heroImage.fields
      }
    }
  }
};
</script>

<style lang="scss">
@import '../assets/style/sass/config';
</style>