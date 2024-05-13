<template>
	<div class="wrapper" :class="{ 'dark-mode': darkMode }">
		<h1 class="title">💐 Vue3 + Tiptap 🚀</h1>
		<x-tiptap />
    <button @click="toggleMode" class="mode-toggle">{{ darkMode ? '浅色模式' : '深色模式' }}</button>
	</div>
</template>

<script setup>
import { ref } from 'vue';

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

</script>

<style scoped lang="scss">
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden; /* 禁止横向滚动条出现 */
}

.wrapper {
	.title {
		text-align: center;
		padding: 20px 0;
		font-weight: 600;
    font-size: 22px;
		color: #72aaab;
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
  background-color: #72aaab;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}
</style>

