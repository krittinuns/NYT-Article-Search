import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRecoilState, useRecoilValue } from 'recoil'
import { searchState, pageState } from '../store'

import Grid from '@material-ui/core/Grid'
import ArticleCard from './ArticleCard'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'

// NYT's article search API limitations
const ARTICLE_PER_PAGE = 10
const MAX_ARTICLE_PAGE = 200

const ArticleList = (): JSX.Element => {
  const [articles, setArticles] = useState([])
  const [loading, setIsloading] = useState(false)
  const search = useRecoilValue(searchState)
  const [page, setPage] = useRecoilState(pageState)

  useEffect(() => {
    const fetchArticles = async (): Promise<void> => {
      setIsloading(true)
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_NYT_SEARCH_URL, {
          params: {
            page: page.page - 1,
            q: search.term,
            sort: search.sort,
            'api-key': process.env.NEXT_PUBLIC_NYT_API_KEY,
          },
        })

        const totalPage = Math.min(
          Math.max(Math.ceil(response.data.response.meta.hits / ARTICLE_PER_PAGE), 0),
          MAX_ARTICLE_PAGE
        )
        setPage({ ...page, totalPage })
        setArticles(response.data.response.docs)
        setIsloading(false)
      } catch (error) {
        console.error(error)
        setIsloading(false)
      }
    }

    fetchArticles()
  }, [page.page, search])

  if (loading) {
    return <CircularProgress />
  }

  if (articles.length == 0) {
    return (
      <Typography variant="overline" color="textSecondary">
        no article found
      </Typography>
    )
  }

  return (
    <Grid container justify="center" spacing={2}>
      {articles.map((item) => {
        const imageUrl = item.multimedia.length > 0 ? item.multimedia[0].url : 'none'

        return (
          <Grid key={item._id} item>
            <ArticleCard
              web_url={item.web_url}
              imageUrl={`${process.env.NEXT_PUBLIC_NYT_IMAGE_PATH}/${imageUrl}`}
              title={item.headline.main}
              body={item.abstract}
              author={item.byline.original}
              date={item.pub_date}
              category={item.news_desk}
            />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default ArticleList
