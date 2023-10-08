// 拓展工具 JSON TO TS, 快捷ctrl+shift+alt+s ,json转为ts类型
// interface RootObject {
//     code: number;
//     message: string;
//     captchaEnabled: boolean;
//   }

/****************发现-推荐页面*********************/
//获取banner
interface BannerObject {
  banners: Banner[]
  code: number
}
interface Banner {
  imageUrl: string
  targetId: number
  adid?: any
  targetType: number
  titleColor: string
  typeTitle: string
  url?: string
  exclusive: boolean
  monitorImpress?: any
  monitorClick?: any
  monitorType?: any
  monitorImpressList?: any
  monitorClickList?: any
  monitorBlackList?: any
  extMonitor?: any
  extMonitorInfo?: any
  adSource?: any
  adLocation?: any
  adDispatchJson?: any
  encodeId: string
  program?: any
  event?: any
  video?: any
  song?: any
  scm: string
  bannerBizType: string
}
