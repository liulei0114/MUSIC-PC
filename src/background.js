'use strict'

import { app, protocol, BrowserWindow, Menu, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
const isDevelopment = process.env.NODE_ENV !== 'production'
const electron = require('electron');
let ipc = ipcMain


// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 1022,
    height: 670,
    frame: false,
    maximizable: false,
    resizable: false,//可否缩放
    useContentSize: true,
    webPreferences: {
      // nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      nodeIntegration: true,
      // webSecurity: false
    },
    icon: `${__static}/format.ico`
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.on('close', e => {
    e.preventDefault(); //先阻止一下默认行为，不然直接关了，提示框只会闪一下
    electron.dialog.showMessageBox({

      type: 'info',
      title: '提示',
      message: '确认退出？',
      buttons: ['确认', '取消'],   //选择按钮，点击确认则下面的idx为0，取消为1
      cancelId: 1, //这个的值是如果直接把提示框×掉返回的值，这里设置成和“取消”按钮一样的值，下面的idx也会是1
    }).then(idx => {
      //注意上面↑是用的then，网上好多是直接把方法做为showMessageBox的第二个参数，我的测试下不成功
      if (idx.response == 1) {
        console.log('index==1，取消关闭')
        e.preventDefault();
      } else {
        console.log('index==0，关闭')
        win = null
        app.exit()
      }
    })
  });
  ipc.on('window-close', function () {
    win.close();
  })
  win.on('closed', () => {
    win = null;
  })

  createMenu()

}
function createMenu() {
  // darwin表示macOS，针对macOS的设置
  if (process.platform === 'darwin') {
    const template = [{
      label: 'App Demo',
      // submenu: [
      //   {role: 'about'},
      //   {
      //     role: 'quit'
      //   }]
    }]
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
  } else {
    // windows及linux系统
    Menu.setApplicationMenu(null)
  }
}



// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  // if (isDevelopment && !process.env.IS_TEST) {
  //   // Install Vue Devtools
  //   try {
  //     await installExtension(VUEJS_DEVTOOLS)
  //   } catch (e) {
  //     console.error('Vue Devtools failed to install:', e.toString())
  //   }
  // }
  createWindow()
})



// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
