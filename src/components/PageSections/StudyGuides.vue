<template>
  <section>
    <component
      v-for="(guide, index) in guides"
      :key="index"
      v-bind:is="getComponent(guide)"
      v-bind:guide="guide"
    />
  </section>
</template>

<script>
import StudyGuide from '../Widgets/StudyGuide';
import helpers from '@/helpers';

export default {
  name: 'StudyGuides',
  components: {
    StudyGuide
  },
  props: {
    section: Array
  },
  data: () => ({
    guides: Array
  }),
  mounted: function() {
    debugger;
    this.guides = this.section;
  },
  methods: {
    navigate() {
      debugger;
    },
    getComponent(section) {
      let type = section.sys.contentType.sys.id;
      return helpers.components.getWidgetComponent(type);
    }
  }
};
</script>
