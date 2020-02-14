<template>
  <section name="promos">
    <div v-for="(promo, index) in html.content" :key="index">
      <section
        class="padding-top-lg"
        :style="getBackgroundStyles(promo)"
        style="background-size: cover;"
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
            <div class="col-lg-offset-3 col-lg-9" v-html="getDescription(promo, index)"></div>
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
    mounted: function() {
      debugger;
  },
  methods: {
    getTitle(item) {
      let flattened = flatten(item);
      if (flattened === undefined || flattened.title === undefined)
        return '';

      console.log(flattened.title);
      return flattened.title;
    },
    getBackgroundStyles(item) {
      let flattened = flatten(item);
      if (flattened === undefined || flattened.backgroundImage === undefined)
        return '';

      let image = flattened.backgroundImage.fields;
      return {
        'background-image': `url(${image.file.url})`
      };
    },
    getDescription(item, index) {
      if (index === 1) {
        debugger;
      }
      let flattened = flatten(item);
      if (flattened === undefined || flattened.description === undefined)
        return '';
      let d = documentToHtmlString(flattened.description);
      console.log(JSON.stringify(flattened.description, null, 2));
      return documentToHtmlString(flattened.description);
    }
    // parse(o) {
    //   if (o.nodeType === 'embedded-entry-block') {
    //     let fields = o.data.target.fields;
    //     this.title = fields.title;
    //     this.backgroundImage = fields.backgroundImage.fields;
    //     this.description = documentToHtmlString(fields.description);
    //   } else if (o.nodeType === 'paragraph') {
    //     for (const item of o.content) {
    //       if (item.nodeType === 'embedded-entry-inline') {
    //         debugger;
    //         let fields = item.data.target.fields;
    //         this.title = fields.title;
    //         this.backgroundImage = fields.backgroundImage.fields;
    //         this.description = documentToHtmlString(fields.description);
    //       }
    //     }
    //   }
    // }
  }
};

function flatten(o) {
  if (o.nodeType === 'embedded-entry-block') return o.data.target.fields;
  else if (o.nodeType === 'paragraph')
    for (const promo of o.content)
      if (promo.nodeType === 'embedded-entry-inline')
        return promo.data.target.fields;
}

// const parseHtml = (entry, parent = '', level = 0, maxNesting = 3) => {
//   let content = {};
//   for (const field in entry.fields) {
//     let o = entry.fields[field];
//     let value = '';
//     debugger;
//     if (o.fields !== undefined && level <= maxNesting) {
//       let l = level + 1;
//       value = parseHtml(o, `${parent}:${field}`, l);
//     } else if (o.nodeType !== undefined && o.nodeType === 'document') {
//       value = documentToHtmlString(o);
//       let v = documentToHtmlString(o.content[0]);
//       let v1 = documentToHtmlString(o.content[1]);
//       debugger;
//     } else {
//       value = entry.fields[field];
//     }
//     if (level === 0)
//       // console.log(`   parent > ${parent}\n   level > ${level}`);
//       console.log({ [field]: value });
//     content[field] = value;
//   }
//   return content;
// };
</script>

<style lang="scss">
@import "../assets/style/sass/config";
@import "../assets/style/sass/base/headers";
</style>