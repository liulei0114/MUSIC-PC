<template>
  <div id="LoginWrap">
    <div class="head_img">
      <img src="~assets/loginPhone.png" alt width="318px" height="169px" />
      <p>
        <svg-icon icon-class="close"></svg-icon>
      </p>
    </div>
    <div class="login_input">

      <div class="phone">
        <div class="left">
        </div>
        <div class="right"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
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
    margin: 10px auto;
    .phone {
      height: 40px;
      border-bottom: 1px solid #d8d8d8;
      .left {
      }
    }
  }
}
</style>