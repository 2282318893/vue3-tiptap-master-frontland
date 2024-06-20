<template>
	<el-popover placement="bottom" :width="250" trigger="hover" :show-arrow="false">
		<template #reference>
			<div id="createDocument">
				<el-icon :size="24"><DocumentAdd /></el-icon>
				<div id="text">
					<div id="title">新建文档</div>
					<div id="detail">文档、表格、画板、数据表</div>
				</div>
				<el-icon><ArrowDown /></el-icon>
			</div>
		</template>

		<div class="createTip">
			<div class="tip"><el-icon :size="16"><Notebook /></el-icon>新建文档</div>
			<div class="tip"><el-icon :size="16"><Tickets /></el-icon>新建表格</div>
			<div class="tip"><el-icon :size="16"><DataBoard /></el-icon>新建画板</div>
			<div class="tip"><el-icon :size="16"><DataAnalysis /></el-icon>新建数据表</div>
			<span></span>
			<div class="tip"><el-icon :size="16"><UploadFilled /></el-icon>导入</div>
		</div>
	</el-popover>
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
	&:hover{
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
.createTip {
	display: flex;
	flex-direction: column;
	flex-shrink: 0;
	align-items: center;
	color: black;
	font-size: 14px;
	.tip {
		width: 94%;
		height: 35px;
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-shrink: 0;
		background-color: white;
		margin-bottom: 2px;
		border-radius: 10px;
		&:hover{
			background-color: #e1e1e1;
			cursor: pointer;
		}
	}
	span{
		border: 1px solid #e9e9e9;
		width: 94%;
		height: 0;
		margin: 5px 0;
	}
	.el-icon{
		margin: 0 10px;
	}
}
</style>
