/**
 * some common interface define
 */

export interface Article {
  id: string
  title: string
  titleIcon?: string
  content: string
  contentImg?: string
  videoSrc?: string
  date: string
}

export interface PagingParams {
  pageNum: number
  pageSize: number
}