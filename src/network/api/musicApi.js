import request from '../request.js';

// ! 国家编码列表
export function fetchCountryListApi() {
  return request({
    url: '/countries/code/list',
    method: 'get',
  })
}

// ! 检测手机号码是否已注册
export function checkPhoneExitApi(params) {
  return request({
    url: '/cellphone/existence/check',
    method: 'get',
    params: params
  })
}

// ! 手机登录
export function loginPhoneApi(params) {
  return request({
    url: '/login/cellphone',
    method: 'get',
    params: params
  })
}

// ! 退出登录
export function logoutApi() {
  return request({
    url: '/logout',
    method: 'get'
  })
}

// ! 获取创建的歌单
export function fetchUserPlayListAPi(params) {
  return request({
    url: '/user/playlist',
    method: 'get',
    params: params
  })
}


// ! 根据歌单ID获取歌单详情(歌曲只有20条不全，要调用song/detai获取)
export function fetchSongListDetailApi(params) {
  return request({
    url: '/playlist/detail',
    method: 'get',
    params: params
  })
}
export function fetchSongDetailApi(params) {
  return request({
    url: '/song/detail',
    method: 'get',
    params
  })
}
// ! 歌单详情-动态部分,如评论数,是否收藏,播放数
export function fetchPlayListDynamicAPI(params) {
  return request({
    url: '/playlist/detail/dynamic',
    method: 'get',
    params
  })
}

// ! 根据歌单ID获取评论信息
export function fetchCommentAPI(type, params) {
  return request({
    url: '/comment/' + type,
    method: 'get',
    params: params
  })
}

// ! 给资源点赞
export function doCommentLikedAPI(params) {
  return request({
    url: '/comment/like',
    method: 'get',
    params: params
  })
}


// ! 发布/删除评论
export function doCommentAPI(params) {
  return request({
    url: '/comment',
    method: 'get',
    params: params
  })
}

// ! 歌单收藏者信息
export function playListSubscribersInfoAPI(params) {
  return request({
    url: '/playlist/subscribers',
    method: 'get',
    params: params
  })
}


// ! 搜索
export function seachMusicAPI(params) {
  return request({
    url: '/cloudsearch',
    method: 'get',
    params: params
  })
}
// ! 首页轮播图数据
export function fetchBannerAPI() {
  return request({
    url: '/banner',
    method: 'get',
    params: { type: 0 }
  })
}

// ! 发现音乐-个性化推荐-推荐歌单
export function fetchPersonalizedAPI() {
  return request({
    url: '/personalized',
    method: 'get',
    params: { limit: 9, timestamp: (new Date()).valueOf() }
  })
}


// ! 发现音乐-个性化推荐-独家放送
export function fetchPrivatecontentAPI() {
  return request({
    url: '/personalized/privatecontent',
    method: 'get',
    params: { timestamp: (new Date()).valueOf() }
  })
}

// ! 发现音乐-个性化推荐-最新音乐
export function fetchPrivateNewSongAPI() {
  return request({
    url: '/personalized/newsong',
    method: 'get',
    params: { limit: 12, timestamp: (new Date()).valueOf() }
  })
}

// ! 发现音乐-个性化推荐-最新MV
export function fetchPrivateMVAPI() {
  return request({
    url: '/personalized/mv',
    method: 'get',
    params: { timestamp: (new Date()).valueOf() }
  })
}

// ! 发现音乐-个性化推荐-主播电台
export function fetchPrivateDjAPI() {
  return request({
    url: '/dj/personalize/recommend',
    method: 'get',
    params: { limit: 5, timestamp: (new Date()).valueOf() }
  })
}


// ! 发现音乐-歌单-歌单分类
export function fetchPlaylistCategoryAPI() {
  return request({
    url: '/playlist/catlist',
    method: 'get',
  })
}

// ! 发现音乐-歌单-热门歌单分类
export function fetchHotSonglistSubAPI() {
  return request({
    url: '/playlist/hot',
    method: 'get',
  })
}



// ! 发现音乐-歌单-精品歌单标签列表
export function fetchHqSonglistSubAPI() {
  return request({
    url: '/playlist/highquality/tags',
    method: 'get',
  })
}


// ! 发现音乐-歌单-根据标签获取精品歌单
export function fetchHqSonglistAPI(params) {
  return request({
    url: '/top/playlist/highquality',
    method: 'get',
    params: params
  })
}

// ! 发现音乐-歌单-根据标签获取歌单 ( 网友精选碟 )
export function fetchTopSonglistAPI(params) {
  return request({
    url: '/top/playlist',
    method: 'get',
    params: params
  })
}



// ! 发现音乐-排行榜歌单
export function fetchRankSonglistAPI() {
  return request({
    url: '/toplist',
    method: 'get',
  })
}

// ! 发现音乐-排行榜歌单
export function fetchRankArtistAPI(params) {
  return request({
    url: '/toplist/artist',
    method: 'get',
    params
  })
}


// ! 喜欢的音乐列表
export function fetchLikeListAPI(params) {
  return request({
    url: '/likelist',
    method: 'get',
    params
  })
}



// ! 搜索歌手列表
export function fetchArtistListAPI(params) {
  return request({
    url: '/artist/list',
    method: 'get',
    params
  })
}


// ! 发现音乐-最新音乐-新歌速递
export function fetchTopSongAPI(params) {
  return request({
    url: '/top/song',
    method: 'get',
    params
  })
}


// ! 发现音乐-最新音乐-新碟上架(推荐)
export function fetchTopAlbumAPI(params) {
  return request({
    url: '/top/album',
    method: 'get',
    params
  })
}


// ! 发现音乐-最新音乐-新碟上架(全部)
export function fetchAllAlbumAPI(params) {
  return request({
    url: '/album/new',
    method: 'get',
    params
  })
}


// ! 专辑详情
export function fetchAlbumDetailAPI(params) {
  return request({
    url: '/album',
    method: 'get',
    params
  })
}

// ! 专辑动态如是否收藏,收藏数,评论数,分享数
export function fetchAlbumDynamicAPI(params) {
  return request({
    url: '/album/detail/dynamic',
    method: 'get',
    params
  })
}