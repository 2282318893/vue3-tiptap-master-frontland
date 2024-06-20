<template>
	<el-table :data="tableData" style="width: 100%" :cell-style="{ height: '60px' }">
		<el-table-column sortable prop="name" label="名称" :width="windowWidth * 0.616 * 0.4">
			<template #default="scope">
				<div style="display: flex; flex-direction: row; align-items: center">
					<el-icon :size="20" style="margin-right: 5px"><Notebook /></el-icon>
					<span>{{ scope.row.name }}</span>
				</div>
			</template>
		</el-table-column>
		<el-table-column prop="owner" label="归属" :width="windowWidth * 0.616 * 0.2" />
		<el-table-column sortable prop="time" label="收藏时间" :width="windowWidth * 0.617 * 0.32" />
		<el-table-column label="" :width="windowWidth * 0.616 * 0.08">
			<template #default="scope">
				<el-popover trigger="hover" placement="bottom-end" width="auto" :show-arrow="false">
					<template #reference>
						<el-icon :size="20" style="cursor: pointer"><Star /></el-icon>
					</template>

					<div class="tip">
						<div class="title">选择分组</div>
						<div class="t">
							<div>你可以选择分组或直接&nbsp;</div>
							<div class="delete">取消收藏</div>
						</div>
						<div class="checkBox">
							<el-checkbox-group v-model="checked" style="display: flex; flex-direction: column;">
								<el-checkbox :label="card.title" v-for="card in cards" :key="card.id"/>
							</el-checkbox-group>
						</div>
					</div>
				</el-popover>
			</template>
		</el-table-column>
	</el-table>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, defineProps } from "vue";

let windowWidth = ref(0);

let checked = ref([])

const props = defineProps(['cards'])
onMounted(() => {
	windowWidth.value = document.body.clientWidth;
});
const tableData = [
	{
		name: "2016-05-03",
		owner: "Tom",
		time: "No. 189, Grove St, Los Angeles"
	},
	{
		name: "2016-05-02",
		owner: "Tom",
		time: "No. 189, Grove St, Los Angeles"
	},
	{
		name: "2016-05-04",
		owner: "Tom",
		time: "No. 189, Grove St, Los Angeles"
	},
	{
		name: "2016-05-01",
		owner: "Tom",
		time: "No. 189, Grove St, Los Angeles"
	}
];
</script>
<style scoped>
.tip {
	display: flex;
	flex-direction: column;
	justify-content: center;
	.title {
		color: black;
		height: 30px;
		font-size: 16px;
	}
	.t {
		font-size: 12px;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-bottom: 10px;
		.delete {
			color:rgb(37, 158, 47);
			cursor: pointer;
		}
	}
	.checkBox{
		display: flex;
		flex-direction: column;
	}
}

.el-checkbox{
	--el-checkbox-checked-text-color: rgb(37, 158, 47);
	--el-checkbox-checked-input-border-color: rgb(37, 158, 47);
	--el-checkbox-checked-bg-color: rgb(37, 158, 47);
	--el-checkbox-input-border-color-hover: rgb(37, 158, 47);
}
</style>
