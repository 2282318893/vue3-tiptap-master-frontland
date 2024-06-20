<template>
	<div class="card" :class="{'selected': props.curCardId == props.id}" @click="selectCard(props.id)">
		<div class="upper">
			<div class="left">{{ props.title }}</div>
			<div class="right">
				<el-tooltip
					class="box-item"
					effect="dark"
					content="新建分组"
					placement="top"
					:show-arrow="false"
				>
					<el-icon @click="props.showCreateCard" v-if="props.id == ''"><Plus /></el-icon>
				</el-tooltip>

				<el-popover placement="bottom-start" trigger="hover" :show-arrow="false">
					<template #reference>
						<el-icon v-if="props.id != ''"><MoreFilled /></el-icon>
					</template>
					<div class="button" @click="props.showEditCard(props.id, props.title)">编辑</div>
					<div class="button" @click="delCard(props.id)">删除</div>
				</el-popover>

			</div>
		</div>
		<div class="lower">{{ props.num }} 条内容</div>
	</div>

</template>

<script setup lang="ts">
import { ref, defineProps, onMounted } from "vue";

const props = defineProps(["id", "title", "num", "showCreateCard",  "showEditCard", "delCard", "curCardId", "selectCard"]);

onMounted(() => {
	console.log(props.curCardId)
	console.log(props.id)
	console.log(props.curCardId == props.id)
})
</script>

<style scoped>
.card {
	width: 180px;
	height: 80px;
	border-radius: 10px;
	background-color: white;
	margin-bottom: 5px;
	&:hover {
		background-color: #f1f1f1;
		cursor: pointer;
	}
	.upper {
		height: 50%;
		color: black;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
		.left {
			margin-left: 10px;
		}
		.right {
			margin-right: 10px;
			color: #818181;
		}
	}
	.lower {
		height: 50%;
		color: #818181;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-left: 10px;
		font-size: 12px;
	}
}

.button{
	height: 30px;
	display: flex;
	justify-content: center;
	align-items: center;
	margin-bottom: 2px;
	&:hover{
		cursor: pointer;
		background-color: #f1f1f1;
	}
}

.selected{
	background-color: #f1f1f1;
}
</style>
