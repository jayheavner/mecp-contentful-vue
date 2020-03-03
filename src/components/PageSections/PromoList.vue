<template>
  <section name="promos">
    <div
      class="col-md-6 col-lg-4"
      v-for="(promo, index) in promos"
      :key="index"
      :index="index"
    >
      <component v-bind:is="getComponent(promo)" v-bind:widget="promo" />
    </div>
  </section>
</template>

<script>
import GenericWidget from '../Widgets/GenericWidget';
import Promo from '../Widgets/Promo';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import helpers from '@/helpers';

export default {
  name: 'PromoList',
  components: {
    GenericWidget,
    Promo
  },
  props: {
    section: Object
  },
  data: () => ({
    promos: Array,
    rawHTML: Object,
    content: Array
  }),
  mounted: function() {
    this.promos = this.section.fields.widgets;
    // flatten
    let array = [];
    for (let i = 0; i < this.promos; i++) {
      debugger;
      let o = {};
      let item = this.promos.content[i];
      if (item === undefined || item.data.target === undefined) continue;
      let fields = item.data.target.fields;
      for (const field in fields) {
        o[field] = fields[field];
      }
      array[i] = o;
    }

    // constructor
    let transformed = [];
    let content = [];
    for (let i = 0; i < array.length; i++) {
      let o = {};
      o.title = array[i].title;
      o.showBackgroundImage = array[i].backgroundImage !== undefined;
      o.backgroundImage = o.showBackgroundImage
        ? {
            'background-image': `url(${array[i].backgroundImage.fields.file.url})`
          }
        : undefined;
      o.showLearnMoreLink = array[i].linkedPage !== undefined;
      let relatedContent = {
        slug: o.showLearnMoreLink ? array[i].linkedPage.fields.slug : undefined,
        entryId: o.showLearnMoreLink ? array[i].linkedPage.sys.id : undefined
      };
      o.relatedContent = {
        slug: o.showLearnMoreLink ? array[i].linkedPage.fields.slug : undefined,
        entryId: o.showLearnMoreLink ? array[i].linkedPage.sys.id : undefined
      };
      o.description = documentToHtmlString(array[i].description);
      content.push(o);
    }
    this.content = content;
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
