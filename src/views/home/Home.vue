<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners" />
    <home-recommend-view :recommends="recommends" />
    <home-feature-view />
    <tab-control class="tab-control" 
			:titles="['流行', '新款', '精选']" 
			@tabClick="tabClick"/>
		<good-list :goods="showGoods"></good-list>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper.vue";
import HomeRecommendView from "./childComps/HomeRecommendView.vue";
import HomeFeatureView from "./childComps/HomeFeatureView.vue";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl.vue";
import GoodList from 'components/content/goods/GoodList.vue';


import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    HomeRecommendView,
    HomeFeatureView,
    NavBar,
    TabControl,
    GoodList,
  },
  data() {
    return {
      banners: [], //获取请求数据中的banner中的list
      recommends: [], //获取请求数据中的recommend中的list
      goods: {
        //首页商品展示的一些数据，分为三类，没类分为页码和数据数组
        'pop': { page: 0, list: [] },
        'new': { page: 0, list: [] },
        'sell': { page: 0, list: [] },
      },
			currentType:'pop', //当前的类型
    };
  },
	computed:{
		//展示goods中的哪类数据
		showGoods(){
			return this.goods[this.currentType].list;
		}
	},
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();
    //2.请求首页商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  methods: {
		//网络请求相关的方法
    // 1.请求多个数据
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    //2.请求首页商品数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
				this.goods[type].list.push(...res.data.list);
				this.goods[type].page += 1
      });
    },
		//事件监听相关的方法
		//主页监听'流行', '新款', '精选'的切换
		tabClick(index){
			switch(index){
				case 0 :
					this.currentType = 'pop';
					break;
				case 1:
					this.currentType = 'new';
					break;
				case 2:
					this.currentType = 'sell';
					break;
			}
		}
  },
};
</script>

<style scoped>
#home {
  padding-top: 44px;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9999;
}

.tab-control {
  /* 没有达到top:44px 的时候-> position:sticky ,达到之后-> position:fixed*/
  position: sticky;
  top: 44px;
	z-index: 9999;
}
</style>