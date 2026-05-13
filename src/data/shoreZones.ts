export type ShoreZone = {
  id: string
  name: string
  lat: number
  lng: number
  radiusKm: number
  description: string
}

export const shoreZones: ShoreZone[] = [
  { id: 'incheon-offshore', name: '인천 앞바다 권역', lat: 37.55, lng: 126.45, radiusKm: 52, description: '흐린 물결이 방파제 근처로 밀려드는 해안' },
  { id: 'taean-west', name: '태안 서해안', lat: 36.8, lng: 126.1, radiusKm: 48, description: '낮은 파도가 긴 모래결을 천천히 스치는 바다' },
  { id: 'jeju-north', name: '제주 북쪽 해안', lat: 33.58, lng: 126.5, radiusKm: 42, description: '멀리서 등대 불빛이 보이는 해안' },
  { id: 'jeju-south', name: '제주 남쪽 해안', lat: 33.17, lng: 126.47, radiusKm: 45, description: '남쪽 바람이 잠시 쉬어가는 조용한 바다' },
  { id: 'busan-coast', name: '부산 해안', lat: 35.14, lng: 129.15, radiusKm: 44, description: '어두워질 무렵 항구의 불빛이 번지는 해안' },
  { id: 'south-sea', name: '남해안', lat: 34.72, lng: 127.9, radiusKm: 50, description: '잔물결 사이로 작은 섬 그림자가 이어지는 해안' },
  { id: 'east-south', name: '동해 남부 해안', lat: 35.78, lng: 129.65, radiusKm: 43, description: '푸른 물결이 곧게 밀려왔다 물러나는 해안' },
  { id: 'ulleung-near', name: '울릉도 근처', lat: 37.48, lng: 130.95, radiusKm: 40, description: '짙은 바람결 속에서도 파도가 규칙을 지키는 바다' },
  { id: 'kyushu-west', name: '일본 규슈 서쪽 해안', lat: 32.72, lng: 129.72, radiusKm: 55, description: '먼 도시의 불빛이 물결 위로 희미하게 번지는 해안' },
  { id: 'okinawa-north', name: '오키나와 북쪽 해역', lat: 27.35, lng: 127.65, radiusKm: 60, description: '따뜻한 물결이 길게 이어지는 남쪽 바다' },
]
