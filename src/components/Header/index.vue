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
  name: 'Header',
  components: {
    Logo,
    Nav
  },
  props: {},
  data: () => ({ }),

  computed: {},

  mounted: function() {
    debugger;
  }
};
</script>
