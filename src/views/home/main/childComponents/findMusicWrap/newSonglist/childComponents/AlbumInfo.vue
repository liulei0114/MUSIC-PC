<template>
  <div class="AlbumInfo">
    <header @click="handleAlbumDetail()">
      <img :src="_albumUrl" alt />
      <div class="play">
        <i style="text-align: center; font-size:20px;line-height:40px;margin-left:5px">
          <svg-icon icon-class="play" style="color:#ec4141"></svg-icon>
        </i>
      </div>
      <div class="cipan"></div>
    </header>
    <footer>
      <p>{{albumInfo.name}}</p>
      <p @click="$router.push({name:'PersonalizedArtist',params:{id:albumInfo.artistId}})">{{albumInfo.artistName}}</p>
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    albumInfo: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    _albumUrl() {
      return this.albumInfo.picUrl + "?param=140y140";
    },
  },
  methods: {
    handleAlbumDetail() {
      this.$router.push({
        name: 'PersonalizedAlbum',
        params: { id: this.albumInfo.id },
      });
    },
  },
};
</script>


<style lang="less" scoped>
.AlbumInfo {
  position: relative;
  width: 25%;
  margin-bottom: 20px;
  &:hover {
    cursor: pointer;
    .play {
      opacity: 1;
    }
  }
  header {
    width: 140px;
    height: 140px;
    position: relative;
    .play {
      width: 40px;
      height: 40px;
      position: absolute;
      text-align: center;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background-color: #fff;
      opacity: 0;
      transition: opacity 0.7s;
    }
    .cipan {
      position: absolute;
      width: 20px;
      height: 135px;
      right: -20px;
      top: 3px;
      background-repeat: no-repeat;
      background-image: url("~assets/aside.png");
    }
    img {
      border-radius: 5px;
    }
  }
  footer {
    width: 140px;
    padding-top: 10px;
    p {
      width: 100%;
      color: #373737;
    }
    p:first-child {
      line-height: 20px;
      font-size: 14px;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    p:last-child {
      margin-top: 5px;
      color: #9f9f9f;
      font-size: 12px;
      &:hover {
        color: #676767;
      }
    }
  }
}
</style>