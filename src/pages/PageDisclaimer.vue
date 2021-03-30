<template>
    <div>
        <DynamicComponent PageName="Disclaimer"/>
    </div>
</template>

<script>
import DynamicComponent from './DynamicComponent'
import asyncDataStatus from '@/mixins/asyncDataStatus'

export default {
    components: {
        DynamicComponent
    },
    mixins: [asyncDataStatus],
    created(){
      this.asyncDataStatus_fetched()
  }
}
</script>