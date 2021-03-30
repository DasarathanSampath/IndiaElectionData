<template>
  <component v-if="dynamicComponent" :is="dynamicComponent"></component>
</template>

<script>
// import asyncDataStatus from '@/mixins/asyncDataStatus'
export default {
  props: {
    PageName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      dynamicComponent: null
    }
  },
  // mixins: [asyncDataStatus],
  created () {
    import(`./${this.PageName}.vue`).then(module => {
      this.dynamicComponent = module.default
    })
    // this.asyncDataStatus_fetched()
  }
}
</script>