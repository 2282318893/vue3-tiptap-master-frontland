<template>
	<div class="contain">
		<div class="upper">
			<div class="header">
				<img src="/facio.png" alt="" id="logo" @click="router.push('/home/begin')" />
				<span>&nbsp;&gt;&nbsp;</span>
				<span @click="router.push('/home/knowledgeBase')">个人知识库</span>
			</div>
			<div class="kb">
				<div class="left">
					<el-icon :size="22">
						<Notebook />
					</el-icon>
					<span>{{ KBName }}</span>
					<el-icon :size="14">
						<Lock />
					</el-icon>
				</div>
				<div class="right">
					<el-icon :size="14">
						<MoreFilled />
					</el-icon>
				</div>
			</div>
			<span class="line"></span>
			<div class="searchAdd">
				<el-button type="primary" :icon="Search"
					>搜索&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ctrl J</el-button
				>
				<el-popover placement="bottom-start" :width="150" :show-arrow="false" :offset="8">
					<div class="newAdd">
						<div class="addButton"><el-icon :size="18"><Document /></el-icon><span>文档</span></div>
						<div class="addButton"><el-icon :size="18"><DataBoard /></el-icon><span>画板</span></div>
						<span style="border: 1px solid #f1f1f1; height: 0; width: 100%; margin-bottom: 2px;"></span>
						<div class="addButton"><el-icon :size="18"><PieChart /></el-icon><span>从模板新建</span></div>
						<div class="addButton"><el-icon :size="18"><Upload /></el-icon><span>导入</span></div>
					</div>
					<template #reference>
						<button id="add">+</button>
					</template>
				</el-popover>
			</div>
			<div class="home" @click="router.push('/kb/home')">
				<el-icon :size="18">
					<House />
				</el-icon>
				<span>首页</span>
			</div>
			<el-popover placement="bottom-start" :width="150" :show-arrow="false">
				<template #reference>
					<div class="docs" v-if="!isMenu">
						<el-icon :size="18">
							<Fold />
						</el-icon>
						<span>全部文档</span>
					</div>
				</template>
				<div id="menuTip">
					<div class="tip" @click="toMenu">
						<div class="left">
							<el-icon :size="18"> <Expand /> </el-icon><span>目录</span>
						</div>
						<div class="right" v-show="isMenu">
							<el-icon :size="18"><Select /></el-icon>
						</div>
					</div>
					<div class="tip" @click="toList">
						<div class="left">
							<el-icon :size="18"> <Fold /> </el-icon><span>全部文档</span>
						</div>
						<div class="right" v-show="!isMenu">
							<el-icon :size="18"><Select /></el-icon>
						</div>
					</div>
				</div>
			</el-popover>
			<div class="menu" v-if="isMenu">
				<el-popover placement="bottom-start" :width="150" :show-arrow="false">
					<template #reference>
						<div class="left">
							<el-icon :size="18">
								<Fold />
							</el-icon>
							<span>目录</span>
						</div>
					</template>
					<div id="menuTip">
						<div class="tip" @click="toMenu">
							<div class="left">
								<el-icon :size="18"> <Expand /> </el-icon><span>目录</span>
							</div>
							<div class="right" v-show="isMenu">
								<el-icon :size="18"><Select /></el-icon>
							</div>
						</div>
						<div class="tip" @click="toList">
							<div class="left">
								<el-icon :size="18"> <Fold /> </el-icon><span>全部文档</span>
							</div>
							<div class="right" v-show="!isMenu">
								<el-icon :size="18"><Select /></el-icon>
							</div>
						</div>
					</div>
				</el-popover>
				<div class="right">
					<el-tooltip
						v-if="!isExpond"
						class="box-item"
						effect="dark"
						content="全部展开"
						placement="top"
						:show-arrow="false"
					>
						<el-icon :size="18" @click="changeIsExpond">
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
						<el-icon :size="18" @click="changeIsExpond">
							<Expand />
						</el-icon>
					</el-tooltip>
				</div>
			</div>
		</div>

		<div class="lower">
			<el-scrollbar :style="{ height: height + 'px' }">
				<div class="docs" v-if="!isMenu">
					<div class="doc" v-for="doc in docs">
						<span>{{ doc.label }}</span>
						<el-icon :size="14">
							<MoreFilled />
						</el-icon>
					</div>
				</div>

				<div v-if="isMenu" :style="{ width: '90%', marginLeft: '5%' }">
					<el-popover
						ref="popoverRef"
						placement="right-start"
						:width="150"
						trigger="contextmenu"
						:show-arrow="false"
						:hide-after="0"
					>
						<template #reference>
							<div id="treeWrap">
								<div id="treeWrapInner" @contextmenu="backToNull">
									<el-tree-v2
										ref="treeRef"
										style="max-width: 100%; height: 100%"
										:expand-on-click-node="false"
										:data="data"
										:props="props"
										:height="height"
										:item-size="30"
										@node-contextmenu="contextOp"
									>
										<template #default="{ node }">
											<div class="treeItem">
												<el-icon v-if="!isTreeNodeForder(node.key)" style="margin-right: 3px">
													<Folder />
												</el-icon>
												<el-icon v-if="isTreeNodeForder(node.key)" style="margin-right: 3px">
													<Document />
												</el-icon>
												<!-- <span>{{ node.label }}</span> -->
												<div
													@dblclick="doubelClickReName(node.key)"
													v-if="!(isShowInput && curNodeId == node.key)"
												>
													<el-text style="max-width: 80px" truncated>{{ node.label }}</el-text>
												</div>
												<el-input
													v-if="isShowInput && curNodeId == node.key"
													ref="inputRefs"
													v-model="treeInput"
													style="width: 80px"
													placeholder=""
													@blur="reviseDocName(node.key)"
												/>
											</div>
										</template>
									</el-tree-v2>
								</div>
							</div>
						</template>
						<div class="ops">
							<div class="op">
								<el-button @click="treeCreate(true)"
									><el-icon> <FolderAdd /> </el-icon><span>新建文件夹</span></el-button
								>
							</div>
							<div class="op">
								<el-button @click="treeCreate(false)"
									><el-icon> <DocumentAdd /> </el-icon><span>新建文件</span></el-button
								>
							</div>
							<div class="op">
								<el-button v-if="curNodeId != ''" @click="reName"
									><el-icon> <EditPen /> </el-icon><span>重命名</span></el-button
								>
								<el-button disabled v-if="curNodeId == ''" style="color: #b1b1b1"
									><el-icon> <EditPen /> </el-icon><span>重命名</span></el-button
								>
							</div>
							<div class="op">
								<el-button v-if="curNodeId != ''" @click="copyOrCut(true)"
									><el-icon> <CopyDocument /> </el-icon><span>复制</span></el-button
								>
								<el-button disabled v-if="curNodeId == ''" style="color: #b1b1b1"
									><el-icon> <CopyDocument /> </el-icon><span>复制</span></el-button
								>
							</div>
							<div class="op">
								<el-button v-if="curNodeId != ''" @click="copyOrCut(false)"
									><el-icon> <Scissor /> </el-icon><span>剪切</span></el-button
								>
								<el-button disabled v-if="curNodeId == ''" style="color: #b1b1b1"
									><el-icon> <Scissor /> </el-icon><span>剪切</span></el-button
								>
							</div>
							<div class="op">
								<el-button disabled v-if="preOp != 'copy' && preOp != 'cut'" style="color: #b1b1b1">
									<svg
										t="1718349967997"
										class="paste"
										viewBox="0 0 1024 1024"
										version="1.1"
										xmlns="http://www.w3.org/2000/svg"
										p-id="5122"
										width="16"
										height="16"
									>
										<path
											d="M426.666667 704h341.333333a106.666667 106.666667 0 0 0 106.666667-106.666667V256a106.666667 106.666667 0 0 0-106.666667-106.666667H426.666667a106.666667 106.666667 0 0 0-106.666667 106.666667v341.333333a106.666667 106.666667 0 0 0 106.666667 106.666667zM384 266.666667A53.333333 53.333333 0 0 1 437.12 213.333333h320A53.333333 53.333333 0 0 1 810.666667 266.666667v320a53.333333 53.333333 0 0 1-53.333334 53.333333h-320a53.333333 53.333333 0 0 1-53.333333-53.333333v-320z"
											fill="#b1b1b1"
											p-id="5123"
										></path>
										<path
											d="M256 874.666667h341.333333a106.666667 106.666667 0 0 0 106.666667-106.666667v-85.333333h-64v74.666666a53.333333 53.333333 0 0 1-53.333333 53.333334h-320A53.333333 53.333333 0 0 1 213.333333 757.333333v-320A53.333333 53.333333 0 0 1 266.666667 384H341.333333V320H256a106.666667 106.666667 0 0 0-106.666667 106.666667v341.333333a106.666667 106.666667 0 0 0 106.666667 106.666667z"
											fill="#b1b1b1"
											p-id="5124"
										></path>
										<path
											d="M724.906667 394.666667m-32 0l-192 0q-32 0-32-32l0 0q0-32 32-32l192 0q32 0 32 32l0 0q0 32-32 32Z"
											fill="#b1b1b1"
											p-id="5125"
										></path>
										<path
											d="M724.906667 522.666667m-32 0l-192 0q-32 0-32-32l0 0q0-32 32-32l192 0q32 0 32 32l0 0q0 32-32 32Z"
											fill="#b1b1b1"
											p-id="5126"
										></path>
									</svg>
									<span>粘贴</span>
								</el-button>
								<el-button v-if="preOp == 'copy' || preOp == 'cut'" @click="paste">
									<svg
										t="1718085930034"
										class="paste"
										viewBox="0 0 1024 1024"
										version="1.1"
										xmlns="http://www.w3.org/2000/svg"
										p-id="4303"
										width="16"
										height="16"
									>
										<path
											d="M426.666667 704h341.333333a106.666667 106.666667 0 0 0 106.666667-106.666667V256a106.666667 106.666667 0 0 0-106.666667-106.666667H426.666667a106.666667 106.666667 0 0 0-106.666667 106.666667v341.333333a106.666667 106.666667 0 0 0 106.666667 106.666667zM384 266.666667A53.333333 53.333333 0 0 1 437.12 213.333333h320A53.333333 53.333333 0 0 1 810.666667 266.666667v320a53.333333 53.333333 0 0 1-53.333334 53.333333h-320a53.333333 53.333333 0 0 1-53.333333-53.333333v-320z"
											fill="#2c2c2c"
											p-id="4304"
										></path>
										<path
											d="M256 874.666667h341.333333a106.666667 106.666667 0 0 0 106.666667-106.666667v-85.333333h-64v74.666666a53.333333 53.333333 0 0 1-53.333333 53.333334h-320A53.333333 53.333333 0 0 1 213.333333 757.333333v-320A53.333333 53.333333 0 0 1 266.666667 384H341.333333V320H256a106.666667 106.666667 0 0 0-106.666667 106.666667v341.333333a106.666667 106.666667 0 0 0 106.666667 106.666667z"
											fill="#2c2c2c"
											p-id="4305"
										></path>
										<path
											d="M724.906667 394.666667m-32 0l-192 0q-32 0-32-32l0 0q0-32 32-32l192 0q32 0 32 32l0 0q0 32-32 32Z"
											fill="#2c2c2c"
											p-id="4306"
										></path>
										<path
											d="M724.906667 522.666667m-32 0l-192 0q-32 0-32-32l0 0q0-32 32-32l192 0q32 0 32 32l0 0q0 32-32 32Z"
											fill="#2c2c2c"
											p-id="4307"
										></path>
									</svg>
									<span>粘贴</span>
								</el-button>
							</div>
							<div class="op">
								<el-button v-if="curNodeId != ''" @click="deleteNode"
									><el-icon> <Delete /> </el-icon><span>删除</span></el-button
								>
								<el-button disabled v-if="curNodeId == ''" style="color: #b1b1b1"
									><el-icon> <Delete /> </el-icon><span>删除</span></el-button
								>
							</div>
						</div>
					</el-popover>
				</div>
			</el-scrollbar>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
import { onMounted, reactive, ref, unref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
const router = useRouter();
let KBName = ref("11");
let isShowInput = ref(false);
let treeInput = ref("");
let inputRefs = ref();
class Doc {
	id: string;
	label: string;
	constructor(id: string, label: string) {
		this.id = id;
		this.label = label;
	}
}
let docs = reactive<Doc[]>([
	{ id: "003", label: "demo3" },
	{ id: "005", label: "demo5" },
	{ id: "006", label: "demo6" }
]);
let isMenu = ref(true);
let height = ref(0);

let toMenu = () => {
	isMenu.value = true;
};
let toList = () => {
	isMenu.value = false;
};

//树形组件对应属性、方法
import { ElTreeV2 } from "element-plus";

class Tree {
	id: string;
	label: string;
	isForder: boolean;
	children?: Tree[];
	constructor(id: string, label: string, isForder: boolean, children: Tree[] = []) {
		this.id = id;
		this.label = label;
		this.isForder = isForder;
		this.children = children;
	}
}
const treeRef = ref<InstanceType<typeof ElTreeV2>>();
const popoverRef = ref();
const props = {
	value: "id",
	label: "label",
	children: "children"
};
const isTreeNodeForder = (id: String) => {
	for (let i = 0; i < docs.length; i++) {
		if (docs[i].id == id) {
			return true;
		}
	}
	return false;
};
let data: Tree[] = [
	{
		id: "001",
		label: "demo1",
		isForder: true,
		children: [
			{
				id: "002",
				label: "demo2",
				isForder: true,
				children: [
					{
						id: "009",
						label: "demo9",
						isForder: true,
						children: null
					}
				]
			},
			{
				id: "003",
				label: "demo3",
				isForder: false,
				children: null
			}
		]
	},
	{
		id: "004",
		label: "demo4",
		isForder: true,
		children: [
			{
				id: "005",
				label: "demo5",
				isForder: false,
				children: null
			},
			{
				id: "006",
				label: "demo6",
				isForder: false,
				children: null
			}
		]
	}
];

let isExpond = ref(false);
const treeOp = (treeNode: Tree, f: Function) => {
	if (treeNode != null) {
		if (treeNode.children != null) {
			for (let i = 0; i < treeNode.children.length; i++) {
				treeOp(treeNode.children[i], f);
			}
		}
		let curTreeNode = treeRef.value.getNode(treeNode.id);
		f(curTreeNode);
	}
};
let changeIsExpond = () => {
	if (!isExpond.value) {
		for (let i = 0; i < data.length; i++) {
			treeOp(data[i], treeRef.value.expandNode);
			// let treeNode = treeRef.value.getNode(data[i].id);
			// treeRef.value.expandNode(treeNode);
		}
	} else {
		for (let i = 0; i < data.length; i++) {
			treeOp(data[i], treeRef.value.collapseNode);
			// let treeNode = treeRef.value.getNode(data[i].id);
			// treeRef.value.collapseNode(treeNode);
		}
	}
	isExpond.value = !isExpond.value;
};

//定义鼠标右键菜单相关操作
import { genUUID } from "@/utils/uuid.js";
let curNodeId = ref("");
let isCurNodeFolder = false;
let preOp = ref("");
let preId = "";
//树节点右键操作
const contextOp = (e, data, node) => {
	curNodeId.value = data.id;
	isCurNodeFolder = data.isForder;
	//手动触发proper的右键菜单
	let contextEvent = new Event("contextmenu");
	let treeWrap = document.querySelector("#treeWrap");
	treeWrap.dispatchEvent(contextEvent);
};
const backToNull = () => {
	curNodeId.value = "";
	isCurNodeFolder = false;
};
//寻找指定id的节点
const findTreeNodeById = (id: string): Tree => {
	const findTreeNodeFrom = (node: Tree, id: string): Tree => {
		if (node == null) {
			return null;
		}
		if (node.id == id) {
			return node;
		} else {
			if (node.children == null) {
				return null;
			}
			for (const childNode of node.children) {
				const targetNode = findTreeNodeFrom(childNode, id);
				if (targetNode != null) {
					return targetNode;
				}
			}
			return null;
		}
	};
	for (const childNode of data) {
		const targetNode = findTreeNodeFrom(childNode, id);
		if (targetNode != null) {
			return targetNode;
		}
	}
	return null;
};
//寻找指定id的父节点
const findParentTreeNodeById = (id: string): Tree => {
	const findParentTreeNodeFrom = (node: Tree, parentNode: Tree, id: string): Tree => {
		if (node == null) {
			return null;
		}
		if (node.id == id) {
			return parentNode;
		} else {
			if (node.children == null) {
				return null;
			}
			for (const childNode of node.children) {
				const targetNode = findParentTreeNodeFrom(childNode, node, id);
				if (targetNode != null) {
					return targetNode;
				}
			}
			return null;
		}
	};
	for (const childNode of data) {
		const targetNode = findParentTreeNodeFrom(childNode, null, id);
		if (targetNode != null) {
			return targetNode;
		}
	}
	return null;
};
//创建文件夹或文件
//isTargetForder: true: 文件夹   false: 文件
const treeCreate = (isTargetForder: boolean) => {
	// console.log('treeCreateForder')
	let newNode: Tree = null;
	if (isTargetForder) {
		newNode = new Tree(genUUID(), "未命名文件夹", true);
	} else {
		newNode = new Tree(genUUID(), "未命名文件", false);
		docs.push(new Doc(newNode.id, newNode.label));
	}
	if (curNodeId.value === "") {
		//未选中节点点击鼠标，即在根节点创建一个（新建文件夹）
		data.push(newNode);
	} else {
		if (isCurNodeFolder) {
			//选中节点为文件夹，在该文件夹下新建文件夹
			let node = findTreeNodeById(curNodeId.value);
			if (node == null) {
				data.push(newNode);
			} else {
				if (node.children == null) {
					node.children = [newNode];
				} else {
					node.children.push(newNode);
				}
			}
		} else {
			//选中节点为文件，在同级位置新建文件夹
			let node = findParentTreeNodeById(curNodeId.value);
			if (node == null) {
				data.push(newNode);
			} else {
				if (node.children == null) {
					node.children = [newNode];
				} else {
					node.children.push(newNode);
				}
			}
		}
	}
	//更新树
	treeRef.value.setData(data);
	preId = "";
	preOp.value = "create";
	popoverRef.value.hide();
	// console.log(data)
};
//删除
const deleteNode = () => {
	const deleteDoc = (deletedNode: Tree) => {
		//通过节点删除该节点和子节点对应的文档对象
		if (!deletedNode.isForder) {
			const id = deletedNode.id;
			for (let i = 0; i < docs.length; i++) {
				if (docs[i].id == id) {
					index = i;
				}
			}
			docs.splice(index, 1);
		} else {
			if (deletedNode.children != null) {
				for (const node of deletedNode.children) {
					deleteDoc(node);
				}
			}
		}
	};
	//找到当前节点的父节点
	let parentNode = findParentTreeNodeById(curNodeId.value);
	let deletedNode: Tree = null;
	let index = -1;
	if (parentNode == null) {
		//该节点在data中
		for (let i = 0; i < data.length; i++) {
			if (data[i].id == curNodeId.value) {
				index = i;
			}
		}
		deletedNode = data[index];
		data.splice(index, 1);
	} else {
		for (let i = 0; i < parentNode.children.length; i++) {
			if (parentNode.children[i].id == curNodeId.value) {
				index = i;
			}
		}
		deletedNode = parentNode.children[index];
		parentNode.children.splice(index, 1);
	}
	//删除对应的文档对象
	deleteDoc(deletedNode);

	//更新树
	treeRef.value.setData(data);
	preId = "";
	preOp.value = "delete";
	popoverRef.value.hide();
};
//复制，剪切
const copyOrCut = (isCopy: boolean) => {
	preId = curNodeId.value;
	if (isCopy) {
		preOp.value = "copy";
	} else {
		preOp.value = "cut";
	}
	popoverRef.value.hide();
};
//粘贴
const paste = () => {
	const containId = (node: Tree, id: string): boolean => {
		//判断指定节点及其子节点是否包含指定id
		if (node == null) {
			return false;
		}
		if (!node.isForder) {
			return node.id == id;
		} else {
			if (node.id == id) {
				return true;
			} else {
				if (node.children == null) {
					return false;
				}
				for (const childNode of node.children) {
					if (containId(childNode, id)) {
						return true;
					}
				}
				return false;
			}
		}
	};
	const changeTreeId = (node: Tree) => {
		//修改节点中所有节点的id并将新的文档添加到docs对象中
		if (node == null) {
			return;
		}
		node.id = genUUID();
		if (!node.isForder) {
			docs.push(new Doc(node.id, node.label));
		} else {
			//文件夹对象，遍历所有孩子节点
			if (node.children != null) {
				for (const childNode of node.children) {
					changeTreeId(childNode);
				}
			}
		}
	};
	const pasteFromTo = (from: Tree | Tree[], to: Tree | Tree[], node: Tree) => {
		//如果传入的包含数组，即data
		//1.from为data
		if (to instanceof Tree && from instanceof Array) {
			if (!containId(node, to.id)) {
				//目标节点不在粘贴的节点以内
				if (preOp.value == "copy") {
					changeTreeId(node);
					if (to.children == null) {
						to.children = [node];
					} else {
						to.children.push(node);
					}
				} else if (preOp.value == "cut") {
					let index = -1;
					for (let i = 0; i < data.length; i++) {
						if (data[i].id == node.id) {
							index = i;
							break;
						}
					}
					data.splice(index, 1);
					if (to.children == null) {
						to.children = [node];
					} else {
						to.children.push(node);
					}
				}
			}
			return;
		}
		//2.to为data
		if (from instanceof Tree && to instanceof Array) {
			if (preOp.value == "copy") {
				changeTreeId(node);
				if (to == null) {
					to = [node];
				} else {
					to.push(node);
				}
			} else if (preOp.value == "cut") {
				let index = -1;
				for (let i = 0; i < from.children.length; i++) {
					if (from.children[i].id == node.id) {
						index = i;
						break;
					}
				}
				from.children.splice(index, 1);
				if (to == null) {
					to = [node];
				} else {
					to.push(node);
				}
			}
			return;
		}
		//3.from和to都为data或都不为data
		if (from instanceof Array && to instanceof Array) {
			return;
		}
		//4.from和to都不为data
		if (from instanceof Tree && to instanceof Tree) {
			if (from == to || containId(node, to.id) || !to.isForder) {
				return;
			}
			if (preOp.value == "copy") {
				//修改传入的node中的所有id，并将文件保存在doc中，然后进行插入
				changeTreeId(node);
				if (to.children == null) {
					to.children = [node];
				} else {
					to.children.push(node);
				}
			} else if (preOp.value == "cut") {
				//从from中删除node节点，然后在to进行插入
				let index = -1;
				for (let i = 0; i < from.children.length; i++) {
					if (from.children[i].id == node.id) {
						index = i;
						break;
					}
				}
				from.children.splice(index, 1);

				if (to.children == null) {
					to.children = [node];
				} else {
					to.children.push(node);
				}
			}
		}
	};
	let node: Tree = null;
	let pasteNode = findTreeNodeById(preId);
	let parentPasteNode = findParentTreeNodeById(preId);
	if (preOp.value == "copy") {
		//复制一份新的并保存
		node = JSON.parse(JSON.stringify(pasteNode));
	} else if (preOp.value == "cut") {
		node = pasteNode;
	}

	let from: Tree | Tree[] = null;
	let to: Tree | Tree[] = null;
	//确定to
	if (curNodeId.value == "") {
		to = data;
	} else {
		let curNode = findTreeNodeById(curNodeId.value);
		let curParentNode = findParentTreeNodeById(curNodeId.value);
		if (curNode.isForder) {
			//文件夹
			to = curNode;
		} else {
			if (curParentNode == null) {
				//最外侧文件
				to = data;
			} else {
				to = curParentNode;
			}
		}
	}
	//确定from
	if (parentPasteNode == null) {
		from = data;
	} else {
		from = parentPasteNode;
	}

	//进行粘贴
	pasteFromTo(from, to, node);
	treeRef.value.setData(data);
	preId = "";
	preOp.value = "paste";
	popoverRef.value.hide();
};

//重命名
const reName = () => {
	let curNode = findTreeNodeById(curNodeId.value);
	isShowInput.value = true;
	treeInput.value = curNode.label;
	setTimeout(() => {
		//自动聚焦
		inputRefs.value.focus();
	}, 100);
	preId = "";
	preOp.value = "rename";
	popoverRef.value.hide();
};
const doubelClickReName = (id: string) => {
	let curNode = findTreeNodeById(id);
	curNodeId.value = id;
	isShowInput.value = true;
	treeInput.value = curNode.label;
	setTimeout(() => {
		//自动聚焦
		inputRefs.value.focus();
	}, 100);
	preOp.value = "rename";
};

const reviseDocName = (id: string) => {
	isShowInput.value = false;
	//修改名称，此时的curNodeId仍然是当前被修改节点的id
	let curNode = findTreeNodeById(id);
	curNode.label = treeInput.value;
	treeInput.value = "";
	if (!curNode.isForder) {
		for (const doc of docs) {
			if (doc.id == curNode.id) {
				doc.label = curNode.label;
			}
		}
	}
	treeRef.value.setData(data);
};

//树形组件对应属性、方法结束

onMounted(() => {
	const cheight = document.body.clientHeight;
	height.value = cheight - 220;
});
</script>

<style scoped>
.contain {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
	align-items: center;
	flex-shrink: 0;

	.upper {
		display: flex;
		flex-direction: column;
		width: 90%;
		align-items: center;
		flex-shrink: 0;

		.header {
			width: 100%;
			height: 40px;
			display: flex;
			flex-direction: row;
			align-items: center;

			img {
				width: 16px;
				height: 16px;
				border-radius: 5px;
				cursor: pointer;
			}

			span {
				font-size: 12px;
				color: #a1a1a1;

				&:last-child {
					cursor: pointer;
				}
			}
		}

		.kb {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			height: 30px;
			width: 100%;
			align-items: center;

			.left {
				display: flex;
				flex-direction: row;
				align-items: center;

				.el-icon {
					&:first-child {
						margin-right: 5px;
					}

					&:last-child {
						margin-left: 5px;
					}
				}
			}

			.right {
				.el-icon {
					cursor: pointer;
				}
			}
		}

		.line {
			border: 1px solid #f1f1f1;
			height: 0;
			width: 100%;
			margin: 15px 0;
		}

		.searchAdd {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			height: 30px;
			margin-bottom: 5px;

			.el-button {
				height: 30px;
				width: 160px;
				background-color: #efefef;
				color: #c1c1c1;
				border: 0;
				border-radius: 5px;
			}

			#add {
				font-weight: bolder;
				text-align: center;
				font-size: 20px;
				height: 30px;
				width: 30px;
				border-radius: 8px;
				border: 1px solid #eff0f0;
				background-color: white;

				&:hover {
					cursor: pointer;
					background-color: #eaeaea;
				}
			}
		}

		.home,
		.docs {
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;
			height: 30px;
			margin-top: 5px;
			font-size: 14px;
			border-radius: 5px;

			&:hover {
				cursor: pointer;
				background-color: #efefef;
			}

			.el-icon {
				margin-right: 10px;
				margin-left: 5px;
			}
		}

		.menu {
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			height: 30px;
			margin-top: 5px;
			font-size: 14px;
			border-radius: 5px;

			.left {
				display: flex;
				flex-direction: row;
				align-items: center;
				height: 100%;
				width: 40%;
				border-radius: 5px;

				&:hover {
					cursor: pointer;
					background-color: #efefef;
				}

				.el-icon {
					margin: 0 10px 0 5px;
				}
			}

			.right {
				.el-icon {
					height: 20px;
					width: 20px;
					border-radius: 3px;

					&:hover {
						cursor: pointer;
						background-color: #efefef;
					}
				}
			}
		}
	}

	.lower {
		display: flex;
		flex-direction: column;
		width: 100%;
		margin-top: 10px;
		flex-shrink: 0;
		justify-content: center;
		color: black;

		.docs {
			display: flex;
			flex-direction: column;
			width: 100%;
			flex-shrink: 0;

			.doc {
				height: 40px;
				width: 90%;
				margin-left: 5%;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 5px;
				border-radius: 5px;

				&:hover {
					background-color: #efefef;
					cursor: pointer;
				}

				span {
					margin-left: 5px;
				}

				.el-icon {
					width: 25px;
					height: 25px;
					border-radius: 3px;
					margin-right: 5px;

					&:hover {
						background-color: #e1e1e1;
						cursor: pointer;
					}
				}
			}
		}
	}
}

#menuTip {
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;

	.tip {
		width: 100%;
		height: 25px;
		margin-bottom: 5px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;

		&:hover {
			cursor: pointer;
		}

		.left {
			display: flex;
			flex-direction: row;
			height: 100%;
			align-items: center;

			.el-icon {
				margin: 0 5px 0 5px;
			}
		}
	}
}

.newAdd{
	display: flex;
	flex-direction: column;
	.addButton{
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 30px;
		border-radius: 5px;
		color: black;
		font-size: 14px;
		margin-bottom: 2px;
		&:hover{
			background-color: #f1f1f1;
			cursor: pointer;
		}
		.el-icon{
			margin: 0 10px 0 5px;
		}
	}
}

:deep(.el-tree-node) {
	/* background-color: red; */
	/* --el-tree-node-hover-bg-color: red;
	background: red; */
}

.treeItem {
	color: black;
	display: flex;
	flex-direction: row;
	align-items: center;
	.el-input {
		height: 25px;
		--el-input-focus-border: #b1b1b1;
		--el-input-focus-border-color: #b1b1b1;
	}
}

.ops {
	width: 100%;
	display: flex;
	flex-direction: column;
	flex-shrink: 0;

	.op {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 25px;
		border-radius: 3px;
		margin-bottom: 3px;

		.el-button {
			width: 100%;
			height: 100%;
			color: black;
			--el-button-hover-bg-color: #f1f1f1;
			border: 0;
			padding: 0;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: left;
			.el-icon {
				margin: 0 5px 0 2px;
			}
			.paste {
				margin: 0 9px 0 2px;
			}
		}
	}
}
</style>
