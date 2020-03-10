<template>
  <section>
    <component
      v-bind:is="selectedComponent"
      v-bind:section="widgetZone"
    />
  </section>
</template>

<script>
import Hero from '@/components/PageSections/Hero';
import AboutMECP from '@/components/PageSections/About';
import StudyGuides from '@/components/PageSections/StudyGuides';

import api from '@/api';
import helpers from '@/helpers';

export default {
  name: 'Layout',
  components: {
    Hero,
    AboutMECP,
    StudyGuides,
  },
  props: {
    widget: Object
  },
  data: () => ({
    widgetZone: Array
  }),
  computed: {
    selectedComponent() {
      return helpers.components.getWidgetComponent(this.widget.fields.layout);
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
    init() {
      this.widgetZone = this.widget.fields.widgetZone;
    }
  }
};
</script>
