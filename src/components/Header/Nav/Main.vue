<template>
  <ul class="main-nav hidden-sm-down">
        <li
          v-for="(item, index) in items"
          :key="item.slug"
          :index="index"
          :class="isCurrent(item.slug)"
        >
          <router-link
            :to="{
              path: `/${item.slug}`,
              params: { slug: item.slug, id: item.id }
            }"
          >
            {{ item.pageName }}
          </router-link>
        </li>
  </ul>
</template>

<script>

import { mapActions, mapState } from 'vuex';

export default {
  name: 'Main',
  computed: {
    ...mapState('mainNav', ['items']),
    slug() {
      return this.$route.params.slug;
    }
  },
  created() {
    this.buildNav(this.slug);
  },
  methods: {
    ...mapActions({
      fetchNav: 'mainNav/fetch'
    }),
    buildLink(item) {
      debugger;
      let slug = this.$route.params.slug;
      let subNav = this.$route.params.subNav;
      if (subNav === undefined || item.slug !== subNav)
        return `${this.$route.path}/${item.slug}`;

      return `/${slug}/${subNav}`;
    },
    buildNav(slug) {
      this.fetchNav();
    },
    isCurrent(item) {
      let route = this.$route;
      if (
        (item === route.params.slug && route.params.subNav === undefined) ||
        route.params.subNav === item
      )
        return 'current-page';
    }
  }
};
</script>
