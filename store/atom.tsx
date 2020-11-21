import { atom } from 'recoil'

export const searchState = atom({
  key: 'searchState',
  default: {
    term: '',
    sort: 'newest',
  },
})

export const pageState = atom({
  key: 'pageState',
  default: {
    page: 1,
    totalPage: 0,
  },
})
