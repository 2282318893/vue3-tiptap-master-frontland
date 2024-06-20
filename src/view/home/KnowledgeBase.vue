<template>
	<el-scrollbar>
		<div class="knowledge">
			<div class="container" ref="outerBox">
				<span>知识库</span>
				<div class="header">
					<div class="left">
						<div id="buttons">
							<button :class="{ buttonActive: isMine, buttonUnActive: !isMine }" @click="toMy">我个人的</button>
							<button :class="{ buttonActive: !isMine, buttonUnActive: isMine }" @click="toOther">邀请协作的</button>
						</div>
					</div>
					<div class="right">
						<el-icon :size="18"><Plus /></el-icon>
					</div>
				</div>
				<div
					style="height: 1px; width: 100%; background-color: #d1d1d1; margin: 10px 0 30px 0"
				></div>

				<div id="my" v-if="isMine">
					<KnowledgeBaseCard
						v-for="knowledgeBase in knowledgeBases"
						:id="knowledgeBase.id"
						:name="knowledgeBase.name"
						:desc="knowledgeBase.desc"
						:doc-num="knowledgeBase.docNum"
						:time="knowledgeBase.time"
					/>
				</div>
				<div id="other" v-else>
					<el-table :data="tableData" style="width: 100%" :row-style="{ height: '80px' }">
						<el-table-column prop="name" label="名称" sortable :width="width * 0.4" />
						<el-table-column prop="from" label="归属" :width="width * 0.3" />
						<el-table-column prop="updateTime" sortable label="更新时间" />
					</el-table>
				</div>
			</div>
		</div>
	</el-scrollbar>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import KnowledgeBaseCard from "@/components/component/home/knowledgeBase/KnowledgeBaseCard.vue";
let width = ref(0);
let isMine = ref(true);
let knowledgeBases = reactive([
	{
		id: "001",
		name: "name",
		desc: "desc",
		docNum: 10,
		time: "2024-06-12"
	},
	{
		id: "002",
		name: "name",
		desc: "desc",
		docNum: 10,
		time: "2024-06-12"
	},
	{
		id: "003",
		name: "name",
		desc: "desc",
		docNum: 10,
		time: "2024-06-12"
	},
	{
		id: "004",
		name: "name",
		desc: "desc",
		docNum: 10,
		time: "2024-06-12"
	},
	{
		id: "005",
		name: "name",
		desc: "desc",
		docNum: 10,
		time: "2024-06-12"
	},
	{
		id: "006",
		name: "name",
		desc: "desc",
		docNum: 10,
		time: "2024-06-12"
	},
	{
		id: "007",
		name: "name",
		desc: "desc",
		docNum: 10,
		time: "2024-06-12"
	}
]);

//参与列表
const tableData = [
	{
		name: "2016-05-03",
		from: "Tom",
		updateTime: "No. 189, Grove St, Los Angeles"
	},
	{
		name: "2016-05-02",
		from: "Tom",
		updateTime: "No. 189, Grove St, Los Angeles"
	},
	{
		name: "2016-05-04",
		from: "Tom",
		updateTime: "No. 189, Grove St, Los Angeles"
	},
	{
		name: "2016-05-01",
		from: "Tom",
		updateTime: "No. 189, Grove St, Los Angeles"
	},
	{
		name: "2016-05-08",
		from: "Tom",
		updateTime: "No. 189, Grove St, Los Angeles"
	},
	{
		name: "2016-05-06",
		from: "Tom",
		updateTime: "No. 189, Grove St, Los Angeles"
	},
	{
		name: "2016-05-07",
		from: "Tom",
		updateTime: "No. 189, Grove St, Los Angeles"
	}
];

let toMy = () => {
	isMine.value = true;
};
let toOther = () => {
	isMine.value = false;
};
//获取列表宽度
let outerBox = ref();
onMounted(() => {
	width.value = outerBox.value.clientWidth;
});
</script>

<style scoped lang="scss">
.knowledge {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	flex-shrink: 0;
	overflow: auto;
	.container {
		width: 94%;
		display: flex;
		flex-direction: column;
		flex-shrink: 0;
		span {
			height: 20px;
			font-size: 20px;
			margin-top: 30px;
		}
		.header {
			margin-top: 15px;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			height: 50px;
			flex-shrink: 0;
			.left {
				display: flex;
				flex-direction: row;
				align-items: center;
				flex-shrink: 0;
				#buttons {
					background-color: #efefef;
					height: 36px;
					width: 180px;
					display: flex;
					flex-direction: row;
					border-radius: 5px;
					align-items: center;
					justify-content: center;
					flex-shrink: 0;
				}
			}
			.right {
				border: 1px solid #b9b9b9;
				height: 32px;
				width: 32px;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				border-radius: 5px;
				flex-shrink: 0;
			}
		}

		#my {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			gap: 20px 2%;
			flex-shrink: 0;
		}
		#other {
			display: flex;
			flex-direction: row;
			flex-shrink: 0;
		}
	}
}
.buttonUnActive {
	width: 87px;
	height: 30px;
	font-size: 14px;
	border-radius: 5px;
	border: 0;
	cursor: pointer;
	background-color: #efefef;
}
.buttonActive {
	width: 87px;
	height: 30px;
	font-size: 14px;
	border-radius: 5px;
	border: 0;
	background-color: white;
	cursor: pointer;
}
</style>
