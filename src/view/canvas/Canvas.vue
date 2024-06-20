<template>
	<div class="header">
		<div class="info">
			<div class="left">
				<el-text :truncated="true">{{ docName }}</el-text>
				<el-icon><Lock /></el-icon>
				<el-text :truncated="true">{{ message }}</el-text>
				<el-icon><MostlyCloudy /></el-icon>
			</div>
			<div class="right">
				<el-tooltip :show-arrow="false" :offset="5" effect="dark" content="收藏" placement="bottom">
					<el-icon :size="20"><Star /></el-icon>
				</el-tooltip>
				<el-tooltip :show-arrow="false" :offset="5" effect="dark" content="分享" placement="bottom">
					<el-icon :size="20"><User /></el-icon>
				</el-tooltip>
				<el-icon :size="20"><DataBoard /></el-icon>
				<div class="button">分享</div>
				<div class="button">更新</div>
			</div>
		</div>
	</div>

	<div id="canvasBody"><Index/></div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from "vue";
import Index from './Edit/Index.vue'
let docName = ref("11111111111111111111111111111111111111111111111111111111111111111111111");
let message = ref("已加载最新版本");

// import MindMap from "simple-mind-map/dist/simpleMindMap.umd.min";

// onMounted(() => {
// 	const mindMap = new MindMap({
// 		el: document.getElementById("canvasBody"),
// 		data: {
// 			data: {
// 				text: "根节点"
// 			},
// 			children: []
// 		}
// 	});
// });
</script>

<style scoped lang="scss">
.header {
	width: 100%;
	height: 9%;
	flex-shrink: 0;
	display: flex;
	flex-direction: column;
	.info {
		width: 100%;
		height: 100%;
		flex-shrink: 0;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #f1f1f1;
		.left {
			display: flex;
			flex-direction: row;
			align-items: center;
			height: 40px;
			color: #717171;
			.el-text {
				margin: 0 5px 0 20px;
				font-size: 14px;
				max-width: 200px;
			}
		}
		.right {
			display: flex;
			flex-direction: row;
			align-items: center;
			height: 40px;
			.el-icon {
				margin-right: 15px;
				width: 30px;
				height: 30px;
				border-radius: 5px;
				&:hover {
					background-color: #f1f1f1;
					cursor: pointer;
				}
			}
			.button {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				width: 60px;
				height: 35px;
				margin-right: 10px;
				border-radius: 5px;
				font-size: 14px;
				border: 1px solid;
				background-color: white;
				border: 1px solid #e1e1e1;
				&:hover {
					color: #00b96b;
					border-color: #00b96b;
					cursor: pointer;
				}
			}
		}
	}
}

#canvasBody {
	width: 100%;
	height: 89%;
}
</style>
