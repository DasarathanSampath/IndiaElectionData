import Vue from 'vue'
import Router from 'vue-router'
import PageHome from '@/pages/PageHome'

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
      component: () => import(/* webpackChunkName: "PageLegislative" */ '@/pages/PageLegislative.vue')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import(/* webpackChunkName: "About" */ '@/pages/PageAbout.vue')
    },
    {
      path: '/contact',
      name: 'Contact',
      component: () => import(/* webpackChunkName: "About" */ '@/pages/PageContact.vue')
    },
    {
      path: '/privacy',
      name: 'Privacy',
      component: () => import(/* webpackChunkName: "About" */ '@/pages/PagePrivacy.vue')
    },
    {
      path: '/disclaimer',
      name: 'Disclaimer',
      component: () => import(/* webpackChunkName: "About" */ '@/pages/PageDisclaimer.vue')
    },
    {
      path:'*',
      name: 'NotFound',
      component: () => import(/* webpackChunkName: "notFound" */ '@/pages/PageNotFound.vue')
    }
  ],
  mode: 'history'
})

export default router
