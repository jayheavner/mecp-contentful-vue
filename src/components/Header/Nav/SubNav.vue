<template>
  <div class="row subnav">
    <div class="scrollable">
      <ul>
        <li :class="isCurrent($route.params.slug)">
          <router-link
            :to="{ name: 'page', params: { slug: $route.params.slug } }"
          >
            Overview
          </router-link>
        </li>
        <li
          v-for="(item, index) in items"
          :key="item.slug"
          :index="index"
          :class="isCurrent(item.slug)"
        >
          <router-link
            :to="{
              path: buildLink(item),
              params: { slug: item.slug, id: item.id }
            }"
          >
            {{ item.pageName }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'SubNav',
  computed: {
    ...mapState('subNav', ['items']),
    slug() {
      return this.$route.params.slug;
    }
  },
  created() {
    this.buildSubNav(this.slug);
  },
  methods: {
    ...mapActions({
      fetchSubNav: 'subNav/fetch'
    }),
    buildLink(item) {
      let slug = this.$route.params.slug;
      let subPage = this.$route.params.subPage;
      if (subPage === undefined || item.slug !== subPage)
        return `${this.$route.path}/${item.slug}`;

      return `/${slug}/${subPage}`;
    },
    buildSubNav(slug) {
      this.fetchSubNav(slug);
      // this.fetchSubNav(slug).then(response => {
      //   debugger;
      // })
    },
    isCurrent(item) {
      let route = this.$route;
      if (
        (item === route.params.slug && route.params.subPage === undefined) ||
        route.params.subPage === item
      )
        return 'current-page';
    }
  }
};
</script>
