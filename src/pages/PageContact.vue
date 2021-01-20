<template>
    <div>
        <br/><br/> 
        <h1> Contact </h1>
        <p> For errors and improvements, please email us:</p> 
        <a href="mailto: thedatatalks@gmail.com"><em>thedatatalks@gmail.com</em></a>

        <br/><br/> 
        <br/><br/> 
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