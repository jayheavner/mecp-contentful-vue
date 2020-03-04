<template>
    <div>
      <component v-for="(widget, index) in content" :key="index" v-bind:is="getComponent(widget)" v-bind:widget="widget" />
    </div>
</template>

<script>
import CallToAction from '../Widgets/CallToAction';
import Copy from '../Widgets/Copy';
import EmbeddedVideo from '../Widgets/EmbeddedVideo';
import FormStack from '../Widgets/FormStack';

import helpers from '@/helpers';

export default {
  name: 'OneColumn',
  components: {
    CallToAction,
    Copy,
    EmbeddedVideo,
    FormStack
  },
  props: {
    section: Object
  },
  data: () => ({
    content: Object
  }),
  watch: {
    $route() {
      this.init();
    }
  },
  created: function() {
    this.init();
  },
  methods: {
    init() {
      this.content = this.section.fields.widgets;
    },
    getComponent(widget) {
      let type = widget.sys.contentType.sys.id;
      return helpers.components.getWidgetComponent(type);
    }
  }
};
</script>
