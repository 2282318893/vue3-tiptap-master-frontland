<template>
	<el-popover placement="right-start" :width="150" trigger="hover" :show-arrow="false">
		<template #reference>
			<div class="pdfButton">
				<FilePdfOutlined style="font-size: 16px; font-weight: 600; width: 40px;" />
				<span>PDF</span>
			</div>
		</template>
		<ul class="dropdown">
			<li class="dropdown__opeartion" @click="insertRef.showModal()">
				<DisconnectOutlined style="margin-right: 5px" />插入网络PDF
			</li>
			<li class="dropdown__opeartion" @click="insertLocalPdf">
				<CloudUploadOutlined style="margin-right: 5px" />上传本地PDF
			</li>
		</ul>
	</el-popover>
	<InsertPDF
		ref="insertRef"
		@emitInsert="handleEmit"
		:options="{ title: '插入PDF地址', placeholder: 'URL of PDF', headers }"
	>
		<a-form-item name="type" label="插入类型">
			<a-radio-group v-model:value="type" button-style="solid">
				<a-radio-button :value="1">附件形式</a-radio-button>
				<a-radio-button :value="2">内容形式</a-radio-button>
			</a-radio-group>
		</a-form-item>
	</InsertPDF>
	<UploadPDF ref="uploadRef" @emitUpload="handleEmit" :options="{ title: '上传PDF' }"> </UploadPDF>
</template>

<script setup>
import { ref, reactive } from "vue";
import { validateUrl } from "@/utils/pattern.js";
import { FilePdfOutlined, CloudUploadOutlined, DisconnectOutlined } from "@ant-design/icons-vue";
import InsertPDF from "./insert-model/index.vue";
import UploadPDF from "./upload-model/index.vue";

const emit = defineEmits(["emitPdf"]);
const props = defineProps(["editor"]);

const insertRef = ref();
const uploadRef = ref();

const headers = [
	{
		formItem: {
			name: "url",
			rules: [{ required: true, validator: validateUrl, trigger: "blur" }]
		},
		component: {
			name: "input",
			placeholder: "URL of PDF"
		}
	}
];

const type = ref(1);
const handleEmit = forms => {
	const { url } = forms;
	if (type.value === 1) {
		props.editor.commands.insertContent({
			type: "text",
			text: `附件:${url}`,
			marks: [
				{
					type: "link",
					attrs: {
						href: url
					}
				}
			]
		});
	}
	if (type.value === 2) {
		props.editor.chain().focus().setIframe({ src: url }).run();
	}
	uploadRef.value.closeModal();
	insertRef.value.closeModal();
};

const insertLocalPdf = () => {
	type.value = 2;
	uploadRef.value.showModal();
};
</script>

<style lang="scss" scoped>
.pdfButton{
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
