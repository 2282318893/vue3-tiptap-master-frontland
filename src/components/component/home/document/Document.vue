<template>
	<div id="document1" @mouseover="changeId(id)" @mouseleave="changeId('')">
		<div id="left">
			<el-icon :size="24"><Document /></el-icon>
			<div id="name">{{ name }}</div>
		</div>
		<div id="center">
			<div id="user">{{ owner }} /</div>
			<div id="k">&nbsp{{ knowledge }}</div>
		</div>
		<div id="right">
			<div id="time">{{ time }}</div>
		</div>

		<el-popover placement="bottom-start" :width="150" trigger="click" :show-arrow="false" :popper-style="{'padding': 0, 'margin': 0}">
      <template #reference>
        <el-icon :size="16" v-show="curId == id"><MoreFilled /></el-icon>
      </template>
			<div class="ops">
				<div class="op"><el-icon :size="16"><Star /></el-icon>收藏</div>
				<div class="op"><el-icon :size="16"><DeleteFilled /></el-icon>移除记录</div>
			</div>
    </el-popover>
	</div>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue";
defineProps(["id", "name", "owner", "knowledge", "time", "curId", "changeId"]);
</script>

<style scoped>
#document1 {
	display: flex;
	flex-direction: row;
	width: 100%;
	height: 70px;
	border-bottom: 1px solid #f1f1f1;
	/* background-color: white; */
	align-items: center;
	font-size: 14px;
	&:hover {
		background-color: #fcfcfc;
	}
	#left {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 40%;
		.el-icon {
			margin: 0 15px 0 2px;
		}
		#name {
			cursor: pointer;
		}
	}
	#center {
		width: 40%;
		display: flex;
		flex-direction: row;
		#user,
		#k {
			cursor: pointer;
		}
	}
	#right {
		width: 15%;
	}
	.el-icon {
		&:last-child {
			cursor: pointer;
		}
	}
}
.ops{
	width: 100%;
	height: 60px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	.op{
		width: 100%;
		height: 25px;
		margin: 3px;
		display: flex;
		flex-direction: row;
		align-items: center;
		&:hover{
			cursor: pointer;
			background-color: #f1f1f1;
		}
		.el-icon{
			margin: 0 10px;
		}
	}
}
</style>
