<template>
	<div id="container1">
		<div
			:class="{
				default: router.currentRoute.value.path != '/home/begin',
				active: router.currentRoute.value.path == '/home/begin'
			}"
			id="start"
			@click="toBegin"
		>
			<el-icon><Clock /></el-icon>开始
		</div>
		<div
			:class="{
				default: router.currentRoute.value.path != '/home/collect',
				active: router.currentRoute.value.path == '/home/collect'
			}"
			id="collect"
			@click="toCollect"
		>
			<el-icon><Star /></el-icon>收藏
		</div>
		<div
			:class="{
				default: router.currentRoute.value.path != '/home/stroll',
				active: router.currentRoute.value.path == '/home/stroll'
			}"
			id="stroll"
			@click="toStroll"
		>
			<el-icon><Orange /></el-icon>逛逛
		</div>
	</div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
const router = useRouter();

let toBegin = () => {
	router.push("/home/begin");
};
let toCollect = () => {
	router.push("/home/collect");
};
let toStroll = () => {
	router.push("/home/stroll");
};
</script>

<style scoped lang="scss">
#container1 {
	height: 100%;
	width: 100%;
	margin-top: 10px;
	align-items: center;
	display: flex;
	flex-direction: column;
	div {
		&:hover {
			background-color: #eaeaea;
		}
		.el-icon {
			margin: 0 10px 0 5px;
		}
	}
}
.default {
	height: 30px;
	width: 90%;
	display: flex;
	flex-direction: row;
	margin-bottom: 10px;
	border-radius: 5px;
	border: 0;
	background-color: #fafafa;
	text-align: left;
	font-size: 14px;
	align-items: center;
	cursor: pointer;
}
.active {
	height: 30px;
	width: 90%;
	display: flex;
	flex-direction: row;
	margin-bottom: 10px;
	border-radius: 5px;
	border: 0;
	background-color: #eaeaea;
	text-align: left;
	font-size: 14px;
	align-items: center;
	cursor: pointer;
}
</style>
