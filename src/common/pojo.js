import { formatDate, millisecondToDate } from '@/util/DateUtil.js'

export class SongListDeatil {
  constructor(privileges, { playCount, subscribedCount, id, name, shareCount, commentCount, coverImgUrl, privacy, createTime, trackUpdateTime, tracks, tags, description, creator }) {
    this.playCount = playCount;  // * 播放数量
    this.subscribedCount = subscribedCount; // * 订阅数量
    this.id = id; // * 歌单id
    this.name = name;// * 歌单名称
    this.shareCount = shareCount; // * 分享数量
    this.commentCount = commentCount; // * 评论数量
    this.coverImgUrl = coverImgUrl; // * 歌单封面图片
    this.createTime = formatDate(new Date(createTime), 'yyyy-MM-dd hh:mm:ss'); // * 歌单创建时间
    this.privacy = privacy // * 是否私有 0非私有
    this.trackUpdateTime = formatDate(new Date(trackUpdateTime), 'yyyy-MM-dd hh:mm:ss') // * 歌单最后更新时间
    this.trackList = this.getTrack(tracks, privileges);
    this.tags = tags;  // * 歌单标签
    this.description = description // * 歌单描述
    this.creator = new Creator(creator); // * 歌单创建者
  }

  getTrack(tracks, privileges) {
    let trackList = [];
    let vipCount = 0;
    if (tracks && tracks.length != 0) {
      tracks.forEach((e, i) => {
        if (e.fee === 1) {
          vipCount++;
        }
        trackList.push(new Track(e, privileges[i]))
      })
    }
    this.tracks = trackList;  // * 歌曲列表 arr[Track]
    this.vipCount = vipCount;  // * vip歌曲数量
  }

}


class Track {
  constructor({ name, id, ar, alia, pop, fee, al, dt, h, m, l, tns, noCopyrightRcmd, mv, publishTime }, { playMaxbr, downloadMaxbr }) {
    this.name = name; // * 歌曲名称
    this.id = id; // * 歌曲id
    this.ar = this.getArList(ar); // * 歌曲作者 arr[Ar]
    this.alia = alia; // * 歌曲名称别名 arr[String]
    this.pop = pop; // * 热度(不确定)
    this.fee = fee; // * 歌曲类型  0：正常可下载可听  1：vip才可以听和下载非vip只能试听不能下载 4：版权要求，单独付费才可以听 8：只能免费听vip才能下载
    this.al = new Al(al); // * 歌曲专辑 arr[Al]
    this.dt = dt; // * 歌曲时长 timestamp
    this.h = h ? new Rate(h) : null; // * 高品质
    this.m = m ? new Rate(m) : null; // * 中品质
    this.l = l ? new Rate(l) : null; // * 低品质
    this.noCopyrightRcmd = noCopyrightRcmd ? true : false; // * noCopyrightRcmd为null是正常 有值就是合作方要求下架，灰色，不可播放，下架
    this.mv = mv; // * 0为没有mv，
    this.tns = tns ? tns : null; // * 歌曲名称别名 arr[String] 有tns是不显示alia，优先显示tns
    this.publishTime = this.getPublishTime(publishTime) // * 歌曲发布时间
    this.playMaxbr = playMaxbr; // *  播放最大码率
    this.downloadMaxbr = downloadMaxbr // * 下载最大码率 999000为sq无损音质
    this.sq = this.isSq(playMaxbr) // * sq标志
    this.formatDt = this.getFormatDt(dt) // * 装换的时长
  }

  getPublishTime(publishTime) {
    if (publishTime) {
      let date = new Date(publishTime);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
    return ''
  }

  isSq(playMaxbr) {
    if (playMaxbr && playMaxbr === 999000) {
      return true;
    }
    return false;
  }

  getFormatDt(dt) {
    if (dt) {
      return millisecondToDate(dt);
    }
    return "00:00"
  }

  getArList(ar) {
    let arList = []
    ar.forEach((e, i) => {
      arList.push(new Ar(e))
    })
    return arList
  }
}


// 专辑信息
class Al {
  constructor({ id, name, picUrl, tns, pic }) {
    this.id = id;  // * 专辑id
    this.name = name;// * 专辑名称
    this.picUrl = picUrl;// * 专辑图片
    this.tns = tns;// * 翻译别名 arr[String]
    this.pic = pic;// * 专辑图片id
  }
}

// 作者信息
class Ar {
  constructor({ id, name }) {
    this.id = id;  // * 作者id
    this.name = name;// * 作者名字
  }
}

class Rate {
  constructor({ br, fid, size, vd }) {
    this.br = br; // * 码率
    this.fid = fid;
    this.size = size; // * 文件大小 kb
    this.vd = vd;
  }
}

class Creator {
  constructor({ avatarUrl, userId, nickname, signature, vipType }) {
    this.avatarUrl = avatarUrl;
    this.userId = userId;
    this.nickname = nickname;
    this.signature = signature;
    this.vipType = vipType;
  }
}











/* 评论实体 */
export class CommentDetail {
  constructor({ topComments, hotComments, comments, total }) {
    this.topComments = topComments;
    this.hotComments = this.getHotComments(hotComments)
    this.comments = this.getComments(comments)
    this.total = total
  }

  getHotComments(hotComments) {
    let result = []
    if (hotComments && hotComments.length !== 0) {
      hotComments.forEach((e, i) => {
        result.push(new Comment(e))
      })
      return result
    }
    return null;
  }
  getComments(comments) {
    let result = []
    if (comments && comments.length !== 0) {
      comments.forEach((e, i) => {
        result.push(new Comment(e))
      })
      return result
    }
    return null;
  }
}

// 评论
class Comment {
  constructor({ user, beReplied, status, time, parentCommentId, liked, likedCount, content, commentId }) {
    this.user = new Creator(user);
    this.beReplied = beReplied.length !== 0 ? new BeReplied(beReplied[0]) : null;
    this.status = status; // * 0：正常
    this.time = time // * 分页使用，上一页最后一个传递给下一页获取下一页数据
    this.parentCommentId = parentCommentId // * 被评论内容id
    this.liked = liked // * 是否自己点赞了
    this.likedCount = likedCount // * 点赞数量
    this.content = content; // * 评论内容
    this.commentId = commentId;// * 该条评论id

  }
}

// 被评论信息
class BeReplied {
  constructor({ user, beRepliedCommentId, content,status }) {
    this.user = new Creator(user);
    this.beRepliedCommentId = beRepliedCommentId;
    this.content = content;
    this.status = status // -5 代表删除
  }
}
























