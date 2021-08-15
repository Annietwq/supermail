import { debounce } from "common/utils";
import BackTop from "components/content/backTop/BackTop.vue";
import { BACK_POSITION } from "common/const";

export const itemListenerMixin = {
    data() {
        return {
            itemImageListener: null, //监听图片加载
            newRefresh: null,
        }
    },
    mounted() {
        // 1.监听GoodsListItem中的图片加载（通过总线事件）
        //防抖包装
        this.newRefresh = debounce(this.$refs.scroll.refresh, 500);
        // 对监听的事件进行保存
        this.itemImageListener = () => {
            this.newRefresh();
        }
        this.$bus.$on("itemImageLoad", this.itemImageListener);
    },
}

//回到顶部
export const backTopMixin = {
    components: {
        BackTop,
    },
    data() {
        return {
            isShow: false, //是否显示回到顶部
        }
    },
    methods: {
        backTop() {
            //在500ms之类回到顶部 调用Scroll里面的方法
            this.$refs.scroll.scrollTo(0, 0, 500);
        },
        listenShowBackTop(position) {
            this.isShow = -position.y > BACK_POSITION;
        }
    },
}