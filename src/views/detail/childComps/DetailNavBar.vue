<template>
	<div class="detail-nav-bar">
		<nav-bar>
			<div slot="left" class="back" @click="backClick">
				<img src="~assets/img/common/back.svg">
			</div>
			<div slot="center" class="title">
				<div v-for="(item,index) in titles" 
					:key="index" 
					class="title-item"
					:class="{active:index === currentIndex}"
					@click="titleClick(index)"
				>
					{{item}}
				</div>
			</div>
		</nav-bar>
	</div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
	name:"DetailNavBar",
	components: {
    NavBar,
  },
	data(){
		return {
			titles:['商品','参数','评论','推荐'],
			currentIndex:0,
		}
	},
	methods: {
		titleClick(index){
			this.currentIndex = index;
			this.$emit('titleClick',index);
		},
		backClick(){
			this.$router.back();
		}
	},
}
</script>

<style scoped>
.detail-nav-bar .title {
	display: flex;
	font-size: 13px;
}
.detail-nav-bar .title-item{
	flex: 1;
}
.detail-nav-bar .active{
	color: var(--color-high-text);
}
.detail-nav-bar .back img{
	margin-top: 12px;
	margin-left: 5px;
}
</style>