<template>
  <!-- ref/children -->
	<!-- ref不仅可以绑定子组件还可以绑定在普通元素上 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
	props:{
		probeType:{
			type:Number,
			default:0
		},
		pullUpLoad:{
			type:Boolean,
			default:false
		}
	},
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
		// 1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
			//内部事件的点击
			click:true,
			probeType:this.probeType,
			pullUpLoad:this.pullUpLoad,
		});
		// 2.监听滚动的位置
		if(this.probeType===2||this.probeType===3){
			this.scroll.on('scroll',(position) => {
			this.$emit('scroll',position);
		});
		}
		// 3.监听scroll滚动到底部
		if(this.pullUpLoad){
			this.scroll.on('pullingUp',() => {
				this.$emit('pullingUp');
			})
		}
  },
	methods: {
		//回到..方法
		scrollTo(x,y,time=300){
			this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x,y,time);
		},
		//刷新
		refresh(){
			this.scroll && this.scroll.refresh && this.scroll.refresh();
		},
		//完成上拉加载更多
		finishPullUp(){
			this.scroll && this.scroll.finishPullUp && this.scroll.finishPullUp();
		},
		//拿到页面的y值
		getScrollY(){
			return this.scroll ? this.scroll.y : 0;
		}
	},
};
</script>

<style>
</style>