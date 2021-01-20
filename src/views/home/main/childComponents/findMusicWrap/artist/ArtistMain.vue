<template>
  <div class="ArtistMain" @scroll="handleScroll" ref="artistMain">
    <header>
      <div class="seach_con">
        <div class="title">语种：</div>
        <div class="type_con flexL">
          <p v-for="item in areaList" :key="item.type">
            <span
              :class="{checkClass:item.type === searchKey.area}"
              @click="handelAreaChange(item.type)"
            >{{item.name}}</span>
          </p>
        </div>
      </div>
      <div class="seach_con">
        <div class="title">分类：</div>
        <div class="type_con flexL">
          <p v-for="item in artistTypeList" :key="item.type">
            <span
              :class="{checkClass:item.type === searchKey.type}"
              @click="handelSexChange(item.type)"
            >{{item.name}}</span>
          </p>
        </div>
      </div>
      <div class="seach_con">
        <div class="title">筛选：</div>
        <div class="type_con flexL">
          <p
            class="initial"
            v-for="item in initialList"
            :key="item"
            @click="handelInitialChange(item)"
          >
            <span :class="{checkClass:item === searchKey.initial}">{{item | filterInitial}}</span>
          </p>
        </div>
      </div>
    </header>
    <article>
      <div class="con">
        <music-introduce-module
          v-for="item in artistList"
          :key="item.id"
          :musicItem="item"
          width="140"
          height="140"
          :isPlay="false"
          :isPerson="true"
          @click.native="handleArtistDetail(item)"
        ></music-introduce-module>
      </div>
    </article>
  </div>
</template>

<script>
import { fetchArtistListAPI } from "@/network/api/musicApi";
import { RankArtists } from "@/common/pojo.js";
import MusicIntroduceModule from "../personalization/childComponents/MusicIntroduceModule.vue";
export default {
  components: { MusicIntroduceModule },
  data() {
    return {
      more: true,
      curPage: 1,
      searchKey: {
        limit: 100,
        type: -1,
        area: -1,
        initial: -1,
      },
      artistTypeList: [
        { type: -1, name: "全部" },
        { type: 1, name: "男歌手" },
        { type: 2, name: "女歌手" },
        { type: 3, name: "乐队" },
      ],
      areaList: [
        { type: -1, name: "全部" },
        { type: 7, name: "华语" },
        { type: 96, name: "欧美" },
        { type: 8, name: "日本" },
        { type: 16, name: "韩国" },
        { type: 0, name: "其他" },
      ],
      initialList: [
        -1,
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
        0,
      ],
      artistList: [],
      contentOffsetHeight: null,
      initLock: false,
    };
  },
  computed: {
    watachSearchKey() {
      return JSON.stringify(this.searchKey);
    },
  },
  watch: {
    watachSearchKey: {
      deep: true,
      handler(newVal, oldval) {
        this.curPage = 1;
        this._initArtistList();
      },
    },
    artistList(val) {
      if (this.artistList.length === 0) {
        return;
      }
      this.$nextTick(() => {
        let contain = document
          .querySelector("#FindMusicWrap")
          .querySelector(".happy-scroll-container");
        let content = contain.children[0];
        this.contentOffsetHeight = content.offsetHeight;
        this.initLock = false;
      });
    },
  },
  created() {
    this._initArtistList();
  },
  mounted() {
    let contain = document
      .querySelector("#FindMusicWrap")
      .querySelector(".happy-scroll-container");
    contain.addEventListener("scroll", () => {
      this.handleScroll(contain);
    });
  },

  methods: {
    async _initArtistList(offset = 0) {
      if (this.more) {
        let params = this._.cloneDeep(this.searchKey);
        params.offset = offset;
        if (offset === 0) {
          this.artistList = [];
        }
        let result = await fetchArtistListAPI(params);
        this.more = result.more;
        result.artists.forEach((e, i) => {
          this.artistList.push(new RankArtists(e));
        });
      }
    },
    handelSexChange(type) {
      this.searchKey.type = type;
    },
    handelAreaChange(type) {
      this.searchKey.area = type;
    },
    handelInitialChange(type) {
      this.searchKey.initial = type;
    },
    handleScroll(contain) {
      let scrollTop = contain.scrollTop;
      if (this.contentOffsetHeight - scrollTop <= 540 * 2) {
        if (!this.initLock) {
          this.curPage++;
          this.initLock = true;
          this._initArtistList((this.curPage - 1) * this.searchKey.limit);
        }
      }
    },
    handleArtistDetail(item) {
      let id = item.id;
      this.$router.push({
        name: "PersonalizedArtist",
        params: { id },
      });
    },
  },
  filters: {
    filterInitial(value) {
      if (value === -1) {
        return "热门";
      } else if (value === 0) {
        return "#";
      }
      return value.toUpperCase();
    },
  },
};
</script>

<style lang="less" scoped>
.ArtistMain {
  width: 100%;
  overflow: hidden;
  padding: 10px 20px 0;
  header {
    width: 100%;
    color: #676767;
    font-size: 12px;
    padding-right: 30px;
    .seach_con {
      margin-bottom: 20px;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      .title {
        width: 40px;
        color: #373737;
      }
      .type_con {
        flex: 1;
        flex-wrap: wrap;
        p {
          border-right: 1px solid #f2f2f2;
          padding: 0 10px;
          text-align: center;
          span {
            padding: 3px 8px;
            border-radius: 10px;
            &:hover {
              color: #373737;
              cursor: pointer;
            }
            &.checkClass {
              color: #ec4141;
              background-color: #fdf5f5;
              &:hover {
                background-color: #fdeded;
              }
            }
          }
          &:last-child {
            border-right: none;
          }
          &:first-child {
            width: 65px;
          }
          &.initial {
            margin-bottom: 10px;
            width: 100/11%;
          }
        }
      }
    }
  }
  article {
    width: 100%;
    .con {
      display: flex;
      justify-content: space-between;
      align-self: flex-start;
      flex-wrap: wrap;
    }
  }
}
</style>