<template>
	<div id="begin">
		<p>开始</p>
		<div id="create">
			<CreateDocument />
			<CreateKnowledgeBase />
			<CreateFromTemplate />
		</div>
		<p>文档</p>
		<div id="select">
			<div id="buttons">
				<button :class="{ buttonActive: isEdit, buttonUnActive: !isEdit }" @click="toEdit">
					编辑过
				</button>
				<button :class="{ buttonActive: !isEdit, buttonUnActive: isEdit }" @click="toScan">
					浏览过
				</button>
			</div>
			<div id="conditions">
				<el-popover placement="bottom-end" :width="150" trigger="click" :show-arrow="false">
					<template #reference>
						<span
							>类型<el-icon><ArrowDown /></el-icon
						></span>
					</template>
					<div class="docTypes">
						<div class="docType" @click="selectDocType('all')">
							<el-icon v-show="docType == 'all'"><Select /></el-icon><span>所有</span>
						</div>
						<div class="docType" @click="selectDocType('text')">
							<el-icon v-show="docType == 'text'"><Select /></el-icon><span>文档</span>
						</div>
						<div class="docType" @click="selectDocType('table')">
							<el-icon v-show="docType == 'table'"><Select /></el-icon><span>表格</span>
						</div>
						<div class="docType" @click="selectDocType('board')">
							<el-icon v-show="docType == 'board'"><Select /></el-icon><span>画板</span>
						</div>
					</div>
				</el-popover>
				<el-popover placement="bottom-end" :width="150" trigger="click" :show-arrow="false">
					<template #reference>
						<span
							>归属<el-icon><ArrowDown /></el-icon
						></span>
					</template>
					<el-scrollbar max-height="240px">
						<div class="kbs">
							<div class="kb" @click="selectKb('all')">
								<el-icon v-show="kb == 'all'"><Select /></el-icon><span>所有</span>
							</div>
							<div v-if="isEdit">
								<div class="kb" @click="selectKb(editKb)" v-for="editKb in docsStore.editKbs">
									<el-icon v-show="kb == editKb"><Select /></el-icon><span>{{ editKb }}</span>
								</div>
							</div>
							<div v-if="!isEdit">
								<div class="kb" @click="selectKb(lookedKb)" v-for="lookedKb in docsStore.lookedKbs">
									<el-icon v-show="kb == lookedKb"><Select /></el-icon><span>{{ lookedKb }}</span>
								</div>
							</div>
						</div>
					</el-scrollbar>
				</el-popover>
				<el-popover placement="bottom-end" :width="150" trigger="click" :show-arrow="false">
					<template #reference>
						<span
							>创建者<el-icon><ArrowDown /></el-icon
						></span>
					</template>
					<el-scrollbar max-height="240px">
						<div class="creaters">
							<div class="creater" @click="selectCreater('all')">
								<el-icon v-show="creater == 'all'"><Select /></el-icon><span>所有</span>
							</div>
							<div v-if="isEdit">
								<div class="creater" @click="selectCreater(editCreater)" v-for="editCreater in docsStore.editCreaters">
									<el-icon v-show="creater == editCreater"><Select /></el-icon><span>{{ editCreater }}</span>
								</div>
							</div>
							<div v-if="!isEdit">
								<div class="creater" @click="selectCreater(lookedCreater)" v-for="lookedCreater in docsStore.lookedCreaters">
									<el-icon v-show="creater == lookedCreater"><Select /></el-icon><span>{{ lookedCreater }}</span>
								</div>
							</div>
						</div>
					</el-scrollbar>
				</el-popover>
			</div>
		</div>
		<div id="documents">
			<Documents :isEdit="isEdit" :docType="docType" :kb="kb" :creater="creater"/>
		</div>
	</div>
	<div id="quickStart">
		<svg
			t="1717646883825"
			class="icon"
			viewBox="0 0 1024 1024"
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			p-id="4569"
			width="16"
			height="16"
		>
			<path
				d="M519.703 853.443c-78.55-0.019-141.938-37.773-144.603-39.385-2.179-1.647-12.103-10.198-15.526-30.138l-0.183-1.063 0.064-1.062c0.027-0.586 2.875-58.134-28.225-117.019-2.683-3.149-87.429-111.817-111.04-225.21-1.309-5.75-31.172-146.058 110.591-278.291 3.571-2.975 78.852-64.148 185.333-64.148 75.803 0 147.467 31.044 212.998 92.282 2.215 2.325 178.594 193.928 9.173 409.947-0.513 0.714-71.683 99.716-78.823 184.875 1.318 15.068-10.144 26.695-17.285 31.254-35.485 25.105-76.828 37.958-122.474 37.958z m-133.681-54.545c0.248 0 61.027 35.777 133.681 35.795 41.691 0 79.391-11.699 112.019-34.752 0.403-0.274 9.998-6.829 9.027-14.428l-0.128-0.952 0.091-0.952c7.142-90.652 79.538-191.301 82.614-195.549 159.771-203.733-5.749-383.582-7.434-385.367-61.521-57.465-128.883-86.816-199.778-86.816-99.533 0-172.259 58.894-172.982 59.489C209.607 299.937 238.198 434.24 238.51 435.576c22.759 109.291 107.524 217.942 108.375 219.022 32.363 60.99 31.676 117.988 31.337 127.106 2.308 12.104 7.535 16.956 7.8 17.194z"
				fill="#7C3E0B"
				p-id="4570"
			></path>
			<path
				d="M519.813 933.75c-60.743 0-106.847-29.698-107.524-30.138l-2.069-1.374-1.126-2.196c-9.301-18.2 1.63-66.739 3.918-76.279l18.237 4.358c-5.393 22.539-9 50.992-6.216 61.338 15.243 9.136 96.026 52.53 178.494 1.702 1.666-9.813 4.925-37.261-6.537-55.662l15.893-9.924c18.273 29.277 8.624 71.684 8.222 73.478l-0.879 3.681-3.168 2.051c-33.509 21.678-67.181 28.965-97.245 28.965z"
				fill="#7C3E0B"
				p-id="4571"
			></path>
			<path
				d="M505.348 200.991c-47.669 0-91.311 17.12-125.211 45.491 12.158 6.619 20.507 19.354 20.507 34.175 0 21.578-17.486 39.064-39.064 39.064-11.782 0-22.228-5.328-29.387-13.577-14.081 26.989-22.155 57.612-22.155 90.158 0 107.881 87.438 195.329 195.311 195.329 107.863 0 195.311-87.448 195.311-195.329-0.002-107.872-87.449-195.311-195.312-195.311z"
				fill="#EFCA18"
				p-id="4572"
			></path>
			<path
				d="M505.348 593.975c-108.989 0-197.654-88.674-197.654-197.673 0-32.024 7.543-62.729 22.42-91.238l1.593-3.058 2.252 2.6c7.049 8.121 17.111 12.771 27.621 12.771 20.25 0 36.72-16.47 36.72-36.721 0-13.338-7.388-25.643-19.28-32.115l-3.03-1.648 2.646-2.206c35.475-29.689 80.472-46.04 126.713-46.04 108.98 0 197.654 88.665 197.654 197.654-0.001 108.999-88.675 197.674-197.655 197.674zM332.769 310.172c-13.531 27.007-20.388 55.964-20.388 86.129 0 106.417 86.569 192.985 192.967 192.985s192.968-86.569 192.968-192.985c0-106.398-86.569-192.967-192.968-192.967-44.044 0-86.926 15.188-121.156 42.845 11.673 7.635 18.795 20.553 18.795 34.477 0 22.833-18.576 41.408-41.408 41.408-10.748 0-21.065-4.293-28.81-11.892z"
				fill="#E5C326"
				p-id="4573"
			></path>
			<path
				d="M347.949 320.151s-23.748 33.874-20.617 63.563c0 0 7.818 14.071 15.627-6.244 0 0 12.496-24.993 9.375-46.873l-4.385-10.446z"
				fill="#7C3E0B"
				p-id="4574"
			></path>
			<path
				d="M375.65 279.091m-14.84 0a14.84 14.84 0 1 0 29.68 0 14.84 14.84 0 1 0-29.68 0Z"
				fill="#7C3E0B"
				p-id="4575"
			></path>
		</svg>
		快速开始
	</div>
</template>

<script setup lang="ts">
import CreateDocument from "@/components/component/home/create/CreateDocument.vue";
import CreateFromTemplate from "@/components/component/home/create/CreateFromTemplate.vue";
import CreateKnowledgeBase from "@/components/component/home/create/CreateKnowledgeBase.vue";
import Documents from "@/components/component/home/document/Documents.vue";
import { ref } from "vue";
import {useDocsStore} from '@/store/docs'

const docsStore = useDocsStore()

let isEdit = ref(true);
let toEdit = () => {
	isEdit.value = true;
	docType.value = 'all'
	creater.value = 'all'
	kb.value = 'all'
};
let toScan = () => {
	isEdit.value = false;
	docType.value = 'all'
	creater.value = 'all'
	kb.value = 'all'
};

let docType = ref("all");
let creater = ref("all");
let kb = ref("all");
const selectDocType = (curDocType: string) => {
	docType.value = curDocType;
};
const selectCreater = (curCreater: string) => {
	creater.value = curCreater;
};
const selectKb = (curKb: string) => {
	kb.value = curKb;
};
</script>

<style scoped lang="scss">
#begin {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	p {
		text-align: left;
		width: 94%;
		height: 20px;
		font-size: 20px;
		font-family: "myttf";
		margin: 25px 0;
	}
	#create {
		width: 94%;
		height: 60px;
		display: flex;
		align-items: center;
		flex-direction: row;
	}
	#select {
		height: 50px;
		width: 94%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		#buttons {
			background-color: #efefef;
			height: 38px;
			width: 150px;
			display: flex;
			flex-direction: row;
			border-radius: 8px;
			align-items: center;
			justify-content: center;
		}
		#conditions {
			height: 36px;
			width: 270px;
			display: flex;
			flex-direction: row;
			align-items: center;
			font-size: 14px;
			span {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				width: 33%;
				height: 32px;
				&:hover {
					cursor: pointer;
				}
				.el-icon {
					margin-left: 5px;
				}
			}
		}
	}
	#documents {
		margin-top: 5px;
		width: 94%;
		height: 300px;
	}
}
#quickStart {
	position: absolute;
	top: 85%;
	left: 85%;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #00b96b;
	color: white;
	height: 40px;
	width: 110px;
	border-radius: 20px;
	font-size: 16px;
}

.buttonUnActive {
	width: 72px;
	height: 30px;
	font-size: 14px;
	border-radius: 5px;
	border: 0;
	cursor: pointer;
	background-color: #efefef;
}
.buttonActive {
	width: 72px;
	height: 30px;
	font-size: 14px;
	border-radius: 5px;
	border: 0;
	background-color: white;
	cursor: pointer;
}

.docTypes {
	display: flex;
	flex-direction: column;
	.docType {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 30px;
		color: black;
		&:hover {
			background-color: #f1f1f1;
			cursor: pointer;
		}
		.el-icon {
			margin: 0 10px 0 5px;
		}
		span {
			position: absolute;
			left: 40%;
		}
	}
}

.creaters, .kbs {
	display: flex;
	flex-direction: column;
	color: black;
	.creater, .kb{
		height: 30px;
		display: flex;
		flex-direction: row;
		align-items: center;
		&:hover{
			background-color: #f1f1f1;
			cursor: pointer;
		}
		.el-icon {
			margin: 0 10px 0 5px;
		}
		span{
			position: absolute;
			left: 20%;
		}
	}
}
</style>
