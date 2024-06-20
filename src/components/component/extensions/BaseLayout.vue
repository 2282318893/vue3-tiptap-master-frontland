<template>
  <Header></Header>
  <div class="wrapper" :class="{ 'dark-mode': darkMode }">
    <h1 class="title">💐 Vue3 + Tiptap 🚀</h1>
    <x-tiptap />
    <div class="save">
      <el-button>save</el-button>
    </div>
    <el-button @click="toggleMode" class="mode-toggle">{{ darkMode ? '浅色模式' : '深色模式' }}</el-button>
  </div>
</template>

<script setup lang="ts">
  import {
    onMounted,
    ref
  } from 'vue';
  import Header from '../../header/header.vue'

  const darkMode = ref(false);

  function toggleMode() {
    darkMode.value = !darkMode.value;
    const htmlElement = document.querySelector('html');
    if (darkMode.value) {
      htmlElement.style.filter = 'invert(1) hue-rotate(180deg)';
      document.body.style.backgroundColor = '#000';
    } else {
      htmlElement.style.filter = 'none';
      document.body.style.backgroundColor = 'initial';
    }
  }

  // 保存文章
  const save =  async () => {

  }

  // 页面加载时引入用户文章
	onMounted(() => {
    // @watch 把用户的第一篇文章展示出来
		
  })
</script>

<style scoped lang="scss">
  html,
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    /* 禁止横向滚动条出现 */
  }

  //保存按钮
  .save {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

  .wrapper {
    .title {
      text-align: center;
      padding: 20px 0;
      font-weight: 600;
      font-size: 22px;
      color: #000;
    }

    margin: 0 auto;
    padding: 60px 20px;
  }

  .dark-mode {
    /* 添加深色模式下的样式 */
    background-color: #fff;
    color: #000;
  }

  .mode-toggle {
    position: fixed;
    bottom: 20px;
    right: 20px;
    //background-color: #72aaab;
    //color: #fff;
    //border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
</style>