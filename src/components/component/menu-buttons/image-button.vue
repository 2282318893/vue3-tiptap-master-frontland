<template>
	<el-popover placement="right-start" :width="150" trigger="hover" :show-arrow="false">
		<template #reference>
			<div class="imgButton">
				<PictureOutlined style="font-size: 16px; font-weight: 600; width: 40px;" />
				<span>图片</span>
			</div>
		</template>
		<ul class="dropdown">
			<li class="dropdown__opeartion" @click="insertRef.showModal()">
				<PaperClipOutlined style="margin-right: 5px" />插入URL
			</li>
			<li class="dropdown__opeartion" @click="uploadRef.showModal()">
				<CloudUploadOutlined style="margin-right: 5px" />上传图片
			</li>
		</ul>
	</el-popover>
	<InsertImage
		ref="insertRef"
		@emitInsert="handleEmit"
		:options="{ title: '插入图片地址', headers }"
	>
	</InsertImage>
	<UploadImage ref="uploadRef" @emitUpload="handleEmit" :options="{ title: '上传图片' }" />
</template>

<script setup>
import { ref, reactive } from "vue";
import { PictureOutlined, CloudUploadOutlined, PaperClipOutlined } from "@ant-design/icons-vue";
import { validateUrl } from "@/utils/pattern.js";
import InsertImage from "./insert-model/index.vue";
import UploadImage from "./upload-model/index.vue";

const props = defineProps(["editor"]);

const headers = [
	{
		formItem: {
			name: "url",
			rules: [{ required: true, validator: validateUrl, trigger: "blur" }]
		},
		component: {
			name: "input",
			placeholder: "URL of Image"
		}
	}
];

const insertRef = ref();
const uploadRef = ref();
const handleEmit = ({ url }) => {
	props.editor.chain().focus().setImage({ src: url }).run();
	uploadRef.value.closeModal();
	insertRef.value.closeModal();
};
</script>

<style lang="scss" scoped>
.imgButton {
	height: 40px;
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
}
.dropdown {
	display: flex;
	flex-direction: column;
	&__opeartion {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 30px;
		cursor: pointer;
		transition: 0.2s;

		&:hover {
			color: #2bc584;
		}
	}
}
</style>
