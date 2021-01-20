<template>
    <header class="header" id="header">
        <router-link style="box-shadow: none;"
                class = "logo"
                :to="{name: 'Home'}"
            >
            IED
        </router-link>
        <router-link
                class = "navbar-item"
                :to="{name: 'Home'}"
            >
            Parliamentary
        </router-link>
        <router-link
                class = "navbar-item"
                :to="{name: 'PageLegislative'}"
            >
            Legislative
        </router-link>
            
    </header>
</template>

<script>
export default {
    
}
</script>

<style scoped>

.router-link-exact-active {  
  box-shadow: inset 0 -3px 0 white, inset 0 -2px 0 white;
}

</style>>
