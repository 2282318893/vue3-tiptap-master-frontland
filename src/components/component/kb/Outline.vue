<template>
	<div class="outline">
		<div class="title">
			<span>大纲</span>
			<el-tooltip
				v-if="!isExpond"
				class="box-item"
				effect="dark"
				content="全部展开"
				placement="top"
				:show-arrow="false"
			>
				<el-icon :size="16" @click="changeIsExpond">
					<Fold />
				</el-icon>
			</el-tooltip>
			<el-tooltip
				v-if="isExpond"
				class="box-item"
				effect="dark"
				content="全部折叠"
				placement="top"
				:show-arrow="false"
			>
				<el-icon :size="16" @click="changeIsExpond">
					<Expand />
				</el-icon>
			</el-tooltip>
		</div>

		<el-anchor :container="editorRef" direction="vertical" type="underline" :offset="70">
			<div class="tree">
				<el-tree-v2
					ref="treeRef2"
					style="max-width: 100%;"
					:height="height - 80"
					:expand-on-click-node="false"
					:data="outlineTree"
					:props="outlineProps"
					:item-size="26"
				>
					<template #default="{ node }">
						<div style="font-weight: bolder;">
							<el-anchor-link :href="'#' + node.key" :title="node.label"/>
						</div>
					</template>
				</el-tree-v2>
			</div>
		</el-anchor>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, watch, watchEffect, reactive, computed } from "vue";

//文章大纲部分
const props = defineProps({
	outline: {
		type: Array,
		default: () => []
	},
	editorRef: {
		default: () => null
	}
});

//更新树
watch(
	() => props.outline,
	(newContent, oldContent) => {
		// console.log(props.outline);
		outlineTree.value = generateTree();
	}
);

//树形组件对应属性、方法
import { ElTreeV2 } from "element-plus";

interface Tree {
	id: string;
	label: string;
	children?: Tree[];
}
const treeRef2 = ref<InstanceType<typeof ElTreeV2>>();
const outlineProps = {
	value: "id",
	label: "label",
	children: "children"
};

//从父组件传播的outline中构建文件树对象
let outlineTree = ref<Tree[]>([]);
const generateTree = (): Tree[] => {
	let nodeList: Tree[] = [];
	//生成树
	for (let i = 0; i < props.outline.length; i++) {
		let outlineTreeNode: Tree = generateTreeNode(props.outline[i]);
		nodeList.push(outlineTreeNode);
	}
	return nodeList;
};
//通过文档的节点生成对应的树节点
const generateTreeNode = (docNode): Tree => {
	// console.log(docNode)
	let node: Tree = { id: "", label: "", children: null };
	node.id = docNode.id;
	node.label = docNode.title;
	if (docNode.children != null && docNode.children.length > 0) {
		node.children = [];
		for (let i = 0; i < docNode.children.length; i++) {
			node.children.push(generateTreeNode(docNode.children[i]));
		}
	}
	return node;
};
//展开收缩等
let isExpond = ref(false);
const treeOp = (treeNode: Tree, f: Function) => {
	if (treeNode != null) {
		if (treeNode.children != null) {
			for (let i = 0; i < treeNode.children.length; i++) {
				treeOp(treeNode.children[i], f);
			}
		}
		let curTreeNode = treeRef2.value.getNode(treeNode.id);
		f(curTreeNode);
	}
};
const changeIsExpond = () => {
	if (!isExpond.value) {
		for (let i = 0; i < outlineTree.value.length; i++) {
			treeOp(outlineTree.value[i], treeRef2.value.expandNode);
			// let treeNode = treeRef.value.getNode(data[i].id);
			// treeRef.value.expandNode(treeNode);
		}
	} else {
		for (let i = 0; i < outlineTree.value.length; i++) {
			treeOp(outlineTree.value[i], treeRef2.value.collapseNode);
			// let treeNode = treeRef.value.getNode(data[i].id);
			// treeRef.value.collapseNode(treeNode);
		}
	}
	isExpond.value = !isExpond.value;
};

//获取高度
let height = ref(0);
onMounted(() => {
	const cheight = document.body.clientHeight;
	height.value = cheight * 0.85;

	//生成树
	setTimeout(() => {
		outlineTree.value = generateTree();
	}, 100);
});
</script>

<style scoped lang="scss">
.outline {
	width: 100%;
	display: flex;
	flex-direction: column;
	flex-shrink: 0;
	// background-color: green;
	.title {
		height: 30px;
		display: flex;
		flex-direction: row;
		margin-left: 10px;
		align-items: center;
		font-size: 16px;
		font-weight: bolder;
		.el-icon {
			margin-left: 10px;
			border-radius: 5px;
			height: 24px;
			width: 24px;
			&:hover {
				cursor: pointer;
				background-color: #f1f1f1;
			}
		}
	}
	.tree {
		margin-left: 0;
	}

	.el-anchor{
		--el-anchor-active-color: rgb(15, 152, 47);
		--el-anchor-marker-bg-color: rgb(15, 152, 47);
	}
}

.el-anchor__item{
	--el-anchor-active-color: black;
}
:deep(.el-tree-node){
	--el-tree-node-hover-bg-color: white;
}
</style>
