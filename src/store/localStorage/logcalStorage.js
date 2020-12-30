export function getLocalProfile() {
  let profile = localStorage.getItem('profile')
  return profile ? JSON.parse(profile) : null;
}

//存入localstore
export function setLocalStorage(loginPhoneResult) {
  let {
    city,
    province,
    userId,
    nickname,
    avatarUrl,
    avatarImgIdStr,
    backgroundUrl,
    backgroundImgIdStr,
    vipType,
    signature,
    birthday,
    gender,
    playlistBeSubscribedCount, // 播放列表被订阅数量
    playlistCount, //播放列表数量
    followeds, // 粉丝数
    follows, //关注数
    eventCount, // 动态数
  } = loginPhoneResult.profile;
  let profile = {
    city,
    province,
    userId,
    nickname,
    avatarUrl,
    avatarImgIdStr,
    backgroundUrl,
    backgroundImgIdStr,
    vipType,
    signature,
    birthday,
    gender,
    playlistBeSubscribedCount,
    playlistCount,
    followeds, 
    follows, 
    eventCount, 
  };
  localStorage.setItem("profile", JSON.stringify(profile));
  return profile
}

export function removeLocalProfile() {
  localStorage.removeItem('profile')
}
