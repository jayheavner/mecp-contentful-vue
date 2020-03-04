<template>
  <section name="promos">
    <component v-bind:is="type" v-bind:widget="content" />
  </section>
</template>

<script>

import Promo from '../Widgets/Promo';

export default {
  name: 'GenericWidget',
  components: {
    Promo
  },
  props: {
    widget: Object
  },
  data: () => ({
  }),
  computed: {
    type() {
      return this.widget.fields.type;
    },
    fields() {
      return this.widget.fields;
    },
    content() {
      let o = {};
      switch(this.type) {
        case 'Promo':
          o.title = this.fields.title;
          o.backgroundImage = this.fields.image;
          o.description = this.fields.text;
          if (this.fields.callToAction)
            o.linkedPage = this.fields.callToAction[0];
          o.source = 'widget';
          break;
        default:
          debugger;
      }
      return o;

    }
  },
};
</script>
