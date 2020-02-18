<template>
    <section name="promos">
      <div v-for="(promo, index) in content" :key="index">
        <section
          class="padding-top-lg"
          :style="promo.backgroundImage"
          style="background-size: cover;"
        >
          <div class="container">
            <div class="row">
              <div class="col-lg-offset-3 col-lg-9">
                <h2>
                  <p>{{ promo.title }}</p>
                </h2>
              </div>
            </div>
            <div class="row padding-vertical-lg">
              <div
                class="col-lg-offset-3 col-lg-9"
                v-html="promo.description"
              ></div>
            </div>
            <div v-if="promo.showLearnMoreLink" class="row">
              <div class="col-sm-offset-6 col-sm-6 col-md-offset-8 col-md-4">
                <router-link
                  :to="{
                    name: 'page',
                    params: {
                      slug: promo.relatedContent.slug,
                      id: promo.relatedContent.entryId
                    }
                  }"
                  class="link-button"
                >
                  Learn More
                  <span>&gt;</span>
                </router-link>
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
    rawHTML: Object,
    content: Array
  }),
  mounted: function() {
    this.rawHTML = this.html;
    // flatten
    let array = [];
    for (let i = 0; i < this.html.content.length; i++) {
      let o = {};
      let item = this.html.content[i];
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
    }
  }
};
</script>

<style lang="scss">
@import '../assets/style/sass/config';
@import '../assets/style/sass/base/headers';
</style>
