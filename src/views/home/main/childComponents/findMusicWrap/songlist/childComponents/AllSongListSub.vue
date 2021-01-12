<template>
  <div class="AllSongListSub">
    <header>
      <span>全部菜单</span>
    </header>
    <article>
      <div v-for="category in songlistCategory" :key="category.categoryType" class="category_con">
        <div class="left">
          <img :src="subImg(category.categoryType)" />
          <span>{{category.categoryName}}</span>
        </div>
        <div class="right">
          <div v-for="(item,index) in category.subs" :key="index">
            <span @click="checkSub(item.name)" :class="{curTagClass:item.name === curTag}">
              {{item.name}}
              <i v-if="item.hot" class="hot">
                <svg-icon icon-class="hot"></svg-icon>
              </i>
            </span>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    songlistCategory: {
      type: Array,
      default: () => [],
    },
    curTag: {
      type: String,
      default: "",
    },
  },
  methods: {
    checkSub(name) {
      this.$emit("handleChangeTag", name);
    },
    subImg(type) {
      return require(`@/assets/sub-${type}.png`);
    },
  },
};
</script>

<style lang="less" scoped>
.AllSongListSub {
  position: absolute;
  width: 740px;
  box-shadow: 0px 0px 1px 2px rgba(0, 0, 0, 0.1);
  left: 10px;
  bottom: -730px;
  background-color: #fff;
  z-index: 2;
  color: #373737;
  font-size: 13px;
  header {
    border-bottom: 1px solid #e5e5e5;
    padding: 20px;
    span:hover {
      cursor: pointer;
      color: #ec4141;
    }
  }
  article {
    padding: 10px;
    .category_con {
      width: 100%;
      display: flex;
      margin-bottom: 25px;
      &:last-child {
        margin-bottom: 50px;
      }
      .left {
        width: 100px;
        color: #cfcfcf;
        padding-top: 5px;
        padding-left: 10px;
        img {
          margin-right: 5px;
        }
      }
      .right {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-content: space-between;
        div {
          width: 16.6%;
          border-radius: 5px;
          margin-bottom: 15px;
          span {
            display: inline-block;
            padding: 5px 15px;
            position: relative;
            &.curTagClass {
              background-color: #fdf5f5;
              border-radius: 10px;
              color: #ec4141;
            }
            &:hover {
              color: #ec4141;
              cursor: pointer;
            }
            .hot {
              position: absolute;
              right: -5px;
              color: #ec4141;
              font-size: 30px;
              top: -10px;
            }
          }
        }
      }
    }
  }
}
</style>