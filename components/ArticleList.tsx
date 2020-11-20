import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRecoilValue } from 'recoil'
import { searchState } from '../store'

import Grid from '@material-ui/core/Grid'
import ArticleCard from './ArticleCard'
import CircularProgress from '@material-ui/core/CircularProgress'

const ArticleList = (): JSX.Element => {
  const [articles, setArticles] = useState([])
  const [loading, setIsloading] = useState(false)
  const search = useRecoilValue(searchState)

  useEffect(() => {
    const fetchArticles = async (): Promise<void> => {
      setIsloading(true)
      try {
        const response = await axios.get(
          'https://api.nytimes.com/svc/search/v2/articlesearch.json',
          {
            params: {
              page: 0,
              q: search.term,
              sort: search.sort,
              'api-key': 'o1j8YD4Pu90wLjZHrpkGIsXj0QAACJEb', // TODO : get from env
            },
          }
        )
        setArticles(response.data.response.docs)
        setIsloading(false)
      } catch (error) {
        console.error(error) // TODO : alert UI
        setIsloading(false)
      }
    }

    fetchArticles()
  }, [search])

  if (loading) {
    return <CircularProgress />
  }

  return (
    <Grid container justify="center" spacing={2}>
      {articles.map((item) => {
        const imageUrl = item.multimedia.length > 0 ? item.multimedia[0].url : 'none' // TODO : placeholder image

        return (
          <Grid key={item._id} item>
            <ArticleCard
              id={item._id}
              imageUrl={`https://static01.nyt.com/${imageUrl}`}
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
