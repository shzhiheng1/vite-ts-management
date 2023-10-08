// 热门推荐
interface ApiPersonalized {
  hasTaste: boolean
  code: number
  category: number
  result: PersonalizedResult[]
}

interface PersonalizedResult {
  id: number
  type: number
  name: string
  copywriter: string
  picUrl: string
  canDislike: boolean
  trackNumberUpdateTime: number
  playCount: number
  trackCount: number
  highQuality: boolean
  alg: string
}
