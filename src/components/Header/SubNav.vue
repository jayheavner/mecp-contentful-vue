<template>
  <div class="row subnav" v-if="subNav.length > 0">
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
          v-for="(item, index) in subNav"
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
  data: () => ({
    subNav: Array
  }),
  computed: {
    ...mapState('nav', ['navItems']),
    slug() {
      return this.$route.params.slug;
    }
  },
  watch: {
    $route() {
    this.buildSubNav();
    }
  },
  created() {
    this.buildSubNav();
  },
  methods: {
    ...mapActions({
      fetchNav: 'nav/fetch'
    }),
    buildLink(item) {
      let parents = getParent(item.parent.fields);
      return `/${parents.join('/')}/${item.slug}`;
    },
    async buildSubNav() {
      let n = this.navItems;
      let nav =
        n === undefined || n.length === 0 || n[0] === undefined
          ? await this.fetchNav()
          : n;
      let subNav = nav.find(n => n.slug === this.$route.params.slug);
      this.subNav = subNav.children;
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

const getParent = child => {
  let parent = [];
  let slug = child.slug;
  if (slug !== undefined) {
    parent.push(slug);
    parent.concat(getParent(child.parent.fields));
  }
  return parent;
}
</script>