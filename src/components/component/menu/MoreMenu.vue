<template>
	<div id="container">
		<div id="more"><el-icon><More /></el-icon>更多</div>
	</div>
</template>

<script setup lang='ts'>

</script>

<style scoped lang="scss">
#container {
	height: 100%;
	width: 100%;
	align-items: center;
	justify-content: center;
	margin-bottom: 10px;
	#more{
		height: 30px;
		width: 90%;
		display: flex;
		flex-direction: row;
		border-radius: 5px;
		border: 0;
		background-color: #fafafa;
		text-align: left;
		font-size: 14px;
		align-items: center;
		&:hover{
			cursor: pointer;
			background-color: #eaeaea;
		}
		.el-icon{
			margin: 0 10px 0 5px;
		}
	}
}
</style>