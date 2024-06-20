<template>
	<div id="createDocument" @click="openDialog">
		<el-icon :size="24"><FolderAdd /></el-icon>
		<div id="text">
			<div id="title">新建知识库</div>
			<div id="detail">使用知识库整理知识</div>
		</div>
	</div>

	<el-dialog v-model="dialogVisible" title="新建知识库" width="400" @close="closeDialog">
		<template #footer>
			<div id="dialog">
				<span>基本信息</span>
				<div class="name">
					<el-icon :size="24"><FolderAdd /></el-icon>
					<el-input v-model="name" style="width: 100%; height: 40px" placeholder="知识库名称" />
				</div>
				<div id="input">
					<el-input
						v-model="desc"
						style="width: 100%"
						:autosize="{ minRows: 2, maxRows: 4 }"
						type="textarea"
						placeholder="知识库简介"
					/>
				</div>
				<el-button type="success">新建</el-button>
			</div>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
let dialogVisible = ref(false);
let name = ref("");
let desc = ref("");
let closeDialog = () => {
	dialogVisible.value = false;
};
let openDialog = () => {
	dialogVisible.value = true;
};
</script>

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

#dialog {
	display: flex;
	flex-direction: column;
	justify-content: center;
	flex-shrink: 0;
	width: 100%;
	border-radius: 10px;
	span {
		width: 100%;
		height: 30px;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-bottom: 3px;
	}
	.name {
		width: 100%;
		height: 50px;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-bottom: 10px;
		.el-icon {
			width: 13%;
			height: 40px;
			border: 1px solid #c1c1c1;
			border-radius: 5px;
			margin: 0 2% 0 0;
		}
		.el-input {
			--el-input-focus-border-color: #188958;
		}
	}
	#input {
		margin-bottom: 20px;
		.el-textarea {
			--el-input-focus-border-color: #188958;
		}
	}

	.el-button{
		--el-button-bg-color:#1da96d;
		--el-button-border-color:#1da96d;
		--el-button-hover-bg-color: #188958;
		--el-button-hover-border-color: #188958;
	}
}
</style>
