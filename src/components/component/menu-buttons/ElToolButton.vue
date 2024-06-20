<template>
	<template v-for="tool in desserts" :key="tool.name">
		<el-tooltip placement="top" :content="tool.tip">
			<div
				:class="['tools__button', editor.isActive(tool.name) ? 'tool--active' : '']"
				@click="tool.click"
			>
				<component :is="tool.component" style="font-size: 16px; font-weight: 600" />
			</div>
		</el-tooltip>
	</template>
</template>

<script setup>
import { ref, reactive } from "vue";
const props = defineProps(["desserts", "editor"]);
</script>

<style lang="scss" scoped></style>
