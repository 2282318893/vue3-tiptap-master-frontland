<template>
	<el-tree-v2
		style="max-width: 100%"
		:data="knowledgeBases"
		:props="props"
		:height="240"
		:item-size="30"
		:expand-on-click-node="false"
		:indent="5"
		@node-click="nodeClick"
	>
		<template #default="{ node }">
			<div id="title" v-if="node.key == '0'" style="color: black">{{ node.label }}</div>
			<div
				class="row"
				v-if="node.key != '0'"
				@mouseenter="setHoverNodeId(node.key)"
				@mouseleave="setHoverNodeId('')"
			>
				<div class="left">
					<el-icon :size="16"><Collection /></el-icon>
					<div class="text">{{ node.label }}</div>
					<el-icon :size="14"><Lock /></el-icon>
				</div>
				<div class="right" v-show="curHoverNodeId == node.key">
					<el-popover placement="right" :width="150" trigger="click" :show-arrow="false" v-if="dialogVisible" @before-leave="hidePopver">
						<template #reference>
							<el-icon :size="16" @click.stop=""><MoreFilled /></el-icon>
						</template>
						<div class="ops">
							<div class="op"><el-icon><Connection /></el-icon><span>权限</span></div>
							<div class="op"><el-icon><Operation /></el-icon><span>更多设置</span></div>
							<div style="height: 0; border: 1px solid #f1f1f1; margin: 5px 0"></div>
							<div class="op" style="color: red;"><el-icon><Delete /></el-icon><span>删除</span></div>
						</div>
					</el-popover>
				</div>
			</div>
		</template>
	</el-tree-v2>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { genUUID } from "@/utils/uuid.js";
const router = useRouter();
//el-popover闪频问题
let dialogVisible = ref(true)
const hidePopver = () => {
  dialogVisible.value = false
  setTimeout(() => {
    dialogVisible.value = true
  }, 10)
}

const nodeClick = (data, node, e: MouseEvent) => {
	if (node.key == "0") {
		router.push("/home/knowledgeBase");
	} else {
		router.push("/kb/home");
	}
};

let curHoverNodeId = ref("");
const setHoverNodeId = (id: string) => {
	curHoverNodeId.value = id;
};

interface Tree {
	id: string;
	label: string;
	children?: Tree[];
}
const props = {
	value: "id",
	label: "label",
	children: "children"
};
let knowledgeBases: Tree[] = [
	{
		id: "0",
		label: "知识库",
		children: [
			{
				id: "1",
				label: "111"
			},
			{
				id: "2",
				label: "222"
			},
			{
				id: "3",
				label: "333"
			},
			{
				id: "4",
				label: "444"
			},
			{
				id: "5",
				label: "555"
			}
		]
	}
];
</script>

<style scoped lang="scss">
.el-tree {
	background-color: #f9f9f9;
	margin-left: 5%;
	width: 90%;
	--el-tree-node-hover-bg-color: #eaeaea;
	.row {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		.left {
			display: flex;
			flex-direction: row;
			align-items: center;
			.text {
				margin: 0 5px;
			}
		}
		.right {
			.el-icon {
				margin-right: 5px;
				width: 22px;
				height: 22px;
				border-radius: 3px;
				&:hover {
					background-color: #c1c1c1;
				}
			}
		}
	}
}

.ops{
	.op{
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 30px;
		color: black;
		&:hover{
			cursor: pointer;
			background-color: #f1f1f1;
		}
		.el-icon{
			margin: 0 10px 0 5px;
		}
	}
}
</style>
