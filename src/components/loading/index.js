import loading from './loading.vue'



const maskLoading = {
  install: (Vue) => {
    const maskLoadingCon = Vue.extend(loading);
    // loading 挂载
    const toggleLoading = function (el, binding) {
      Vue.nextTick(() => {
        if (binding.modifiers.fullscreen) {
          // * 全屏情况下
          document.body.appendChild(el.maskDOM);
        } else {
          // * 非全屏计算loading宽高和位置
          let musicMainDom = document.getElementById('MusicMain')
          let height = musicMainDom.clientHeight; // * 当前元素高度
          let width = musicMainDom.clientWidth; // * 当前元素宽度
          let offsetTop = musicMainDom.offsetTop; // * 当前元素距离顶部距离
          // * loading 位置赋值
          el.maskDOM.style.top = offsetTop + "px";
          el.maskDOM.style.height = height + "px";
          el.maskDOM.style.width = width + "px";
          document.getElementById('MusicMain').appendChild(el.maskDOM)
        }
      })
    }



    // 创建全局指令
    Vue.directive('maskLoading', {
      // * 生命周期，执行一次，绑定时候执行,el:当前元素，binding:value/oldValue/arg/
      bind(el, binding) {
        let text = binding.value.text;
        let iconName = binding.value.iconName;
        let fontSize = binding.value.fontSize;
        let iconFontSize = binding.value.iconFontSize
        const maskLoadingIns = new maskLoadingCon({
          el: document.createElement('div'),
          data: {
            fullscreen: !!binding.modifiers.fullscreen,
            text: text ? text : '拼命加载中',
            iconName: iconName ? iconName : 'loading',
            fontSize: fontSize ? fontSize : '16',
            iconFontSize: iconFontSize ? iconFontSize : '20',
          }
        });
        el.maskIns = maskLoadingIns;
        el.maskDOM = maskLoadingIns.$el
        toggleLoading(el, binding)
      },
      componentUpdated(el, binding) {
        if (binding.value.loading !== binding.oldValue.loading) {
          if (binding.value.loading === 'off') {
            el.maskDOM && el.maskDOM.parentNode && el.maskDOM.parentNode.removeChild(el.maskDOM);
            el.maskIns && el.maskIns.$destroy();
          } else if (binding.value.loading === 'on') {
            toggleLoading(el, binding)
          }
        }

      },
      unbind(el) {
        el.maskDOM && el.maskDOM.parentNode && el.maskDOM.parentNode.removeChild(el.maskDOM);
        el.maskIns && el.maskIns.$destroy();
      }

    })
  }
}
export default maskLoading




