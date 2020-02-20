<template>
  <section class="bg-hero full-height home container-fluid">
    <img title="MECP" :src="content.image.file.url" alt="MECP" />
    <div id="mission-statement" class="content sticky-item">
      <h1 class="title">
        <p v-html="content.title"></p>
      </h1>
      <br /><br />
      <section v-if="nav.length > 0">
        <div class="buttons container" v-if="nav.length > 0">
          <div
            class="col-md-6 col-lg-4"
            v-for="(item, index) in nav"
            :key="item.slug"
            :index="index"
          >
            <router-link
              class="btn btn-primary btn-lg outline"
              :to="{
                path: `/${item.slug}`,
                params: { slug: item.slug, id: item.id }
              }"
            >
              {{ item.pageName }}
            </router-link>
          </div>
        </div>
      </section>
    </div>
    <a
      class="scroll-down-button icon-down-arrow"
      href="/index.html#aboutMECP"
    ></a>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Hero',
  props: {
    content: Object
  },
  data: () => ({
    nav: Array
  }),
  computed: {
    ...mapState('nav', ['navItems'])
  },
  created() {
    this.buildNav();
  },
  methods: {
    ...mapActions({
      fetchNav: 'nav/fetch'
    }),
    buildLink(item) {
      debugger;
      let slug = this.$route.params.slug;
      let subNav = this.$route.params.subNav;
      if (subNav === undefined || item.slug !== subNav)
        return `${this.$route.path}/${item.slug}`;

      return `/${slug}/${subNav}`;
    },
    async buildNav() {
      debugger;
      let nav = Array;
      let n = this.navItems;
      if (Array.isArray(n) && n.length) nav = n;
      else nav = await this.fetchNav();
      // let nav =
      //   n === undefined || n.length === 0 || n[0] === undefined
      //     ? await this.fetchNav()
      //     : n;
      debugger;
      this.nav = nav.slice(0, 3);
    }
  }
};
</script>

<style lang="scss">
@import '../assets/style/hero/style.scss';
</style>
