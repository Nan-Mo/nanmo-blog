<script setup lang="ts">
import { inject, Ref, computed } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()

const pageId = computed(() => route.path.replace('/nanmo-blog', ''))
</script>

<template>
  <div class="copyright">
    Copyright © 2019-present maomao
  </div>
</template>

<style scoped>
.copyright {
  margin-top: 24px;
  border-top: 1px solid var(--vp-c-gutter);
  padding: 32px 24px;
  background-color: var(--vp-c-bg);
}

.visitor {
  margin-right: 8px;
}

@media (max-width: 414px) {
  .visitor {
    display: none;
  }
}
</style>
