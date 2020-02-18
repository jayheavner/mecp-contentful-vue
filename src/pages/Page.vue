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
      return documentToHtmlString(this.page.content);
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
