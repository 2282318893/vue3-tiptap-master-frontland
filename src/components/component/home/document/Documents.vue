<template>
	<el-scrollbar>
		<div id="allDocument">
			<div v-if="props.isEdit" v-for="document in docsStore.editDocuments.filter(doc => docFilter(doc))">
				<Document
					:id="document.id"
					:type="document.type"
					:name="document.name"
					:owner="document.owner"
					:knowledge="document.knowledge"
					:time="document.time"
					:curId="showId"
					:changeId="changeShowId"
				/>
			</div>
			<div v-if="!props.isEdit" v-for="document in docsStore.lookedDocuments.filter(doc => docFilter(doc))">
				<Document
					:id="document.id"
					:type="document.type"
					:name="document.name"
					:owner="document.owner"
					:knowledge="document.knowledge"
					:time="document.time"
					:curId="showId"
					:changeId="changeShowId"
				/>
			</div>
		</div>
	</el-scrollbar>
</template>

<script setup lang="ts">
import Document from "./Document.vue";
import { ref, reactive, defineProps } from "vue";
import {useDocsStore} from '@/store/docs'

const docsStore = useDocsStore()
const props = defineProps({"isEdit": {type: Boolean}, "kb": {type: String}, "creater": {type: String}, "docType": {type: String}})

let showId = ref('')
const changeShowId = (id: string) => {
	showId.value = id;
}

const docFilter = (doc) => {
	if(props.docType == 'all' && props.kb == 'all' && props.creater == 'all'){
		return true;
	}else if(props.docType == 'all' && props.kb == 'all' && props.creater != 'all'){
		return doc.owner == props.creater;
	}else if(props.docType == 'all' && props.kb != 'all' && props.creater == 'all'){
		return doc.knowledge == props.kb;
	}else if(props.docType != 'all' && props.kb == 'all' && props.creater == 'all'){
		return doc.type == props.docType;
	}else if(props.docType == 'all' && props.kb != 'all' && props.creater != 'all'){
		return doc.knowledge == props.kb && doc.owner == props.creater;
	}else if(props.docType != 'all' && props.kb == 'all' && props.creater != 'all'){
		return doc.type == props.docType && doc.owner == props.creater;
	}else if(props.docType != 'all' && props.kb != 'all' && props.creater == 'all'){
		return doc.type == props.docType && doc.knowledge == props.kb;
	}else{
		return doc.type == props.docType && doc.knowledge == props.kb && doc.owner == props.creater;
	}
}

</script>

<style scoped lang="scss">
#allDocument {
	width: 100%;
	height: 100%;
	overflow: auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	div {
		width: 100%;
		height: 70px;
	}
}
</style>
