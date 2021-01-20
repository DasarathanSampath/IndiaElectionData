  
<template>
    <div class="col-full"
      :class="$style.centered"
    >
      <h1 :class="$style.headingLarge">Not Found</h1>
      <p class="text-large"
        :class="$style.textLarge"
      >
        Ooops, we couldn't find what you are looking for. Why don't you
        <router-link :to="{name: 'Home'}">
          go home instead?
        </router-link>
      </p>
    </div>
</template>

<script>
import asyncDataStatus from '@/mixins/asyncDataStatus'
export default {
    mixins: [asyncDataStatus],
    created(){
      this.asyncDataStatus_fetched()
  }
}
</script>

<style scoped>
  .headingLarge {
    font-size: 100px;
  }
  .textLarge {
    font-size: 50px;
    font-weight: 100;
  }
  .centered {
    text-align: center;
  }
</style>