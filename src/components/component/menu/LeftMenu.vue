<template>
	<div id="container">
		<div id="upper">
			<div id="basic">
				<el-row>
					<div id="left">
						<img src="/facio.png" alt="" id="logo" @click="router.push('/home/begin')" />
						<div>语雀</div>
						<el-icon>
							<ArrowDown />
						</el-icon>
					</div>
					<div id="right">
						<el-tooltip
							class="box-item"
							effect="dark"
							content="消息中心"
							placement="bottom"
							:show-arrow="false"
							:offset="8"
							><el-icon style="cursor: pointer">
								<Bell /> </el-icon
						></el-tooltip>
						<el-avatar :size="28" :src="'/facio.png'" style="cursor: pointer" />
					</div>
				</el-row>
				<el-row>
					<el-button type="primary" :icon="Search"
						>搜索&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ctrl J</el-button
					>

					<el-popover placement="bottom-start" :width="150" trigger="hover" :show-arrow="false">
						<template #reference>
							<button id="add">+</button>
						</template>

						<div class="createTip">
							<div class="tip">
								<el-icon :size="16"><Notebook /></el-icon>文档
							</div>
							<div class="tip">
								<el-icon :size="16"><Tickets /></el-icon>表格
							</div>
							<div class="tip">
								<el-icon :size="16"><DataBoard /></el-icon>画板
							</div>
							<span></span>
							<div class="tip">
								<el-icon :size="16"><DataBoard /></el-icon>知识库
							</div>
							<span></span>
							<div class="tip">
								<el-icon :size="16"><UploadFilled /></el-icon>从模板新建
							</div>
							<div class="tip">
								<el-icon :size="16"><UploadFilled /></el-icon>导入
							</div>
						</div>
					</el-popover>
					
				</el-row>
			</div>
			<div id="menu">
				<Menus />
			</div>
			<div id="knowlegeBase">
				<KnowledgeBase />
			</div>
		</div>
		<div id="more">
			<MoreMenu />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import Menus from "./Menus.vue";
import KnowledgeBase from "./KnowledgeBase.vue";
import MoreMenu from "./MoreMenu.vue";
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<style scoped lang="scss">
#container {
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	#upper {
		display: flex;
		flex-direction: column;
		justify-items: start;
		#basic {
			height: 100px;

			.el-row {
				height: 50%;

				&:first-child {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-items: center;

					div {
						font-family: "myttf";
						display: flex;
						flex-direction: row;
						align-items: center;

						&:first-child {
							margin-left: 5%;

							img {
								width: 32px;
								height: 32px;
								border-radius: 20%;
								cursor: pointer;
							}

							div {
								font-family: "myttf";
								font-size: 16px;
								margin-left: 5px;
							}

							.el-icon {
								margin-left: 5px;
							}
						}

						&:last-child {
							.el-icon {
								margin-right: 10px;
							}

							margin-right: 5%;
						}
					}
				}

				&:last-child {
					display: flex;
					flex-direction: row;
					align-items: center;
					justify-content: space-between;

					.el-button {
						margin-left: 5%;
						height: 30px;
						width: 150px;
						background-color: #eff0f0;
						color: #d7d5d5;
						border: 0;
						border-radius: 5px;
					}

					#add {
						font-weight: bolder;
						text-align: center;
						font-size: 20px;
						margin-right: 5%;
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
			}
		}

		#menu {
			height: 150px;
			display: flex;
			flex-direction: column;
			justify-items: start;
		}

		#knowlegeBase {
			margin-top: 10px;
			height: 200px;
		}
	}

	#more {
		margin-top: 60px;
		height: 30px;
		margin-bottom: 10px;
	}
}

.createTip {
	display: flex;
	flex-direction: column;
	flex-shrink: 0;
	align-items: center;
	color: black;
	font-size: 14px;
	.tip {
		width: 94%;
		height: 35px;
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-shrink: 0;
		background-color: white;
		margin-bottom: 2px;
		border-radius: 10px;
		&:hover{
			background-color: #e1e1e1;
			cursor: pointer;
		}
	}
	span{
		border: 1px solid #e9e9e9;
		width: 94%;
		height: 0;
		margin: 5px 0;
	}
	.el-icon{
		margin: 0 10px;
	}
}
</style>
