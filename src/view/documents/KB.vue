<template>
	<div id="containerh">
		<div class="left1"><LeftMenu></LeftMenu></div>
		<div class="right1"><router-view></router-view></div>
	</div>
</template>

<script setup lang="ts">
import LeftMenu from "@/components/component/kb/LeftMenu.vue";
</script>

<style scoped lang="scss">
#containerh {
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: row;
	.left1 {
		width: 18%;
		background-color: white;
		border-right: 2px solid #f7f7f7;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.right1 {
		width: 82%;
	}
}
</style>
