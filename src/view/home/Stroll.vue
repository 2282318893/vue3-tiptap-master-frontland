<template>
	<div class="container">
		<el-scrollbar :height="windowHeight + 'px'">
			<div class="header">
				<span :class="{ select: page == '关注', unSelect: page != '关注' }" @click="setPage('关注')"
					>关注</span
				>
				<span :class="{ select: page == '推荐', unSelect: page != '推荐' }" @click="setPage('推荐')"
					>推荐</span
				>
			</div>
			<div class="box">
				<div class="leftBox">
					<div
						style="
							display: flex;
							flex-direction: column;
							width: 90%;
							height: 100%;
						"
					><ArticleCard/><ArticleCard/><ArticleCard/><ArticleCard/></div>
				</div>
				<div class="rightBox">111</div>
			</div>
		</el-scrollbar>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import ArticleCard from "@/components/component/home/stroll/ArticleCard.vue";

let page = ref("推荐");
const setPage = (curPage: string) => {
	page.value = curPage;
};

let windowHeight = ref(0);
onMounted(() => {
	windowHeight.value = document.body.clientHeight;
});
</script>

<style scoped lang="scss">
.container {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	.header {
		height: 50px;
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-bottom: 20px;
		span {
			font-size: 18px;
			margin-left: 30px;
			height: 40px;
			line-height: 40px;
			cursor: pointer;
		}
	}
	.box {
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 88%;
		.leftBox {
			height: auto;
			width: 65%;
			border-right: 1px solid #e1e1e1;
			display: flex;
			flex-direction: row;
			justify-content: center;
		}
		.rightBox {
			height: 100%;
			width: 35%;
		}
	}
}

.select {
	border-bottom: 2px solid black;
	color: black;
}
.unSelect {
	color: #818181;
}
</style>
