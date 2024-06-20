<template>
	<div class="header">
		<div class="info">
			<div class="left">
				<el-text :truncated="true">{{ docName }}</el-text>
				<el-icon><Lock /></el-icon>
				<el-text :truncated="true">{{ message }}</el-text>
				<el-icon><MostlyCloudy /></el-icon>
			</div>
			<div class="right">
				<el-tooltip :show-arrow="false" :offset="5" effect="dark" content="收藏" placement="bottom">
					<el-icon :size="20"><Star /></el-icon>
				</el-tooltip>
				<el-tooltip :show-arrow="false" :offset="5" effect="dark" content="分享" placement="bottom">
					<el-icon :size="20"><User /></el-icon>
				</el-tooltip>
				<el-icon :size="20"><DataBoard /></el-icon>
				<div class="button">分享</div>
				<div class="button">更新</div>
			</div>
		</div>
	</div>

	<div id="tableBody"></div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount, defineProps } from "vue";
let docName = ref("11111111111111111111111111111111111111111111111111111111111111111111111");
let message = ref("已加载最新版本");

//表格相关
import "@univerjs/design/lib/index.css";
import "@univerjs/ui/lib/index.css";
import "@univerjs/docs-ui/lib/index.css";
import "@univerjs/sheets-ui/lib/index.css";
import "@univerjs/sheets-formula/lib/index.css";
import '@univerjs-pro/collaboration-client/lib/index.css'
import '@univerjs-pro/live-share/lib/index.css'
import '@univerjs-pro/sheets-print/lib/index.css'
import '@univerjs-pro/sheets-exchange-client/lib/index.css'
 
import { LocaleType, Tools, Univer, UniverInstanceType, IAuthzIoService, IUndoRedoService, LogLevel } from "@univerjs/core";
import { defaultTheme } from "@univerjs/design";
 
import { UniverFormulaEnginePlugin } from "@univerjs/engine-formula";
import { UniverRenderEnginePlugin } from "@univerjs/engine-render";
 
import { UniverUIPlugin } from "@univerjs/ui";
 
import { UniverDocsPlugin } from "@univerjs/docs";
import { UniverDocsUIPlugin } from "@univerjs/docs-ui";
 
import { UniverSheetsPlugin } from "@univerjs/sheets";
import { UniverSheetsFormulaPlugin } from "@univerjs/sheets-formula";
import { UniverSheetsUIPlugin } from "@univerjs/sheets-ui";
import { UniverCollaborationPlugin } from '@univerjs-pro/collaboration';
import { UniverCollaborationClientPlugin } from '@univerjs-pro/collaboration-client';
import { UniverLiveSharePlugin } from '@univerjs-pro/live-share';
import { UniverSheetsConditionalFormattingUIPlugin } from '@univerjs/sheets-conditional-formatting-ui';
import { UniverSheetsPrintPlugin } from '@univerjs-pro/sheets-print';
import { UniverSheetsExchangeClientPlugin } from '@univerjs-pro/sheets-exchange-client';
 
import DesignZhCN from '@univerjs/design/locale/zh-CN';
import UIZhCN from '@univerjs/ui/locale/zh-CN';
import DocsUIZhCN from '@univerjs/docs-ui/locale/zh-CN';
import SheetsZhCN from '@univerjs/sheets/locale/zh-CN';
import SheetsUIZhCN from '@univerjs/sheets-ui/locale/zh-CN';


const univer = new Univer({
  theme: defaultTheme,
  locale: LocaleType.ZH_CN,
  locales: {
    [LocaleType.ZH_CN]: Tools.deepMerge(
      SheetsZhCN,
      DocsUIZhCN,
      SheetsUIZhCN,
      UIZhCN,
      DesignZhCN,
    ),
  },
	override: [
		[IAuthzIoService, null],
		[IUndoRedoService, null],
	],
});
 
univer.registerPlugin(UniverRenderEnginePlugin);
univer.registerPlugin(UniverFormulaEnginePlugin);
 
univer.registerPlugin(UniverUIPlugin, {
  container: 'tableBody',
});
 
univer.registerPlugin(UniverDocsPlugin, {
  hasScroll: false,
});
univer.registerPlugin(UniverDocsUIPlugin);
 
univer.registerPlugin(UniverSheetsPlugin);
univer.registerPlugin(UniverSheetsUIPlugin);
univer.registerPlugin(UniverSheetsFormulaPlugin);

// collaboration plugins
univer.registerPlugin(UniverCollaborationPlugin);
univer.registerPlugin(UniverCollaborationClientPlugin);
univer.registerPlugin(UniverLiveSharePlugin);
 
// print
univer.registerPlugin(UniverSheetsPrintPlugin);
// exchange
univer.registerPlugin(UniverSheetsExchangeClientPlugin);

//去掉的内容
//univer.createUnit(UniverInstanceType.UNIVER_SHEET, {});
const url = new URL(window.location.href)
const unit = url.searchParams.get('unit')
if (unit) {
  // 等待协作插件加载数据
} else {
  // 创建一个新的表格
  fetch(`/universer-api/snapshot/${UniverInstanceType.UNIVER_SHEET}/unit/-/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: UniverInstanceType.UNIVER_SHEET, // instance type
      name: 'New Sheet By Univer', // sheet name
      creator: 'user',  // creator name
    }),
  }).then((response) => {
    if (!response.ok) {
      throw new Error('create unit failed')
    }

    return response.json()
  }).then((data) => {
    if (!data.unitID) {
      throw new Error('create unit failed')
    }

    url.searchParams.set('unit', data.unitID)
    url.searchParams.set('type', String(UniverInstanceType.UNIVER_SHEET))
    window.location.href = url.toString()
  }).catch((error) => {
    console.error(error)
  })
}
</script>

<style scoped lang="scss">
.header {
	width: 100%;
	height: 9%;
	flex-shrink: 0;
	display: flex;
	flex-direction: column;
	.info {
		width: 100%;
		height: 100%;
		flex-shrink: 0;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #f1f1f1;
		.left {
			display: flex;
			flex-direction: row;
			align-items: center;
			height: 40px;
			color: #717171;
			.el-text {
				margin: 0 5px 0 20px;
				font-size: 14px;
				max-width: 200px;
			}
		}
		.right {
			display: flex;
			flex-direction: row;
			align-items: center;
			height: 40px;
			.el-icon {
				margin-right: 15px;
				width: 30px;
				height: 30px;
				border-radius: 5px;
				&:hover {
					background-color: #f1f1f1;
					cursor: pointer;
				}
			}
			.button {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				width: 60px;
				height: 35px;
				margin-right: 10px;
				border-radius: 5px;
				font-size: 14px;
				border: 1px solid;
				background-color: white;
				border: 1px solid #e1e1e1;
				&:hover {
					color: #00b96b;
					border-color: #00b96b;
					cursor: pointer;
				}
			}
		}
	}
}
#tableBody{
	width: 100%;
	height: 91%;
}
</style>
