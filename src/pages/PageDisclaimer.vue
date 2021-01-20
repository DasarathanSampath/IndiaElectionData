<template>
    <div>
        <br/><br/> 
        <h1> Disclaimer</h1>
        <p>
            The information contained in this website is for general information 
            purposes only. The information is provided by India Election Data, 
            a property of <a href="https://indiaelectiondata.in"><em>indiaelectiondata.in</em></a>. 
            While we endeavour to keep the 
            information up to date and correct, we make no representations or warranties of any kind, 
            express or implied, about the completeness, accuracy, reliability, suitability or 
            availability with respect to the website or the information, products, services, or 
            related graphics contained on the website for any purpose. Any reliance you place on 
            such information is therefore strictly at your own risk.
        </p>

        <p>
            In no event will we be liable for any loss or damage including without limitation, 
            indirect or consequential loss or damage, or any loss or damage whatsoever arising 
            from loss of data or profits arising out of, or in connection with, the use of this 
            website. Through this website you are able to link to other websites which are not 
            under the control of indiaelectiondata.in. We have no control over the nature, 
            content and availability of those sites. The inclusion of any links does not 
            necessarily imply a recommendation or endorse the views expressed within them. 
            Every effort is made to keep the website up and running smoothly. However, 
            indiaelectiondata.in takes no responsibility for, and will not be liable for, 
            the website being temporarily unavailable due to technical issues beyond our control.
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