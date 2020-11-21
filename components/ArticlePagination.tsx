import { useRecoilState } from 'recoil'
import { pageState } from '../store'

import Pagination from '@material-ui/lab/Pagination'

const ArticlePagination = (): JSX.Element => {
  const [page, setPage] = useRecoilState(pageState)

  return (
    <Pagination
      page={page.page}
      count={page.totalPage}
      style={{ marginBottom: '20px' }}
      size="small"
      showFirstButton
      showLastButton
      onChange={(_event, value) => {
        setPage({ ...page, page: value })
      }}
    />
  )
}

export default ArticlePagination
