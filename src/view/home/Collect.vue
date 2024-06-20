<template>
	<div class="box">
		<div class="body">
			<div class="header">
				<div class="left">收藏</div>
				<div class="right">
					<el-icon><Search /></el-icon>
					<el-icon><Filter /></el-icon>
				</div>
			</div>
			<div class="content">
				<div class="left">
					<el-scrollbar :height="windowHeight * 0.88 + 'px'">
						<CollectCard
							v-for="card in cards"
							:key="card.id"
							:id="card.id"
							:title="card.title"
							:num="card.num"
							:curCardId="curCardId"
							:selectCard="selectCard"
							:showCreateCard="showCreateCard"
							:showEditCard="showEditCard"
							:delCard="delCard"
						/>
					</el-scrollbar>
				</div>
				<div class="right"><CollectTable :cards='cards.slice(1, cards.length)'/></div>
			</div>
		</div>
	</div>

	<el-dialog
		v-model="createDialogTableVisible"
		title="新建分组"
		width="400"
		@close="closeCreateCard"
	>
		<div style="color: black; margin: 20px 0 15px 0">分组名称</div>
		<el-input
			v-model="cardName"
			placeholder="请输入分组名称"
			style="
				--el-input-focus-border: rgb(32, 136, 65);
				--el-input-focus-border-color: rgb(32, 136, 65);
			"
		/>
		<div style="height: 1px; border: 1px solid #f1f1f1; margin: 40px 0 10px 0"></div>
		<div style="display: flex; flex-direction: row-reverse">
			<el-button
				v-if="cardName == ''"
				disabled
				type="success"
				style="
					margin-left: 10px;
					border: 0;
					--el-button-bg-color: rgb(54, 216, 105);
					--el-button-hover-text-color: white;
					color: white;
					--el-button-hover-bg-color: rgb(32, 136, 65);
				"
				>确定</el-button
			>
			<el-button
				@click="createCard"
				v-if="cardName != ''"
				style="
					margin-left: 10px;
					border: 0;
					--el-button-bg-color: rgb(54, 216, 105);
					--el-button-hover-text-color: white;
					color: white;
					--el-button-hover-bg-color: rgb(32, 136, 65);
				"
				>确定</el-button
			>
			<el-button
				@click="closeCreateCard"
				style="
					--el-button-hover-text-color: rgb(32, 136, 65);
					--el-button-hover-bg-color: white;
					--el-button-hover-border-color: rgb(32, 136, 65);
				"
				>取消</el-button
			>
		</div>
	</el-dialog>
	<el-dialog v-model="editDialogTableVisible" title="编辑分组" width="400">
		<div style="color: black; margin: 20px 0 15px 0">分组名称</div>
		<el-input
			v-model="editName"
			placeholder="请输入分组名称"
			style="
				--el-input-focus-border: rgb(32, 136, 65);
				--el-input-focus-border-color: rgb(32, 136, 65);
			"
		/>
		<div style="height: 1px; border: 1px solid #f1f1f1; margin: 40px 0 10px 0"></div>
		<div style="display: flex; flex-direction: row-reverse">
			<el-button
				@click="updateCard"
				style="
					margin-left: 10px;
					border: 0;
					--el-button-bg-color: rgb(54, 216, 105);
					--el-button-hover-text-color: white;
					color: white;
					--el-button-hover-bg-color: rgb(32, 136, 65);
				"
				>确定</el-button
			>
			<el-button
				@click="closeEditCard"
				style="
					--el-button-hover-text-color: rgb(32, 136, 65);
					--el-button-hover-bg-color: white;
					--el-button-hover-border-color: rgb(32, 136, 65);
				"
				>取消</el-button
			>
		</div>
	</el-dialog>
</template>

<script setup lang="ts">
import CollectCard from "@/components/component/home/collect/CollectCard.vue";
import CollectTable from "@/components/component/home/collect/CollectTable.vue";
import { ref, reactive, onMounted } from "vue";
import { genUUID } from "@/utils/uuid.js";
import { ElMessage } from "element-plus";

class CollectedCard {
	id: string;
	title: string;
	num: number;
	constructor(id: string, title: string, num: number = 0) {
		this.id = id;
		this.title = title;
		this.num = num;
	}
}
let windowHeight = ref(0);

let cards = reactive([
	{
		id: "",
		title: "全部收藏",
		num: 3
	},
	{
		id: "1",
		title: "demo",
		num: 2
	},
	{
		id: "2",
		title: "demo2",
		num: 1
	}
]);

let cardName = ref("");
let editName = ref("");
let editCardId = "";
let curCardId = ref("");
let createDialogTableVisible = ref(false);
let editDialogTableVisible = ref(false);

const showCreateCard = () => {
	createDialogTableVisible.value = true;
};
const closeCreateCard = () => {
	cardName.value = "";
	createDialogTableVisible.value = false;
};
const showEditCard = (id: string, title: string) => {
	editCardId = id;
	editName.value = title;
	editDialogTableVisible.value = true;
};
const closeEditCard = () => {
	editCardId = "";
	editName.value = "";
	editDialogTableVisible.value = false;
};
const createCard = () => {
	createDialogTableVisible.value = false;
	for (const card of cards) {
		if (card.title == cardName.value) {
			//添加失败
			ElMessage.error("名称重复，添加失败.");
			cardName.value = "";
			return;
		}
	}
	//添加成功
	cards.push(new CollectedCard(genUUID(), cardName.value, 0));
	cardName.value = "";
};
const delCard = (id: string) => {
	let index = -1;
	for (let i = 0; i < cards.length; i++) {
		if (cards[i].id == id) {
			index = i;
			break;
		}
	}
	cards.splice(index, 1);
};
const updateCard = () => {
	editDialogTableVisible.value = false;
	for (const card of cards) {
		if (card.id == editCardId) {
			card.title = editName.value;
			return;
		}
	}
	editCardId = "";
	editName.value = "";
};
const selectCard = (id: string) => {
	curCardId.value = id;
};

onMounted(() => {
	windowHeight.value = document.body.clientHeight;
});
</script>

<style scoped lang="scss">
.box {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	align-items: center;
	flex-shrink: 0px;
	.body {
		display: flex;
		flex-direction: column;
		width: 94%;
		height: 100%;
		.header {
			margin-top: 1%;
			height: 10%;
			width: 100%;
			flex-shrink: 0;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			.left {
				font-size: 18px;
			}
			.right {
				display: flex;
				flex-direction: row;
				align-items: center;
				.el-icon {
					margin: 0 10px 0 20px;
				}
			}
		}
		.content {
			display: flex;
			flex-direction: row;
			height: 89%;
			width: 100%;
			.left {
				height: 100%;
				width: 20%;
				.el-scrollbar {
					width: 100%;
					display: flex;
					flex-direction: column;
				}
			}
			.right {
				height: 100%;
				width: 80%;
			}
		}
	}
}
</style>
