<template>
  <section v-if="!loaded">
    <span>loading...</span>
  </section>
  <section v-else>
    <div
      v-for="(section, index) in sections"
      :key="index"
      :index="index"
    >
      <component v-bind:is="getComponent(section)" v-bind:section="section" />
    </div>
  </section>
</template>

<script>
import Hero from '@/components/PageSections/Hero';
import TwoColumns from '@/components/PageSections/TwoColumns';
import AboutMECP from '@/components/PageSections/About';
import PromoList from '@/components/PageSections/PromoList';

import api from '@/api';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

export default {
  name: 'Test',
  components: {
    Hero,
    AboutMECP,
    PromoList,
    TwoColumns
  },
  props: {
    url: String,
    pageType: String
  },
  data: () => ({
    sections: Array,
    about: Object,
    hero: Object,
    pageTitle: String,
    promos: Object
  }),
  computed: {
    loaded() {
      return Object.keys(this.sections).length > 0;
    },
  },
  mounted: function() {
    // let d = api.contentful.one('5lZI4V0fbbQ2JkS5zViFLD');
    // api.contentful.byType('homePage');
    this.getContent();
  },
  methods: {
    getComponent(section) {
      // debugger;
      return section.fields.layout.replace(' ', '');
    },
    async getContent() {
      // The base type is page
      // Pages have Page Sections
      // Page Sections have Widgets
      let content = await api.contentful.bySlug('home');
      this.sections = content.fields.sections;
      // for (let section of content.fields.sections) {
      //   debugger;
      //   switch (section.fields.type) {
      //     case 'Page Title':
      //       this.pageTitle = section.fields.title;
      //       break;
      //     case 'Generic Page Section':
      //       this.about = section.fields.widgets;
      //       break;
      //     case 'Promo':
      //       this.promos = section.fields.widgets;
      //       break;
      //     case 'Home Page Hero':
      //       this.hero = section.fields.widgets[0].fields;
      //       break;
      //     default:
      //       debugger;
      //       break;
      //   }
      // }
    }
  }
};
</script>
