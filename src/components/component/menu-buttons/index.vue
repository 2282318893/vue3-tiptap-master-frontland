<template>
	<div class="editor-tools">
		<el-popover
			placement="bottom-start"
			:width="150"
			trigger="click"
			:show-arrow="false"
			:offset="5"
		>
			<template #reference>
				<div class="add">
					<svg
						t="1718255013601"
						class="icon"
						viewBox="0 0 1026 1024"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						p-id="4255"
						width="18"
						height="18"
					>
						<path
							d="M511.17819 1023.449171C232.458621 1030.059121-1.643784 782.185986 0.008703 508.974708 1.661191 236.865089 239.068571-1.64395 516.135653 0.008538c271.55879 1.652488 510.618658 239.059868 508.966171 516.12695C1023.449336 787.694278 787.694443 1031.711609 511.17819 1023.449171zM491.34834 97.505304c-195.544362-1.652488-418.630184 188.383583-394.944528 457.188227 15.974046 181.222803 190.03607 398.249504 459.942373 374.013019 181.773632-16.524876 396.046187-190.586899 371.809703-459.391544C911.080182 278.177278 730.408208 79.327941 491.34834 97.505304z"
							p-id="4256"
							fill="#00b96b"
						></path>
						<path
							d="M560.201988 362.454144c0 27.541459 0.550829 55.082919 0 82.624378-0.550829 15.423217 5.508292 20.38068 20.38068 19.829851 55.082919-0.550829 110.165838 0 165.248757-0.550829 15.974046 0 22.583997 4.406634 21.482338 20.931509-1.101658 18.728192-1.101658 37.456385 0 55.633748 0.550829 14.872388-5.508292 19.279022-19.279022 18.728192-55.082919-0.550829-110.165838 0-165.248757-0.550829-16.524876 0-23.134826 4.957463-22.583997 22.033168 1.101658 54.53209 0 108.51335 0.550829 163.04544 0.550829 17.626534-6.059121 23.134826-22.583997 22.033168-17.075705-1.101658-34.702239-1.101658-51.777944 0-15.974046 1.101658-21.482338-4.957463-21.482338-21.482338 0.550829-53.430431-0.550829-107.411692 0.550829-160.842123 0.550829-20.38068-6.60995-25.888972-25.888972-25.338143-53.430431 1.101658-107.411692 0-160.842123 0.550829-14.872388 0-21.482338-4.406634-20.38068-19.829851 1.101658-18.728192 1.101658-37.456385 0-55.633748-1.101658-15.974046 5.508292-19.829851 20.38068-19.829851 54.53209 0.550829 108.51335-0.550829 163.04544 0.550829 17.626534 0.550829 24.236484-4.406634 23.685655-23.134826-1.101658-54.53209 0-108.51335-0.550829-163.04544 0-16.524876 5.508292-22.033168 21.482338-21.482338 17.626534 1.101658 35.803897 1.101658 53.430431 0 14.872388-0.550829 20.931509 4.406634 20.38068 19.829851C559.651159 306.269567 560.201988 334.361856 560.201988 362.454144z"
							p-id="4257"
							fill="#00b96b"
						></path>
					</svg>
				</div>
			</template>

			<div class="insert1">
				<div class="rowButton"><ImageButton :editor="editor" /></div>
				<div class="rowButton"><VideoButton :editor="editor" /></div>
				<div class="rowButton"><PdfButton :editor="editor" /></div>
			</div>
		</el-popover>

		<!-- <ImageButton :editor="editor" />
		<VideoButton :editor="editor" />
		<PdfButton :editor="editor" /> -->
		<HeaderButton v-model="title" />
		<TableButton :editor="editor" />
		<FontColor :editor="editor" />
		<BgColor :editor="editor" />
		<LinkButton :editor="editor" />
		<ToolButton :desserts="editorTools" :editor="editor" />

		<el-popover placement="bottom-end" trigger="hover" :show-arrow="false" :offset="5">
			<template #reference>
				<el-icon><More /></el-icon>
			</template>

			<div class="more">
				<el-tooltip class="box-item" effect="dark" content="全屏" placement="top">
					<el-icon :size="20" color="black"><FullScreen @click="toggleFullscreen" /></el-icon>
				</el-tooltip>
				<el-tooltip class="box-item" effect="dark" content="重做" placement="top">
					<el-icon :size="20" color="black"
						><RefreshRight @click="editor.chain().focus().redo().run()"
					/></el-icon>
				</el-tooltip>
				<el-tooltip class="box-item" effect="dark" content="撤销" placement="top">
					<el-icon :size="20" color="black"
						><RefreshLeft @click="editor.chain().focus().undo().run()"
					/></el-icon>
				</el-tooltip>
			</div>
		</el-popover>

		<bubble-menu :editor="editor" :tippy-options="{ duration: 100 }" v-if="editor">
			<div class="bubble-menu_wrap" v-if="activeMenu === true">
				<HeaderButton v-model="title" />
				<FontColor :editor="editor" />
				<LinkButton :editor="editor" />
				<ToolButton :desserts="bubbleMenuTools" :editor="editor" />
			</div>
		</bubble-menu>
	</div>
</template>

<script>
import { BubbleMenu } from "@tiptap/vue-3";
import ToolButton from "./tool-button.vue";
import { getMarkRange, Editor } from "@tiptap/core";
import { TextSelection, AllSelection } from "@tiptap/pm/state";

import {
	MinusOutlined,
	StrikethroughOutlined,
	BoldOutlined,
	ItalicOutlined,
	AlignLeftOutlined,
	AlignRightOutlined,
	ExpandOutlined,
	AlignCenterOutlined,
	UnorderedListOutlined,
	DisconnectOutlined,
	LinkOutlined,
	ClearOutlined,
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	OrderedListOutlined,
	UnderlineOutlined,
	UndoOutlined,
	RedoOutlined,
	BlockOutlined,
	CodeOutlined
} from "@ant-design/icons-vue";
import HeaderButton from "./header-button.vue";
import ImageButton from "./image-button.vue";
import VideoButton from "./video-button.vue";
import PdfButton from "./pdf-button.vue";
import TableButton from "./table-button.vue";
import LinkButton from "./link-button.vue";
import FontColor from "./font-color.vue";
import BgColor from "./bg-color.vue";

import { ref, reactive, defineComponent, inject, watch } from "vue";

export default defineComponent({
	name: "MenuButtons",
	props: {
		editor: {
			type: Editor,
			required: true
		}
	},
	setup(props, setupContext) {
		const activeMenu = ref(false);
		const title = ref(0);
		const isFullScreen = inject("isFullScreen");
		const toggleFullscreen = inject("toggleFullscreen");

		const bubbleMenuTools = reactive([
			{
				name: "bold",
				component: BoldOutlined,
				click() {
					props.editor.chain().focus().toggleBold().run();
				},
				tip: "粗体",
				active: false
			},
			{
				name: "strike",
				component: StrikethroughOutlined,
				click() {
					props.editor.chain().focus().toggleStrike().run();
				},
				tip: "删除线",
				active: false
			},
			{
				name: "ClearOutlined",
				component: ClearOutlined,
				tip: "清除格式",
				click() {
					props.editor.chain().focus().clearNodes().unsetAllMarks().run();
				},
				active: false
			}
		]);

		const editorTools = reactive([
			{
				name: "unsetlink",
				component: DisconnectOutlined,
				tip: "取消链接",
				click() {
					props.editor.chain().focus().extendMarkRange("link").unsetLink().run();
				},
				active: false
			},
			{
				name: "underline",
				component: UnderlineOutlined,
				click() {
					props.editor.chain().focus().toggleUnderline().run();
				},
				tip: "下划线",
				active: false
			},
			{
				name: "italic",
				component: ItalicOutlined,
				tip: "斜体",
				click() {
					props.editor.chain().focus().toggleItalic().run();
				},
				active: false
			},
			{
				name: "blockquote",
				component: BlockOutlined,
				click() {
					props.editor.chain().focus().toggleBlockquote().run();
				},
				tip: "引用",
				active: false
			},
			{
				name: "codeBlock",
				component: CodeOutlined,
				click() {
					props.editor.chain().focus().toggleCodeBlock().run();
				},
				tip: "代码块",
				active: false
			},
			{
				name: "left",
				component: AlignLeftOutlined,
				click() {
					props.editor.chain().focus().setTextAlign("left").run();
				},
				tip: "左对齐",
				active: false
			},
			{
				name: "center",
				component: AlignCenterOutlined,
				tip: "居中对齐",
				click() {
					props.editor.chain().focus().setTextAlign("center").run();
				},
				active: false
			},
			{
				name: "right",
				component: AlignRightOutlined,
				tip: "右对齐",
				click() {
					props.editor.chain().focus().setTextAlign("right").run();
				},
				active: false
			},
			{
				name: "bulletList",
				component: UnorderedListOutlined,
				tip: "无序列表",
				click() {
					props.editor.chain().focus().toggleBulletList().run();
				},
				active: false
			},
			{
				name: "orderedList",
				component: OrderedListOutlined,
				tip: "有序列表",
				click() {
					props.editor.chain().focus().toggleOrderedList().run();
				},
				active: false
			},
			{
				name: "MenuUnfoldOutlined",
				component: MenuUnfoldOutlined,
				tip: "缩进",
				click() {
					props.editor.chain().focus().indent().run();
				},
				active: false
			},
			{
				name: "MenuFoldOutlined",
				component: MenuFoldOutlined,
				tip: "取消缩进",
				click() {
					props.editor.chain().focus().outdent().run();
				},
				active: false
			},
			{
				name: "MinusOutlined",
				component: MinusOutlined,
				tip: "水平线",
				click() {
					props.editor.chain().focus().setHorizontalRule().run();
				},
				active: false
			},
			...bubbleMenuTools
		]);

		return {
			title,
			editorTools,
			isFullScreen,
			toggleFullscreen,
			activeMenu
		};
	},
	methods: {
		getCurrentMenuType() {
			if (
				this.editor.state.selection instanceof TextSelection ||
				this.editor.state.selection instanceof AllSelection
			) {
				return true;
			}
			return false;
		}
	},
	watch: {
		"editor.state.selection": function (selection) {
			this.activeMenu = this.getCurrentMenuType();
		},
		title(value) {
			if (value === 0) {
				this.editor.chain().focus().setParagraph().run();
			} else {
				this.editor.chain().focus().toggleHeading({ level: value }).run();
			}
		}
	},
	computed: {},
	components: {
		ToolButton,
		StrikethroughOutlined,
		BubbleMenu,
		HeaderButton,
		ImageButton,
		VideoButton,
		PdfButton,
		TableButton,
		BoldOutlined,
		ItalicOutlined,
		AlignLeftOutlined,
		AlignRightOutlined,
		ExpandOutlined,
		AlignCenterOutlined,
		UnorderedListOutlined,
		DisconnectOutlined,
		LinkOutlined,
		LinkButton,
		ClearOutlined,
		OrderedListOutlined,
		FontColor,
		BgColor
	}
});
</script>

<style lang="scss" scoped>
.editor-tools {
	height: 100%;
	display: flex;
	flex-direction: row;
	flex-shrink: 0;
	border: 0px;
	border-radius: 0;
	margin-bottom: 0;
	// background-color: red;
	.add {
		width: 40px;
		height: 40px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-items: center;
		border-radius: 50%;
		svg {
			display: block;
			margin: auto;
		}
		&:hover {
			cursor: pointer;
			background-color: #f5f7fa;
		}
	}
}
.el-icon {
	height: 40px;
	width: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	&:hover {
		cursor: pointer;
		background-color: #f5f7fa;
	}
}
.more {
	display: flex;
	align-items: center;
	flex-direction: row-reverse;
}

.insert1 {
	display: flex;
	flex-direction: column;
	.rowButton {
		display: flex;
		flex-direction: row;
		align-items: center;
		border-radius: 5px;
		&:hover{
			cursor: pointer;
			background-color: #f5f7fa;
		}
	}
}

.bubble-menu_wrap {
	display: flex;
	border-radius: 3px;
	background-color: #fff;
	padding: 2px 5px;
	box-shadow: 0 0 3px rgba(0, 0, 0, 0.15);
}
</style>
