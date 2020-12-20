<template>
<div>
    <picker @change="handleIndustryChange" :range-key="'label'" :range="sendList">
        <div class="picker"> <text :class="[{'hides': industryHides }]">请选择</text> <text :class="[{'hides': !industryHides}]"> {{sendList[industryIndex].label}} </text></div>
    </picker>
</div>
    
</template>

<script>
export default {
    props: {
        initList: Array
    },
    data(){
        return{
            sendList: this.initList,
            industryIndex: 0,
            industryHides: false,
        }
    },
    methods: {
        handleIndustryChange(e){
            this.industryIndex = e.target.value;
            let indeustryId = this.initList[this.industryIndex].value
            this.$emit("change",{
                id: indeustryId
            })
            this.industryHides = true
        },
    },
}
</script>

<style lang="wxss">
    .hides{
        display: none;
    }
    picker{
        width: 100%;

    }
    .picker{
         /* background: #eee; */
         width: 100%;
         padding: 20rpx;
         box-sizing: border-box;
         color: #666;
    }
</style>

