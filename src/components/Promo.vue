<template>
  <section name="promos">
    <div v-for="(promo, index) in html.content" :key="index">
      {{parse(promo)}}
      <section
        class="padding-top-lg"
        :style="backgroundStyles(backgroundImage)" style="background-size: cover;"
      >
        <div class="container">
          <div class="row">
            <div class="col-lg-offset-3 col-lg-9">
              <h2>
                <p>{{getTitle(promo)}}</p>
              </h2>
            </div>
          </div>
          <div class="row padding-vertical-lg">
            <div class="col-lg-offset-3 col-lg-9" v-html="description">
            </div>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

export default {
  name: 'Promo',
  props: {
    html: Object
  },
  data: () => ({
    title: String,
    backgroundImage: Object,
    description: String
  }),
  computed: {
    imageUrl() {
      debugger;
      return this.image.fields.file.url;
    },
    formattedDescription(o) {
      return documentToHtmlString(this.description);
    }
  },
  mounted: function() {
    debugger;
  },
  methods: {
    getTitle(item) {
      debugger;
      let flattened = flatten(item);
      return flattened.title;
      // if (item.nodeType === 'embedded-entry-block')
      //     return item.data.target.fields.title;
      // else if (item.nodeType === 'paragraph')
      //   for (const promo of item.content)
      //     if (promo.nodeType === 'embedded-entry-inline')
      //       return promo.data.target.fields.title;
    },
    backgroundStyles(image) {
      return {
        'background-image': `url(${image})`
      };
    },
    parse(o) {
      if (o.nodeType === 'embedded-entry-block') {
        let fields = o.data.target.fields;
        this.title = fields.title;
        this.backgroundImage = fields.backgroundImage.fields;
        this.description = documentToHtmlString(fields.description);
      } else if (o.nodeType === 'paragraph') {
        for (const item of o.content) {
          if (item.nodeType === 'embedded-entry-inline') {
            debugger;
            let fields = item.data.target.fields;
            this.title = fields.title;
            this.backgroundImage = fields.backgroundImage.fields;
            this.description = documentToHtmlString(fields.description);
          }
        }
      }
    }
  }
};

function flatten(o) {
  if (o.nodeType === 'embedded-entry-block')
      return o.data.target.fields;
  else if (o.nodeType === 'paragraph')
    for (const promo of o.content)
      if (promo.nodeType === 'embedded-entry-inline')
        return promo.data.target.fields;

}
</script>

<style lang="scss">
@import "../assets/style/sass/config";
@import "../assets/style/sass/base/headers";
</style>