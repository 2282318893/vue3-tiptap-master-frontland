<template>
	<div :class="['floating-menu', { expanded: isExpanded }]">
		<el-button class="menu-title" @click="toggleExpand">目录</el-button>
		<el-menu>
			<!-- 使用递归组件 -->
			<fold-item v-for="item in menu" :key="(item as any).title" :item="item as any"></fold-item>
		</el-menu>
	</div>
</template>

<script lang="ts" setup>
import { ref, reactive, watchEffect } from "vue";
import foldItem from "./foldItem.vue";

const props = defineProps({
	menu: {
		type: Array,
		default: () => []
	}
});

const isExpanded = ref(false);

function toggleExpand() {
	isExpanded.value = !isExpanded.value;
}

watchEffect(() => {
	console.log("Menu updated:", props.menu);
	console.log("Expanded state:", isExpanded.value);
});
</script>

<style lang="less" scoped>
.floating-menu {
	display: flex;
	flex-direction: column;
	align-items: center;
	position: fixed;
	bottom: 60px;
	right: 20px;
	width: 200px; /* 根据需要调整宽度 */
	max-height: 7vh; /* 限制最大高度 */
	overflow-y: hidden; /* 滚动条 */
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
	background-color: white;
	border-radius: 8px;
	padding: 16px;
	z-index: 1000;
	transition: all 0.3s ease;
}

.floating-menu.expanded {
	overflow-y: auto; /* 滚动条 */
	width: 500px; /* 放大后的宽度 */
	max-height: 90vh; /* 放大后的最大高度 */
}

.menu-title {
	text-align: center;
	margin-bottom: 10px;
}

.menu-controls {
	display: flex;
	justify-content: flex-end;
	width: 100%;
	margin-bottom: 10px;
}

::v-deep.el-menu {
	border: none;
}
</style>
