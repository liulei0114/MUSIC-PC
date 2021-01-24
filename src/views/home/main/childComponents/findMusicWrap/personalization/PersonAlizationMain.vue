<template>
  <div id="PersonAlizationWrap" v-mask-loading="{loading:loading}">
    <div class="bannerCon">
      <swiper :bannerList="bannerList"></swiper>
    </div>
    <!-- 推荐歌单 -->
    <div class="privateRecommend">
      <div class="headLine flexL">
        <h2>推荐歌单</h2>
        <i style="font-size:20px;color:#333;margin-left:5px">
          <svg-icon icon-class="arrow-right"></svg-icon>
        </i>
      </div>
      <div class="body">
        <div class="first">
          <div class="head">
            <i class="icon">
              <svg-icon icon-class="rili"></svg-icon>
            </i>
            <span class="date">{{curDate}}</span>
          </div>
          <div class="title">每日歌曲推荐</div>
        </div>
        <music-introduce-module
          v-for="item in personalizedList"
          :key="item.id"
          :musicItem="item"
          :isCopyWriter="false"
          @click.native="handlePersonalizedSongList(item.id)"
        ></music-introduce-module>
      </div>
    </div>
    <!-- 独家放送 -->
    <div class="privatecontent">
      <div class="headLine flexL">
        <h2>独家放送</h2>
        <i style="font-size:20px;color:#333;margin-left:5px">
          <svg-icon icon-class="arrow-right"></svg-icon>
        </i>
      </div>
      <div class="body">
        <music-introduce-module
          v-for="item in privatecontentList"
          :key="item.id"
          :musicItem="item"
          width="240"
          height="135"
          :isPlay="false"
          :isCopyWriter="false"
        ></music-introduce-module>
      </div>
    </div>
    <!-- 最新音乐 -->
    <div class="privateNewSong" style="margin-bottom:20px">
      <div class="headLine flexL">
        <h2>最新音乐</h2>
        <i style="font-size:20px;color:#333;margin-left:5px">
          <svg-icon icon-class="arrow-right"></svg-icon>
        </i>
      </div>
      <div class="body">
        <div class="new_song_con">
          <private-new-song-detail
            v-for="item in privateNewSongList"
            :key="item.id"
            :newSong="item"
          ></private-new-song-detail>
        </div>
      </div>
    </div>
    <!-- 推荐MV -->
    <div class="privateMV">
      <div class="headLine flexL">
        <h2>推荐MV</h2>
        <i style="font-size:20px;color:#333;margin-left:5px">
          <svg-icon icon-class="arrow-right"></svg-icon>
        </i>
      </div>
      <div class="body">
        <music-introduce-module
          v-for="item in privateMVList"
          :key="item.id"
          :musicItem="item"
          width="240"
          height="135"
          :isPlay="false"
          :isCopyWriter="true"
        ></music-introduce-module>
      </div>
    </div>
    <!-- 推荐电台 -->
    <div class="privateDJ">
      <div class="headLine flexL">
        <h2>推荐电台</h2>
        <i style="font-size:20px;color:#333;margin-left:5px">
          <svg-icon icon-class="arrow-right"></svg-icon>
        </i>
      </div>
      <div class="body">
        <music-introduce-module
          v-for="item in privateDJList"
          :key="item.id"
          :musicItem="item"
          :isPlay="false"
          :isImgBottom="true"
          :isScale="true"
        >
          <span slot="imgBottom">{{item.copywriter}}</span>
        </music-introduce-module>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from '@/components/swiper/Swiper.vue'
import {
  fetchBannerAPI,
  fetchPersonalizedAPI,
  fetchPrivatecontentAPI,
  fetchPrivateNewSongAPI,
  fetchPrivateMVAPI,
  fetchPrivateDjAPI,
} from '@/network/api/musicApi'
import {
  Banner,
  Personalized,
  Privatecontent,
  PrivateNewSong,
  PrivateMV,
  PrivateDJ,
} from '@/common/pojo'
import MusicIntroduceModule from './childComponents/MusicIntroduceModule.vue'
import PrivateNewSongDetail from './childComponents/PrivateNewSongDetail'

export default {
  data() {
    return {
      bannerList: [],
      personalizedList: [],
      privatecontentList: [],
      privateNewSongList: [],
      privateMVList: [],
      privateDJList: [],
      loading: 'on',
      loadingStatus: [],
    }
  },
  props: {},
  computed: {
    curDate() {
      return this.$moment().format('DD')
    },
  },
  created() {
    this._initBanner()
    this._initPersonalized()
    this._initPrivatecontent()
    this._initPrivateNewSong()
    this._initPrivateMV()
    this._initPrivateDJ()
  },
  watch: {
    loadingStatus(newValue) {
      this.$nextTick(() => {
        if (newValue.length === 6) {
          this.loading = 'off'
        }
      })
    },
  },
  methods: {
    async _initBanner() {
      let result = await fetchBannerAPI()
      result.banners.forEach((e, i) => {
        this.bannerList.push(new Banner(e))
      })
      this.loadingStatus.push(true)
    },
    async _initPersonalized() {
      let data = await fetchPersonalizedAPI()
      data.result.forEach((e, i) => {
        this.personalizedList.push(new Personalized(e))
      })
      this.loadingStatus.push(true)
    },
    async _initPrivatecontent() {
      let data = await fetchPrivatecontentAPI()
      data.result.forEach((e, i) => {
        this.privatecontentList.push(new Privatecontent(e))
      })
      this.loadingStatus.push(true)
    },
    async _initPrivateNewSong() {
      let data = await fetchPrivateNewSongAPI()
      data.result.forEach((e, i) => {
        this.privateNewSongList.push(new PrivateNewSong(e))
      })
      this.loadingStatus.push(true)
    },
    async _initPrivateMV() {
      let data = await fetchPrivateMVAPI()
      data.result.forEach((e, i) => {
        if (i < 3) {
          this.privateMVList.push(new PrivateMV(e))
        }
      })
      this.loadingStatus.push(true)
    },
    async _initPrivateDJ() {
      let result = await fetchPrivateDjAPI()
      result.data.forEach((e, i) => {
        this.privateDJList.push(new PrivateDJ(e))
      })
      this.loadingStatus.push(true)
    },
    handlePersonalizedSongList(id) {
      this.$router.push({ name: 'PersonalizedSongList', params: { id } })
    },
  },
  components: {
    Swiper,
    MusicIntroduceModule,
    PrivateNewSongDetail,
  },
}
</script>
<style lang="less" scoped>
#PersonAlizationWrap {
  width: 100%;
  padding: 10px 20px 0;
  .bannerCon {
    height: 250px;
  }
  .privateRecommend,
  .privatecontent,
  .privateNewSong,
  .privateMV,
  .privateDJ {
    width: 100%;
    .headLine {
      color: #333;
      margin-bottom: 20px;
    }
    .body {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      .first {
        margin-bottom: 20px;
        color: #333;
        .head {
          width: 140px;
          height: 140px;
          background-color: #38667b;
          position: relative;
          color: #fff;
          border-radius: 5px;
          .icon {
            font-size: 70px;
            text-align: center;
            display: block;
            position: absolute;
            left: 50%;
            top: 45%;
            transform: translate(-50%, -50%);
          }
          .date {
            font-size: 25px;
            display: block;
            position: absolute;
            left: 50%;
            top: 53%;
            transform: translate(-50%, -50%);
          }
        }
        .title {
          margin-top: 5px;
          font-size: 14px;
          height: 40px;
        }
      }
      .new_song_con {
        width: 100%;
        height: 250px;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        justify-content: space-between;
        align-content: space-between;
      }
    }
  }
}
</style>