<template>
  <div id="app">
    <TheNavbar/>
    <div class="contents">
      <router-view :key="$route.path" v-show="showPage" @ready="pageReady"/>
    </div>
    <AppSpinner v-show="!showPage"/>
    
    <Footer v-if="asyncDataStatus_ready"/>
  </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar'
import AppSpinner from '@/components/AppSpinner'
import NProgress from 'nprogress'
import Footer from '@/components/Footer'
import asyncDataStatus from '@/mixins/asyncDataStatus'

export default {
  name: 'app',
  components:{
    TheNavbar,
    AppSpinner,
    Footer
  },
  mixins: [asyncDataStatus],
  data() {
    return {
      showPage: false
    }
  },
  methods: {
    pageReady() {
      this.showPage = true
      NProgress.done()
    }
  },
  created() {
    NProgress.configure({
      speed: 200,
      showSpinner: false
    })
    NProgress.start()
    this.$router.beforeEach((to, from, next) => {
      this.showPage = false
      NProgress.start()
      next()
    })
    this.asyncDataStatus_fetched()
  },

  metaInfo() {
        return { 
            title: 'indiaelectiondata.in India Election Data',
            meta: [
                { name:'description', content:'Indian Parliamentary / Lok Sabha / General election results, Legislative / Vidhan Sabha / State assembly election results, state wise data, constituency wise data, party performance, voters and elector' },
                { name:'twitter:title', content:'Home' },
                { name:'twitter:description', content:'' },
                { name:'twitter:card', content:'summary' },
                { name:'twitter:url', content:'https://indiaelectiondata.in/' },
                { name:'twitter:site', content:'@indiaelectiondata' },
                { property:'og:type', content:'article' },
                { property:'og:title', content:'Home' },
                { property:'og:description', content:'' },
                { property:'og:url', content:'https://indiaelectiondata.in/' },
                { property:'og:site_name', content:'indiaelectiondata' },
                { property:'article:published_time', content:'15 Jan 2021' },
                { itemprop:'name', content:'Home' },
                { itemprop:'description', content:'' },
                { name:'theme-color', content:'#3eaf7c' },
                { name:'apple-mobile-web-app-capable', content:'yes' },
                { name:'apple-mobile-web-app-status-bar-style', content:'black' }
            ]
        }
  }
}
</script>

<style>
@import "assets/css/style.css";
</style>
