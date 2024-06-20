<template>
	<div id="createDocument">
		<el-icon :size="24"><Menu /></el-icon>
		<div id="text">
			<div id="title">模板中心</div>
			<div id="detail">从模板中获得灵感</div>
		</div>
	</div>
</template>

<script setup lang="ts"></script>

<style scoped>
#createDocument {
	height: 60px;
	width: 270px;
	margin-right: 20px;
	border: 1px solid #f1f1f1;
	border-radius: 10px;
	display: flex;
	flex-direction: row;
	align-items: center;
	&:hover {
		cursor: pointer;
		background-color: #f1f1f1;
	}
	.el-icon {
		margin-left: 15px;
	}
	#text {
		margin: 0 5px 0 15px;
		width: 160px;
		display: flex;
		flex-direction: column;
		#title {
			font-size: 14px;
			margin-bottom: 8px;
		}
		#detail {
			font-size: 12px;
			color: #c1c1c1;
		}
	}
}
</style>
