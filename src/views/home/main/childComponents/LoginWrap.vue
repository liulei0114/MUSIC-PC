<template>
  <div id="LoginWrap">
    <div class="head_img">
      <img src="~assets/loginPhone.png" alt width="318px" height="169px" />
      <p @click="handleCloseLoginWrap">
        <svg-icon icon-class="close"></svg-icon>
      </p>
    </div>
    <div class="login_input">
      <form action="#">
        <div class="phone">
          <div class="left">
            <i>
              <svg-icon icon-class="telephone"></svg-icon>
            </i>
            <span>+{{countryCode}}</span>
            <i class="down" @click="isCountryShow = !isCountryShow">
              <svg-icon icon-class="arrow-down-filling-999"></svg-icon>
            </i>
          </div>
          <div class="right">
            <input
              type="text"
              v-model="telphone"
              placeholder="请输入手机号"
              maxlength="11"
              autocomplete="off"
              onkeyup="value=value.replace(/[^\d.]/g,'')"
              @blur="blur"
            />
          </div>
        </div>
        <div class="password">
          <i>
            <svg-icon icon-class="ver-code"></svg-icon>
          </i>
          <input
            type="password"
            v-model="password"
            placeholder="请输入密码"
            maxlength="15"
            @blur="blur"
            autocomplete="off"
          />
          <!-- <span v-if="isShowVercodeBtn" class="timeout">
          <el-button size="mini" @click="handelSendVercode">获取按钮</el-button>
        </span>
          <span class="timeout" v-else>{{time}}秒后重发</span>-->
        </div>
      </form>

      <el-collapse-transition>
        <div class="country_code_wrap" v-show="isCountryShow">
          <country-code-wrap @handleCountryCheck="handleCountryCheck"></country-code-wrap>
        </div>
      </el-collapse-transition>
    </div>
    <div class="err_msg">
      <p>
        <i v-show="errMsg !== ''">
          <svg-icon icon-class="prompt"></svg-icon>
        </i>
        {{errMsg}}
      </p>
    </div>
    <div class="login_btn" @click="handleLogin">登录</div>
    <div class="other_login">
      <img src="~assets/other_login.png" alt />
    </div>
  </div>
</template>

<script>
import CountryCodeWrap from './CountryCodeWrap.vue'
import { checkPhoneExitApi, loginPhoneApi } from '@/network/api/musicApi.js'
import { loadingMixin } from '@/mixin/loadingMixin'
const timeout = 60

export default {
  mixins: [loadingMixin],
  data() {
    return {
      countryCode: '86',
      isCountryShow: false,
      time: timeout,
      isShowVercodeBtn: true,
      telphone: '17862725207',
      password: 'll19960114',
      errMsg: '',
    }
  },
  methods: {
    // ? 下拉框点击
    handleCountryCheck(code) {
      this.countryCode = code
      // ? 关掉下拉框
      this.isCountryShow = false
    },
    // ? 关闭登录框
    handleCloseLoginWrap() {
      this.$store.commit('loginModule/SET_LOGIN_DIALOG_STATUS', false)
    },
    // ? 发送验证码
    handelSendVercode() {
      this.isShowVercodeBtn = false
      let interval = setInterval(() => {
        if (this.time <= 0) {
          this.isShowVercodeBtn = true
          this.time = timeout
          clearInterval(interval)
        } else {
          this.time--
        }
      }, 1000)
    },
    // ? 处理登录请求
    async handleLogin() {
      if (this.telphone === '') {
        this.errMsg = '输入正确手机号'
        return
      }
      if (this.password === '') {
        this.errMsg = '请输入密码'
        return
      }
      let params = new URLSearchParams()
      params.append('phone', this.telphone)
      params.append('countrycode', this.countryCode)

      this.initLoading()
      // * 手机号是否注册
      let phoneExitResult = await checkPhoneExitApi(params)
      if (phoneExitResult.exist == -1) {
        this.errMsg = '手机号未注册'
        this.endLoading()
        return
      }
      // * 手机登录
      params.append('md5_password', this.$md5(this.password))
      params.append('timestamp', new Date().getTime())
      try {
        await this.$store.dispatch('loginModule/LoginByPhone', params)
        this.handleCloseLoginWrap()
      } catch (error) {
        console.log(error.msg)
        if (error.code === 502) {
          this.errMsg = `手机号码或${error.message}`
        } else if (error.code === 509) {
          this.errMsg = '密码错误超过限制'
        } else {
          this.$gMessage.show(error.message)
        }
      }
      this.endLoading()
    },
    // ? 聚焦
    blur() {
      this.errMsg = ''
    },
  },
  components: { CountryCodeWrap },
}
</script>

<style lang="less" scoped>
#LoginWrap {
  height: 530px;
  position: absolute;
  width: 350px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  z-index: 100 !important;
  background-color: #fff;
  .head_img {
    width: 100%;
    height: 170px;
    img {
      cursor: pointer;
    }
    p {
      float: right;
      margin-right: 10px;
      font-size: 20px;
      margin-top: 10px;
      color: #a5a5a5;
      cursor: pointer;
    }
  }
  .login_input {
    width: 260px;
    height: 80px;
    border: 1px solid #d8d8d8;
    border-radius: 5px;
    margin: 10px auto 0px;
    position: relative;
    .phone {
      width: 100%;
      height: 40px;
      border-bottom: 1px solid #d8d8d8;
      display: flex;
      justify-content: left;

      .left {
        float: left;
        width: 90px;
        height: 100%;
        border-right: 1px solid #d8d8d8;
        display: flex;
        justify-content: left;
        align-items: center;
        color: #999;

        i {
          flex: 1;
          height: 100%;
          display: inline-block;
          line-height: 39px;
          font-size: 16px;
          text-align: center;
        }
        span {
          flex: 1;
          font-size: 12px;
          color: #333;
        }
      }
      .right {
        flex: 1;
        input {
          border: none;
          height: 32px;
          width: 80%;
          margin-left: 20px;
          margin-top: 5px;
          line-height: 32px;
          &::placeholder {
            color: #a9a9a9;
            font-size: 14px;
          }
        }
      }
    }
    .password {
      width: 100%;
      height: 38px;
      display: flex;
      justify-content: left;
      align-items: center;
      i {
        margin-left: 8px;
        font-size: 16px;
      }
      input {
        border: none;
        height: 32px;
        width: 150px;
        margin-left: 10px;
        // margin-top: 5px;
        line-height: 32px;
        &::placeholder {
          color: #a9a9a9;
          font-size: 14px;
        }
      }
      .timeout {
        margin-left: auto;
        margin-right: 8px;
        .el-button:hover {
          color: #fff;
          border-color: #c6e2ff;
          background-color: #ea4848;
        }
      }
    }
    .country_code_wrap {
      position: absolute;
      top: 39px;
    }
  }
  .err_msg {
    width: 260px;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: #d81e06;
    margin: 0 auto;
    p {
      float: right;
      margin-right: 10px;
    }
  }
  .login_btn {
    width: 260px;
    height: 40px;
    background-color: #ea4848;
    text-align: center;
    line-height: 40px;
    color: #fff;
    letter-spacing: 5px;
    border-radius: 5px;
    margin: 0px auto 30px;
    font-size: 16px;
    cursor: pointer;
    &:hover {
      background-color: #c72e2e;
    }
  }
  .other_login {
    margin-top: 40px;
    text-align: center;
  }
}
</style>