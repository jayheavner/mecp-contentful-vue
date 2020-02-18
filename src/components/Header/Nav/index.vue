<template>
  <nav class="col-xs-6 col-sm-8 col-lg-9">
    <Utility />
    <Main />
    <SubNav />
  </nav>
</template>

<script>

import Utility from './Utility';
import Main from './Main';
import SubNav from './SubNav'

export default {
  name: 'Nav',
  components: {
      Utility,
      Main,
      SubNav
  },
  props: {},
  computed: {},

  mounted: function() {
    debugger;
  }
};
</script>
