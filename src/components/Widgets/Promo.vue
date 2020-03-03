<template>
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
        <div class="col-lg-offset-3 col-lg-9" v-html="promo.description"></div>
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
</template>

<script>
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

export default {
  name: 'PromoWidget',
  props: {
    widget: Object
  },
  data: () => ({
    promo: Object
    // rawHTML: Object,
    // content: Array
  }),
  mounted: function() {
    debugger;
    this.promo = this.widget.fields;
    this.promo.showBackgroundImage = this.promo.backgroundImage !== undefined;
    this.promo.backgroundImage = this.promo.showBackgroundImage
      ? {
          'background-image': `url(${this.promo.backgroundImage.fields.file.url})`
        }
      : undefined;
    this.promo.showLearnMoreLink = this.promo.linkedPage !== undefined;
    let relatedContent = {
      slug: this.promo.showLearnMoreLink
        ? this.promo.linkedPage.fields.slug
        : undefined,
      entryId: this.promo.showLearnMoreLink
        ? this.promo.linkedPage.sys.id
        : undefined
    };
    this.promo.relatedContent = {
      slug: this.promo.showLearnMoreLink
        ? this.promo.linkedPage.fields.slug
        : undefined,
      entryId: this.promo.showLearnMoreLink
        ? this.promo.linkedPage.sys.id
        : undefined
    };
    this.promo.description = documentToHtmlString(this.promo.description);

    // // flatten
    // let array = [];
    // for (let i = 0; i < this.promos; i++) {
    // debugger;
    //   let o = {};
    //   let item = this.promos.content[i];
    //   if (item === undefined || item.data.target === undefined) continue;
    //   let fields = item.data.target.fields;
    //   for (const field in fields) {
    //     o[field] = fields[field];
    //   }
    //   array[i] = o;
    // }

    // // constructor
    // let transformed = [];
    // let content = [];
    // for (let i = 0; i < array.length; i++) {
    //   let o = {};
    //   o.title = array[i].title;
    //   o.showBackgroundImage = array[i].backgroundImage !== undefined;
    //   o.backgroundImage = o.showBackgroundImage
    //     ? {
    //         'background-image': `url(${array[i].backgroundImage.fields.file.url})`
    //       }
    //     : undefined;
    //   o.showLearnMoreLink = array[i].linkedPage !== undefined;
    //   let relatedContent = {
    //     slug: o.showLearnMoreLink ? array[i].linkedPage.fields.slug : undefined,
    //     entryId: o.showLearnMoreLink ? array[i].linkedPage.sys.id : undefined
    //   };
    //   o.relatedContent = {
    //     slug: o.showLearnMoreLink ? array[i].linkedPage.fields.slug : undefined,
    //     entryId: o.showLearnMoreLink ? array[i].linkedPage.sys.id : undefined
    //   };
    //   o.description = documentToHtmlString(array[i].description);
    //   content.push(o);
    // }
    // this.content = content;
  }
  // methods: {
  //   navigate() {
  //     debugger;
  //   },
  // }
};
</script>
