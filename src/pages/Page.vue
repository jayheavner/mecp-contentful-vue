<template>
  <section v-if="!loaded">
    <span>loading...</span>
  </section>
  <section v-else>
    <Header />
    <div class="mainBlock">
      <section class="container padding-top-lg subPage">
        <h2>
          <p></p>
          <p>{{title}}</p>
          <p></p>
        </h2>
      </section>
      <section class="container padding-bottom-lg">
        <div class="padding-vertical-lg">
          <component
            v-for="(widget, index) in widgetZone"
            :key="index"
            v-bind:is="getComponent(widget)"
            v-bind:widget="widget"
          />
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import Header from '@/components/Header';
import Layout from '@/components/Layout';
import CallToAction from '@/components/Widgets/CallToAction';
import Copy from '@/components/Widgets/Copy';
import EmbeddedVideo from '@/components/Widgets/EmbeddedVideo';
import FormStack from '@/components/Widgets/FormStack';
import FloatedImage from '@/components/Widgets/FloatedImage';
import Testimonial from '@/components/Widgets/Testimonial';

import api from '@/api';
import helpers from '@/helpers';

export default {
  name: 'Page',
  components: {
    Header,
    Layout,
    CallToAction,
    Copy,
    EmbeddedVideo,
    FormStack,
    FloatedImage,
    Testimonial
  },
  props: {
    url: String,
    pageType: String
  },
  data: () => ({
    widgetZone: Array,
    title: String
    // sections: Array,
    // about: Object,
    // hero: Object,
    // pageTitle: String,
    // promos: Object
  }),
  computed: {
    loaded() {
      return Object.keys(this.widgetZone).length > 0;
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
    getComponent(zone) {
      // zones can have layout sections (that contain widgets) or plain widgets
      let type = zone.sys.contentType.sys.id;
      let widget = helpers.components.getWidgetComponent(type);
      return widget;
    },
    async byId(id) {
      this.page = (await api.contentful.byId(id)).fields;
    },
    async bySlug(slug) {
      let response = await api.contentful.bySlug(slug);
      if (response.fields.widgetZone === undefined)
        return;
      this.widgetZone = response.fields.widgetZone;
      this.title = response.fields.title;
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
