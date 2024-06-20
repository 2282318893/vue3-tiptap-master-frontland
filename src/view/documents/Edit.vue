<template>
	<div class="container">
		<EditHeader :editor="editor" :is-full-screen="isFullScreen" />
		<el-scrollbar height="100%" wrap-class="el-scollbar">
			<div class="content-wrap">
				<div class="title">
					<el-text>{{ title }}</el-text>
				</div>
				<div ref="editorRef" v-if="editor" class="editor" :class="[isFullScreen ? 'editor--fullscreen' : '']">
					<editor-content class="editor-code" :editor="editor" />
				</div>
			</div>
			<div class="outline-wrap">
				<Outline :outline="outline" :editorRef="editorRef"/>
			</div>

			<div class="docNum">
				<el-text>{{ dealNum(wordCount.wordCount) }}</el-text
				><span>字</span>
			</div>
		</el-scrollbar>
	</div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount, watch, provide } from "vue";

//编辑器相关
import UniqueId from "tiptap-unique-id";
import { genUUID } from "@/utils/uuid.js";
import Outline from "@/components/component/kb/Outline.vue";
import EditHeader from "@/components/component/kb/EditHeader.vue";
import Highlight from "@tiptap/extension-highlight";
import TiptapUnderline from "@tiptap/extension-underline";
import { useEditor, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Table from "@tiptap/extension-table";
import TableHeader from "@tiptap/extension-table-header";
import { Color } from "@tiptap/extension-color";
import TableRow from "@tiptap/extension-table-row";
import TextStyle from "@tiptap/extension-text-style";
import { lowlight } from "lowlight";

import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
lowlight.registerLanguage("html", html);
lowlight.registerLanguage("css", css);
lowlight.registerLanguage("js", js);
lowlight.registerLanguage("ts", ts);

// 自定义插件
import CodeBlockLights from "@/components/extensions/code-block-light";
import Iframe from "@/components/extensions/iframe";
import Images from "@/components/extensions/image";
import Video from "@/components/extensions/video";
import CustomTableCell from "@/components/extensions/table";
import Indent from "@/components/extensions/indent";

const valueHtml = ref("<p>I’m running Tiptap with Vue.js. 🎉</p><h1>🎉111</h1><h2>222</h2>");
const isFullScreen = ref(false);
const toggleFullscreen = () => {
	isFullScreen.value = !isFullScreen.value;
};
provide("isFullScreen", isFullScreen.value);
provide("toggleFullscreen", toggleFullscreen);

const editor = useEditor({
	content: valueHtml.value,
	extensions: [
		Highlight.configure({
			multicolor: true
		}),
		TiptapUnderline,
		Indent,
		StarterKit,
		Images,
		Iframe,
		Color,
		TextStyle,
		CodeBlockLights.configure({
			lowlight
		}),
		TextAlign.configure({
			types: ["heading", "paragraph"]
		}),
		Link.configure({
			openOnClick: true
		}),
		Table.configure({
			resizable: true
		}),
		TableRow,
		TableHeader,
		CustomTableCell,
		Video,
		UniqueId.configure({
      attributeName: "id",
      types: ["heading"],
      createId: () => genUUID(),
    }),
	],
	autofocus: "end"
});

onBeforeUnmount(() => {
	editor.value?.destroy();
});
//编辑器相关结束

import { useWordcountStore } from "@/store/wordcount";
let editorRef = ref()
let title = ref("11111111111111111111111111111111111111111111111111111111111111111111111111");
let wordCount = useWordcountStore();
const dealNum = doc_num => {
	if (doc_num < 9999999) {
		return doc_num;
	} else {
		let str = doc_num + "";
		return str.substring(0, 5) + "...";
	}
};

// 监听content变化
import usefatherAndSon from "@/hooks/usefatherAndSon";
import { ConsoleSqlOutlined } from "@ant-design/icons-vue";
// 获取文章目录结构
let outline = ref([]);

// Watch for changes in the editor content
watch(
	() => editor.value?.getHTML(),
	(newContent, oldContent) => {
		// console.log('------------------')
		// console.log(oldContent)
		// console.log(newContent)
		// console.log(oldContent == newContent)
		computeWord(newContent);
		// @watch 学一下正则 /<h.*>.*</h.>/g这个报错
		let temp = [...newContent.matchAll(/<h[1-6][^>]*>.*?<\/h[1-6]>/gi)];
		// console.log(temp);
		outline.value = usefatherAndSon(temp ? temp : []);
		// console.log("&&&&", outline.value);
	}
);

const computeWord = newContent => {
	//@watch 获取文本内容以输出
	// console.log(newContent);
	// 创建一个新的DOM解析器
	const parser = new DOMParser();
	// 将HTML字符串解析成一个Document对象
	const doc = parser.parseFromString(newContent, "text/html");
	// 获取所有文本内容
	const textContent = doc.body.textContent;
	// 去除前后空格并计算字符数量
	const textLength = textContent.trim().length;
	// console.log(`纯文本内容: "${textContent.trim()}"`);
	// console.log(`文字数量: ${textLength}`);
	wordCount.wordCount = textLength;
};
</script>

<style scoped>
.container {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	flex-shrink: 0;
	.content-wrap {
		margin-left: 4%;
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-shrink: 0;
		width: 69%;
		margin-top: 10px;
		.title {
			width: 94%;
			height: auto;
			.el-text {
				font-size: 36px;
				line-height: 48px;
				font-weight: bolder;
				color: black;
			}
		}
		.editor {
			width: 100%;
		}
	}
	.outline-wrap {
		position: absolute;
		left: 74%;
		top: 0;
		margin-top: 15px;
		width: 24%;
	}

	.docNum {
		height: 4%;
		width: 100px;
		position: fixed;
		left: 18%;
		top: 96%;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-left: 3px;
		font-size: 10px;
		color: #a1a1a1;
		max-width: 10px;
		.el-text {
			font-size: 10px;
			color: #a1a1a1;
			width: 42px;
		}
		span {
			margin-left: 2px;
		}
	}
}
</style>
