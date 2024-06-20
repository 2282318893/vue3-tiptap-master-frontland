<template>
	<div class="card">
		<div class="head">
			<div id="left">
				<el-icon :size="24"><Collection /></el-icon>
				<div id="text">{{ name }}</div>
				<el-icon :size="18"><Lock /></el-icon>
			</div>
			<div id="right">
				<el-icon :size="16"><MoreFilled /></el-icon>
			</div>
		</div>
		<p class="desc">
			{{ desc }}
		</p>
		<div id="info">
			<div class="left2">
				文档 {{ docNum }}
			</div>
			<div class="right2">
				{{ time }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
defineProps(['name', 'desc', 'docNum', 'time'])
</script>

<style scoped lang="scss">
.card {
	height: 170px;
	width: 32%;
	display: flex;
	flex-direction: column;
	align-items: center;
	border: 1px solid #e9e9e9;
	border-radius: 10px;
	.head {
		height: 30px;
		width: 90%;
		margin: 15px 0 10px 0;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		#left {
			width: 85%;
			display: flex;
			flex-direction: row;
			align-items: center;
			overflow-x: auto;
			overflow-y: hidden;
			flex-shrink: 0;
			.el-icon {
				&:first-child {
					margin: 0 0 0 5px;
				}
				&:last-child {
					margin: 0 0 0 3px;
				}
			}
			#text {
				font-size: 18px;
				margin: 0 0px 0 5px;
			}
		}
		#right {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			width: 30px;
			height: 30px;
			flex-shrink: 0;
			border: 1px solid #e9e9e9;
			border-radius: 5px;
		}
	}
	.desc{
		width: 90%;
		height: 70px;
		font-size: 14px;
		white-space: normal;
		word-break: break-all;
		color: #b9b9b9
	}
	#info{
		width: 90%;
		height: 20px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
		.right2{
			width: 35%;
			height: 100%;
			display: flex;
			align-items: center;
		}
	}
}
</style>
