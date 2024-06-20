<script lang="ts" setup>
import foldItem from './foldItem.vue'   //导入自己
defineProps({
  item: {
    type: Object,
    default: () => ({})
  }
})
function scrollToItem(item){ 
  
}
</script>
<template>
  <!--  如果有孩子，就渲染成sub-menu（折叠item）-->
  <template v-if="item.children.length">
    <el-sub-menu :index="item.title">
      <template #title>
        <div class="title" v-html="item.title"></div>
      </template>
      <fold-item
        v-for="i in item.children"
        :key="i.title"
        :item="i"
      ></fold-item>
    </el-sub-menu>
  </template>
  <!--  否则就渲染成menu-item-->
  <template v-else>
    <el-menu-item :index="item.title" @click="scrollToItem(item)">
      <template #title>
        <div class="title" v-html="item.title"></div>
      </template>
    </el-menu-item>
  </template>
</template>
<style lang="less" scoped>
.title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

::v-deep.el-menu-item {
  width: 100%;
  line-height: 30px;
  height: 30px;
}
::v-deep.el-sub-menu {
  width: 100%;
}
::v-deep .el-sub-menu__title {
  height: 30px;
  line-height: 30px;
}
</style>
