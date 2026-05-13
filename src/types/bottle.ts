export type BottleType =
  | '누군가에게 못 보낸 말'
  | '미래의 나에게'
  | '이름 모를 누군가에게'
  | '사라진 사람에게'
  | '그냥 바다에 두고 싶은 말'

export type StartSea = '인천 앞바다' | '부산 앞바다' | '제주 남쪽 바다' | '동해' | '남해'

export type VisibilityType = '혼자 간직하기' | '나중에 누군가 발견 가능'

export interface RoutePoint {
  lat: number
  lng: number
  label: string
}

export interface ReplyItem {
  id: string
  body: string
  createdAt: string
}

export interface Bottle {
  id: string
  title: string
  body: string
  type: BottleType
  visibility: VisibilityType
  startSea: StartSea
  createdAt: string
  currentLat: number
  currentLng: number
  route: RoutePoint[]
  emotionalTags: string[]
  status: string
  discovered: boolean
  replies: ReplyItem[]
}
