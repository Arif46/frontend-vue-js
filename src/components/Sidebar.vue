<template>
    <div class="sidebar-wrapper">
        <a href="javascript:" class="logo-route">
            <div class="logo-wrapper">
                <img src="../assets/images/silicon_ orchard_ltd.png" class="logo-img" alt="">
            </div>
        </a>
        <div class="sidebar-navigation">
            <CollapseMenu :items="items" :open="true" :horizontal="horizontal" :sidebarGroupTitle="sidebarGroupTitle"/>
        </div>
    </div>
</template>
<script>
import SideBarItems from '../FackApi/json/SideBarAdmin'
import CollapseMenu from './menus/CollapseMenu.vue'
export default {
  Name: 'Sidebar',
  components: {
    CollapseMenu
  },
  mounted () {
    this.items = SideBarItems.common
  },
  data () {
    return {
      items: [],
      homeURL: { type: Object, default: () => ({ path: '/auth/dashboard' }) },
      logo: { type: String, default: require('../assets/images/logo.png') },
      horizontal: true,
      toggleButton: true,
      logoShow: true,
      onlyLogo: true,
      onlyLogoText: true,
      sidebarGroupTitle: true,
      menus: [
        {
          name: 'Module',
          children: [
            {
              name: 'Service',
              children: [
                {
                  name: 'Item One'
                },
                {
                  name: 'Item Two'
                },
                {
                  name: 'Item Three'
                }
              ]
            }
          ]
        }
      ]
    }
  }
}
</script>
