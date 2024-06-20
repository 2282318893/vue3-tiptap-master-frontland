<template>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <div class='prebasic'>
            <el-menu-item index="1">Personal</el-menu-item>
            <el-menu-item index="2">sharedWorking Center</el-menu-item>
            <el-menu-item index="3" disabled>Manager</el-menu-item>
        </div>

        <div class='endbasic'>
            <el-menu-item index="4">{{ wordCount.wordCount+"word" }}</el-menu-item>
            <span></span>
            <el-menu-item index="5" @click="login">{{ userStore.userAccount }}</el-menu-item>
        </div>
    </el-menu>
</template>

<script lang="ts" setup>
    import {
        onMounted,
        ref
    } from 'vue'
    import { useRouter } from "vue-router"
    import { useUserStore } from '../../store/user';
    import { useWordcountStore } from '@/store/wordcount';

    const userStore = useUserStore()
    const wordCount = useWordcountStore()

    const router = useRouter()
    const activeIndex = ref('1')
    const activeIndex2 = ref('1')
    const handleSelect = (key: string, keyPath: string[]) => {
        console.log(key, keyPath)
    }

    const login = () => {
        router.push({
            path:'/login'
        })
    }

</script>

<style scoped>
    span {
        width: 20px;
    }

    .el-menu-demo {
        display: flex;
        justify-content: space-between;
        margin: 0 0;
    }

    .prebasic {
        display: flex;
        flex-direction: row;
    }

    .endbasic {
        display: flex;
        flex-direction: row;
    }
</style>