const tagRules: Array<{ tag: string; words: string[] }> = [
  { tag: '그리움', words: ['보고싶', '그립', '추억'] },
  { tag: '미안함', words: ['미안', '후회', '사과'] },
  { tag: '고마움', words: ['고마', '감사'] },
  { tag: '불안', words: ['불안', '무섭', '걱정'] },
  { tag: '희망', words: ['희망', '기대', '내일'] },
  { tag: '작별', words: ['안녕', '이별', '떠나'] },
  { tag: '위로', words: ['괜찮', '버텨', '위로'] },
]

export function inferEmotionalTags(text: string): string[] {
  const lower = text.toLowerCase()
  const tags = tagRules.filter((rule) => rule.words.some((word) => lower.includes(word))).map((rule) => rule.tag)
  return tags.length > 0 ? tags.slice(0, 3) : ['위로']
}
