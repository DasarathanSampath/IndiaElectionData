  
<template>
    <div class="centered">
      <DynamicComponent PageName="NotFound"/>
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

<style scoped>
  .headingLarge {
    font-size: 50px;
  }
  .textLarge {
    font-size: 25px;
    font-weight: 100;
  }
  .centered {
    text-align: center;
  }
</style>