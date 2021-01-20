<template>
    <div>
        <br/><br/> 
        <h1> About </h1>
        <p>
        I am Dasa, mechanical engineer by profession. <br/><br/>

        I like searching for data which made me learn Javascript. <br/><br/>

        This website is created for Indian historical election results. It presents 
        the data in an easily readable format with collective information in a single place. <br/><br/>
        
        This website is built on VueJs. Thanks to VueJs.<br/><br/>

        This website provides descriptive statistical data of indian election results.<br/><br/>
        
        The data available in our website is solely based on various open sources 
        available in internet and results published by election commission of India 
        in internet, newspapers & news channels.<br/><br/>

        We did our best to meet the accuracy of data and please write to us for any 
        kind of mistakes.<br/><br/>
        </p>
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