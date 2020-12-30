import Message from './Message.vue'

const globalMessage = {
  install: function (Vue) {
    // 获取组件构造器
    let messageContru = Vue.extend(Message)

    // 根据构造器创建组件实例
    let messageInstance = new messageContru();

    // 挂载在页面上
    messageInstance.$mount(document.createElement('div'))

    // 因为app.vue 下是routerview 不加Vue.nextTick 会被覆盖掉，当然往body中插入不需要加的
    Vue.nextTick(() => {
      document.getElementById('app').appendChild(messageInstance.$el)
    })
    //追加在页面上

    //设置为全局变量
    Vue.prototype.$gMessage = messageInstance

  }
}

export default globalMessage