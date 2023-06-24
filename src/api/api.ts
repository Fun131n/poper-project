import service from '@/utils/service'
import type { PagingParams } from "@/type" 

export function getArticles({ pageNum, pageSize }: PagingParams, keyword?: string) {
  return service({
    url: '/api/articles',
    method: 'get',
    params: {
      pageNum,
      pageSize,
      keyword
    }
  })
}

export function getArticle(id: string) {
  return service({
    url: '/api/article',
    method: 'get',
    params: { id }
  })
}

export function getSearchSuggestion(keyword: string) {
  return service({
    url: '/search/suggestion',
    method: 'get',
    params: { keyword }
  })
}