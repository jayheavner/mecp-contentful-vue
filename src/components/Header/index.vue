<template>
<header class="page-section-header container-fluid sticky">
    <Logo />
    <Nav />
</header>
</template>

<script>
import Logo from './Logo';
import Nav from './Nav';

export default {
  name: "Heaader",
  components: {
    Logo,
    Nav,
  },
  props: {},
  computed: {},

  mounted: function() {}
};
</script>

<style lang="scss">
@import "../assets/style/sass/config";
@import "../assets/style/sass/base/headers";
</style>