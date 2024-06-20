<template>
	<div class="container">
		<div class="header">
			<div class="left">
				<el-text :truncated="true">{{ docName }}</el-text>
				<el-icon><Lock /></el-icon>
			</div>
			<div class="right">
				<el-tooltip :show-arrow="false" :offset="5" effect="dark" content="收藏" placement="bottom">
					<el-icon :size="20"><Star /></el-icon>
				</el-tooltip>
				<el-tooltip :show-arrow="false" :offset="5" effect="dark" content="分享" placement="bottom">
					<el-icon :size="20"><User /></el-icon>
				</el-tooltip>
				<el-icon :size="20"><DataBoard /></el-icon>
				<div class="button button1">分享</div>
				<div class="button button2">编辑</div>
			</div>
		</div>
		<el-scrollbar height="100%" wrap-class="el-scollbar">
			<div class="content-wrap">
				<div class="content">
					<div class="title">
						<el-text>{{ docName }}</el-text>
					</div>
					<div class="doc">
						
					</div>
				</div>

				<div class="tail">
					<el-icon><User /></el-icon>
					<el-text>{{ creater }}</el-text>
					<el-icon><Clock /></el-icon>
					<el-text>{{ time }}</el-text>
				</div>
			</div>

			<div class="outline-wrap">
				<Outline/>
			</div>
		</el-scrollbar>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Outline from '@/components/component/kb/Outline.vue'
let docName = ref("11111111111111111111111111111111111111111111111111111111111111111111111");
let creater = ref('user')
let time = ref('2024-06-11 13:34')
</script>

<style scoped lang="scss">
.container {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	flex-shrink: 0;
	.header {
		width: 100%;
		height: 9%;
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
				width: 200px;
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
			}
			.button1 {
				background-color: white;
				border: 1px solid #e1e1e1;
				&:hover {
					color: #00b96b;
					border-color: #00b96b;
					cursor: pointer;
				}
			}
			.button2 {
				color: white;
				background-color: #00b96b;
				border: 1px solid #00b96b;
				&:hover {
					background-color: rgb(0, 140, 82);
					border-color: rgb(0, 140, 82);
					cursor: pointer;
				}
			}
		}
	}

	.content-wrap {
		margin-left: 4%;
		display: flex;
		flex-direction: column;
		flex-shrink: 0;
		width: 64%;
		margin-top: 10px;
		.content {
			width: 100%;
			height: 300px;
			display: flex;
			flex-direction: column;
			.title {
				width: 100%;
				margin-bottom: 25px;
				.el-text {
					font-size: 32px;
					line-height: 48px;
					font-weight: bolder;
				}
			}
			.doc{
				display: flex;
				flex-direction: column;
				width: 100%;
				height: 300px;
			}
		}
		.tail {
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;
			height: 40px;
			color: #b1b1b1;
			align-items: center;
			margin-bottom: 30px;
			.el-text{
				color: #b1b1b1;
				max-width: 200px;
				margin-right: 20px;
			}
			.el-icon{
				margin: 0 5px;
			}
		}
	}
	.outline-wrap{
		position: absolute;
		left: 70%;
		top: 0;
		margin-top: 20px;
		width: 25%;
	}
}
</style>
