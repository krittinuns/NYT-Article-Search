import { NextPage } from 'next'
import { useRouter } from 'next/router'

const ArticlePage: NextPage = () => {
  const router = useRouter()
  const { id } = router.query

  return <p>Article: {id}</p>
}

export default ArticlePage
