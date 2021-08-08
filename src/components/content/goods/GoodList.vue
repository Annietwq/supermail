<template>
	<div class="goods">
		<goods-list-item v-for="(item,index) in goods" :key="index" :goods-item="item"/>
	</div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue';

export default {
	name:"GoodList",
  components: { 
		GoodsListItem 
	},
	props:{
		goods:{
			type:Array,
			default(){
				return [];
			}
		}
	}
}
</script>

<style scoped>
.goods{
	display: flex;
	/* 根据子元素的宽度自动换行 */
	flex-wrap: wrap;
	justify-content: space-around;
	padding: 2px;
}

</style>