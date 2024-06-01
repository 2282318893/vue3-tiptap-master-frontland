<template>
	<node-view-wrapper as="div" class="code-block">
		<div class="language">
			<a-select ref="select" v-model:value="selectedLanguage">
				<a-select-option v-for="(language, index) in languages" :value="language" :key="index">{{
					language
				}}</a-select-option>
			</a-select>
		</div>
		<!-- NodeViewContent将可编辑内容添加到节点视图中 -->
		<pre><code><node-view-content /></code></pre>
		<div class = "runButton">
			<el-button @click="running">run</el-button>
		</div>
	</node-view-wrapper>
</template>

<script setup>
import { NodeViewWrapper, nodeViewProps, NodeViewContent } from "@tiptap/vue-3";
import { ref, reactive, computed } from "vue";

const props = defineProps(nodeViewProps);
const languages = ref(props.extension.options.lowlight.listLanguages());

const selectedLanguage = computed({
	get() {
		return props.node.attrs.language;
	},
	set(language) {
		props.updateAttributes({ language });
	}
});

const running = () => {
	//@watch 根据不同语言类型实现代码 selectedLanguage.value当前语言类型
	console.log(selectedLanguage.value)
}
</script>

<style lang="scss" scoped>
.code-block {
	border: 1px solid #eee;
	background-color: #000;
	border-radius: 5px;
	color: #fff;
	padding: 10px 20px;
	.language {
		padding-bottom: 10px;
		::v-deep .ant-select {
			width: 100px;
		}
		::v-deep .ant-select-selector {
			background-color: #fff;
			color: #000;
		}
		::v-deep .ant-select-arrow {
			color: #000;
		}
	}
}

.runButton{
	display: flex;
	justify-content: flex-end;
}
</style>
