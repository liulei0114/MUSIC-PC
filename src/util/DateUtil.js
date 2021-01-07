
export function _YMDhms() {
  let setZero = (num) => {
    return num < 10 ? '0' + num : num;
  }
  let str = ''
  let date = new Date()
  let Y = date.getFullYear()
  let M = setZero(date.getMonth() + 1)
  let D = setZero(date.getDate())
  let h = setZero(date.getHours())
  let m = setZero(date.getMinutes())
  let s = setZero(date.getSeconds())
  str = Y + '-' + M + '-' + D + ' ' + h + ':' + m + ':' + s;
  return str
}

export function _YMD(strDate = '') {
  let setZero = (num) => {
    return num < 10 ? '0' + num : num;
  }
  let str = ''
  let date = strDate ? new Date(strDate) : new Date();
  let Y = date.getFullYear()
  let M = setZero(date.getMonth() + 1)
  let D = setZero(date.getDate())
  str = Y + '-' + M + '-' + D
  return str
}


// date.js
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}

export function str2Date(dateStr, separator) {
  if (!separator) {
    separator = "-";
  }
  let dateArr = dateStr.split(separator);
  let year = parseInt(dateArr[0]);
  let month;
  //处理月份为04这样的情况
  if (dateArr[1].indexOf("0") == 0) {
    month = parseInt(dateArr[1].substring(1));
  } else {
    month = parseInt(dateArr[1]);
  }
  let day = parseInt(dateArr[2]);
  let date = new Date(year, month - 1, day);
  return date;
}

export function millisecondToDate(msd) {
  var time = parseFloat(msd) / 1000;
  if (null != time && "" != time) {
    if (time > 60 && time < 60 * 60) {
      time = leftzZero(parseInt(time / 60.0)) + ":" + leftzZero(parseInt((parseFloat(time / 60.0) -
        parseInt(time / 60.0)) * 60));
    }
    else if (time >= 60 * 60 && time < 60 * 60 * 24) {
      time = leftzZero(parseInt(time / 3600.0)) + ":" + leftzZero(parseInt((parseFloat(time / 3600.0) -
        parseInt(time / 3600.0)) * 60)) + ":" +
        leftzZero(parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
          parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60));
    }
    else {
      time = leftzZero(parseInt(time)) + "秒";
    }
  }
  return time;

  function leftzZero(time) {
    time = time.toString();
    return time.length === 1 ? `0${time}` : time
  }
}
