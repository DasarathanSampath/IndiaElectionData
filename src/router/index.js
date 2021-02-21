import Vue from 'vue'
import Router from 'vue-router'
import PageHome from '@/pages/PageHome'
import PageLegislative from '@/pages/PageLegislative.vue'
import About from '@/pages/PageAbout.vue'
import Contact from '@/pages/PageContact.vue'
import Disclaimer from '@/pages/PageDisclaimer.vue'
import Privacy from '@/pages/PagePrivacy.vue'
import NotFound from '@/pages/PageNotFound.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: PageHome
    },
    {
      path: '/data-conversion',
      name: 'DataConversion',
      component: () => import(/* webpackChunkName: "DataConversion" */ '@/components/DataConversion.vue')
    },
    {
      path: '/data-conversion-legislative',
      name: 'DataConversionLegislative',
      component: () => import(/* webpackChunkName: "DataConversionLegislative" */ '@/components/DataConversionLegislative.vue')
    },
    {
      path: '/legislative-election',
      name: 'PageLegislative',
      component: PageLegislative
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/privacy',
      name: 'Privacy',
      component: Privacy
    },
    {
      path: '/disclaimer',
      name: 'Disclaimer',
      component: Disclaimer
    },
    {
      path:'*',
      name: 'NotFound',
      component: NotFound
    }
  ],
  mode: 'history'
})

export default router
