import { createRouter, createWebHistory } from "vue-router";
import LoginDemo from "../components/component/extensions/loginDemo.vue";
import BaseLayout from "../components/component/extensions/BaseLayout.vue";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/home",
			// component:BaseLayout
			component: () => import("@/view/Home.vue"),
			children: [
				{
					path: "/home",
					redirect: "/home/knowledgeBase"
				},
				{
					path: "begin",
					component: () => import("@/view/home/Begin.vue")
				},
				{
					path: "knowledgeBase",
					component: () => import("@/view/home/KnowledgeBase.vue")
				},
				{
					path: "stroll",
					component: () => import("@/view/home/Stroll.vue")
				},
				{
					path: "collect",
					component: () => import("@/view/home/Collect.vue")
				}
			]
		},
		{
			path: "/layout",
			component: BaseLayout
		},
		{
			path: "/login",
			component: LoginDemo
		},
		{
			path: "/",
			redirect: "/kb"
		},
		{
			path: "/kb",
			component: () => import("@/view/documents/KB.vue"),
			children: [
				{
					path: "/kb",
					redirect: "/kb/canvas"
				},
				{
					path: "home",
					component: () => import("@/view/documents/Home.vue")
				},
				{
					path: "document",
					component: () => import("@/view/documents/Document.vue")
				},
				{
					path: "edit",
					component: () => import("@/view/documents/Edit.vue")
				},
				{
					path: "table",
					component: () => import("@/view/table/Table.vue")
				},
				{
					path: "canvas",
					component: () => import("@/view/canvas/Canvas.vue")
				}
			]
		}
	]
});
export default router;
