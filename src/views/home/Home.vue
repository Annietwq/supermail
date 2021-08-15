<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
		<tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl1"
				class="tab-control"
				v-show="isTabFixed"
      />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <home-recommend-view :recommends="recommends" />
      <home-feature-view />
      <!-- 下面删掉了一个class="tab-control" -->
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      />
      <good-list :goods="showGoods"></good-list>
    </scroll>
    <back-top @click.native="backTop" v-show="isShow" />
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper.vue";
import HomeRecommendView from "./childComps/HomeRecommendView.vue";
import HomeFeatureView from "./childComps/HomeFeatureView.vue";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl.vue";
import GoodList from "components/content/goods/GoodList.vue";
import Scroll from "components/common/scroll/Scroll";

import { getHomeMultidata, getHomeGoods } from "network/home";
import {itemListenerMixin,backTopMixin} from "common/mixin";


export default {
  name: "Home",
  components: {
    HomeSwiper,
    HomeRecommendView,
    HomeFeatureView,
    NavBar,
    TabControl,
    GoodList,
    Scroll,
  },
	mixins:[
		itemListenerMixin,backTopMixin
	],
  data() {
    return {
      banners: [], //获取请求数据中的banner中的list
      recommends: [], //获取请求数据中的recommend中的list
      goods: {
        //首页商品展示的一些数据，分为三类，没类分为页码和数据数组
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop", //当前的类型
      tabOffsetTop: 0, //距离顶部的距离
			isTabFixed:false, //tabControl是否吸顶
			saveY:0, //保存离开时的位置信息
    };
  },
  computed: {
    //展示goods中的哪类数据
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();
    //2.请求首页商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
  },
	destroyed() {
	},
	activated() {
		this.$refs.scroll.scrollTo(0,this.saveY,0);
		this.$refs.scroll.refresh();
	},
	deactivated() {
		//1.保存Y值
		this.saveY = this.$refs.scroll.getScrollY();
		// 2.取消全局事件的监听
		this.$bus.$off('itemImageLoad',this.itemImageListener);
	},
  methods: {
    //网络请求相关的方法
    // 1.请求多个数据
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    //2.请求首页商品数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        //完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    },
    //事件监听相关的方法
    //主页监听'流行', '新款', '精选'的切换
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
			//让tabControl保持一致
			this.$refs.tabControl1.currentIndex = index;
			this.$refs.tabControl2.currentIndex = index;
    },
    //监听内容滚动位置
    contentScroll(position) {
      //position.y是负值
			//1.判断BackTop是否显示
			this.listenShowBackTop(position);
			// 2.决定tabControl是否吸顶（position：fixed）
			this.isTabFixed = (-position.y) > this.tabOffsetTop;
    },
    //上拉加载更多
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    //监听轮播图的加载
    swiperImageLoad() {
      // 获取tabControl的offsetTop
      // 所有的组件都有一个属性$el：用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  /* vh (view height)视口 */
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
	/* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9999; */
}

/* .tab-control { */
/* 没有达到top:44px 的时候-> position:sticky ,达到之后-> position:fixed*/
/* position: sticky; */
/* top: 44px; */
/* position: inherit; */
/* z-index: 9999; */
/* } */

.content {
  /* height: 300px; */
  position: absolute;
  overflow: hidden;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
/* .content {
	height: calc(100% - 93px);
	overflow: hidden;
	margin-top: 44px;
} */

.tab-control {
	position: relative;
	z-index: 9;
}

</style>