<template>
	<div class="box">
		<div class="content">
			<div class="title">
				<div class="left">
					<el-icon :size="35"><Notebook /></el-icon>
					<span>{{ knowledgeBaseName }}</span>
				</div>
				<div class="right">
					<el-button type="primary" :icon="Star">收藏</el-button>
					<el-button type="primary">分享</el-button>
					<el-button type="primary":icon="MoreFilled"></el-button>
				</div>
			</div>
			<div class="info">
				<img src="/facio.png" alt="">
				<div class="num">{{ docNum }}</div>
				<span>文档</span>
			</div>
			<div class="desc"></div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { MoreFilled, Star } from '@element-plus/icons-vue'

let knowledgeBaseName = ref("默认知识库");
let docNum = ref(1)
</script>

<style scoped lang="scss">
.box {
	width: 100%;
	height: 100%;
	background-color: #f9f9f9;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	overflow: auto;
	.content {
		background-color: white;
		width: 70%;
		height: 90%;
		display: flex;
		flex-direction: column;
		border-radius: 10px;
		align-items: center;
		.title {
			margin-top: 5%;
			width: 90%;
			height: 10%;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			.left {
				display: flex;
				flex-direction: row;
				align-items: center;
				.el-icon {
					margin: 0 10px 0 0;
				}
				span {
					font-size: 24px;
					font-weight: bolder;
				}
			}
			.right {
				display: flex;
				flex-direction: row;
				align-items: center;
				.el-button{
					background-color: white;
					border-color: #e1e1e1;
					color: black;
					font-weight: bolder;
					&:last-child{
						width: 30px;
					}
					&:hover{
						background-color: #f1f1f1;
					}
				}
			}
		}
		.info {
			margin-top: 2%;
			width: 90%;
			height: 10%;
			align-items: center;
			display: flex;
			flex-direction: row;
			img{
				height: 35px;
				width: 35px;
				border-radius: 50%;
				margin-right: 30px;
			}
			.num{
				font-size: 20px;
				font-weight: border;
				margin-right: 5px;
			}
			span{
				color: #b1b1b1;
				font-size: 16px;
			}
		}
		.desc {
			margin-top: 3%;
			width: 90%;
			height: 57%;
			background-color: #f1f1f1;
		}
	}
}
</style>
