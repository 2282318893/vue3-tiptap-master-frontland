import {createRouter,createWebHistory} from 'vue-router'
import LoginDemo from '../components/component/extensions/loginDemo.vue'
import BaseLayout from '../components/component/extensions/BaseLayout.vue'

const router = createRouter({
	history:createWebHistory(),
	routes:[
		{
			path:'/home',
			component:BaseLayout
		},
		{
			path:'/login',
			component:LoginDemo
		},
    {
      path:'/',
      redirect:'/home'
    }
	]
})
export default router