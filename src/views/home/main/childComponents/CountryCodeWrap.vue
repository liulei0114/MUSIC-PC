<template>
  <div id="CountryCodeWrap" :style="{width:width,height:height}">
    <ul>
      <li
        v-for="(item,index) in countryList"
        :key="index"
        class="myitem"
        @click="handleCountryCheck(item.code,index)"
        :class="{isCheck:index === checkIndex}"
      >
        <span class="flag-icon" :class="flagIcon(item.locale)"></span>
        <span>{{item.zh}}</span>
        <span>+{{item.code}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { fetchCountryListApi } from "@/network/api/musicApi.js";
export default {
  data() {
    return {
      countryList: [],
      checkIndex:0
    };
  },
  props: {
    width: {
      type: String,
      default: "260px",
    },
    height: {
      type: String,
      default: "220px",
    },
  },
  computed: {},
  created() {
    fetchCountryListApi()
      .then((result) => {
        let countryList = result.data;
        let newCountryList = [];
        countryList.forEach((e, i) => {
          newCountryList.push(...e.countryList);
        });
        this.$store.commit("countryModule/SET_COUNTRY_LIST", newCountryList);
        this.countryList = newCountryList;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    flagIcon(locale) {
      locale = locale.toLowerCase();
      return `flag-icon-${locale}`;
    },
    handleCountryCheck(code,index) {
      this.$emit("handleCountryCheck", code);
      // 添加选项背景色
      this.checkIndex = index
    },
  },
};
</script>

<style lang="less" scoped>
#CountryCodeWrap::-webkit-scrollbar {
  width: 6px;
} /* 滚动槽 */
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
} /* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.5);
}
::-webkit-scrollbar-thumb:window-inactive {
  background: rgba(255, 0, 0, 0.4);
}

#CountryCodeWrap {
  overflow-y: scroll;
  border: 1px solid #d8d8d8;
  background-color: #fff;
  .myitem {
    height: 24px;
    width: 100%;
    display: flex;
    justify-content: left;
    align-items: center;
    font-size: 16px;
    cursor: pointer;
    &:hover,&.isCheck {
      background-color: #e4e5e7;
    }
    span:first-child {
      margin: 0 10px;
      width: 20px;
      height: 20px;
    }
    span:nth-child(3) {
      margin-left: auto;
      margin-right: 10px;
    }
  }
}
</style>
