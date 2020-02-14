<template>
  <section>
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
  </section>
</template>

<script>
import api from '@/api';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

export default {
  name: 'Page',
  components: {},
  props: {},
  data: () => ({
    page: Object
  }),
  computed: {
    pageContent() {
      debugger;
      return documentToHtmlString(this.page.content);
    }
  },
  mounted: function() {
    debugger;
    let id = this.$route.params.id;
    if (id) this.byId(this.$route.params.id);
    else this.bySlug(this.$route.params.slug);
  },
  methods: {
    async byId(id) {
      this.page = (await api.contentful.one(id)).fields;
    },
    async bySlug(slug) {
      this.page = (await api.contentful.bySlug(slug)).fields;
    }
  }
};
</script>

<style lang="scss">
@import '../assets/style/sass/config';
</style>
