<template>
<div class="card">
	<div class="author">
		<el-avatar :icon="UserFilled" :size="30"/>
		<span class="authorName">author</span>
	</div>
	<div class="body">
		<div class="left">
			<div class="title">gpt入门</div>
			<div class="intro">
				<p>Defaulgpt入门gpt入门gpt入门gpt入门gpt入门tha哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈</p>
			</div>
		</div>
		<div class="right">
			<img style="width: 100%; height: 100%; border-radius: 5px;" :src="url" fit="fill" />
		</div>
	</div>
	<div class="footer">
		<el-icon style="margin-left: 50px;"><View /></el-icon>
		<span style="margin: 0 10px 0 5px;">36</span>
		<div class="article">
			<el-icon><ArrowRight /></el-icon>
			<span>查看全文</span>
		</div>
	</div>
</div>
</template>

<script setup lang='ts'>
import { UserFilled } from '@element-plus/icons-vue'
const url = 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
</script>

<style scoped>
.card{
	display: flex;
	flex-direction: column;
	margin-bottom: 20px;
	border-bottom: 1px solid #f1f1f1;
	.author{
		display: flex;
		flex-direction: row;
		height: 50px;
		align-items: center;
		margin-bottom: 10px;
		.authorName{
			margin-left: 20px;
			color: #555556;
		}
	}
	.body{
		display: flex;
		flex-direction: row;
		margin-left: 8%;
		height: 100px;
		margin-bottom: 20px;
		.left{
			display: flex;
			flex-direction: column;
			width: 65%;
			margin-right: 5%;
			.title{
				margin-bottom: 15px;
				color: black;
				font-weight: 1000;
				height: 20px;
			}
			.intro{
				width: 100%;
				height: 60px;
				p{
					height: 100%;
					width: 100%;
					line-height: 20px;
					color: #818181;
					font-size: 14px;
				}
			}
		}
		.right{
			width: 30%;
		}
	}
	.footer{
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-bottom: 20px;
		font-size: 14px;
		color: #a1a1a1;
		.article{
			display: flex;
			flex-direction: row;
			align-items: center;
		}
	}
}
</style>