<template>
  <section v-if="!loaded">
    <span>loading...</span>
  </section>
  <section v-else>
    <div class="mainBlock">
      <section class="container padding-top-lg subPage">
        <h2>
          <p></p>
          <p>About MECP Certification</p>
          <p></p>
        </h2>
      </section>
      <section class="container padding-bottom-lg">
        <div class="padding-vertical-lg">
          <component
            v-for="(section, index) in sections"
            :key="index"
            v-bind:is="getComponent(section)"
            v-bind:section="section"
          />
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import Hero from '@/components/PageSections/Hero';
import OneColumn from '@/components/PageSections/OneColumn';
import TwoColumns from '@/components/PageSections/TwoColumns';
import AboutMECP from '@/components/PageSections/About';
import PromoList from '@/components/PageSections/PromoList';
import StudyGuides from '@/components/PageSections/StudyGuides';

import api from '@/api';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

export default {
  name: 'Page',
  components: {
    Hero,
    AboutMECP,
    PromoList,
    OneColumn,
    TwoColumns,
    StudyGuides
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
    getComponent(section) {
      return section.fields.layout.replace(' ', '');
    },
    async byId(id) {
      debugger;
      this.page = (await api.contentful.byId(id)).fields;
    },
    async bySlug(slug) {
      let response = await api.contentful.bySlug(slug);
      this.sections = (await api.contentful.bySlug(slug)).fields.sections;
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
