import { useState, useEffect } from 'react'
import axios from 'axios'

import Grid from '@material-ui/core/Grid'
import ArticleCard from './ArticleCard'

const ArticleList = (): JSX.Element => {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    const fetchArticles = async (): Promise<void> => {
      try {
        const response = await axios.get(
          'https://api.nytimes.com/svc/search/v2/articlesearch.json',
          {
            params: {
              page: 0,
              q: 'top',
              sort: 'newest',
              'api-key': 'o1j8YD4Pu90wLjZHrpkGIsXj0QAACJEb',
            },
          }
        )
        setArticles(response.data.response.docs)
      } catch (error) {
        console.error(error)
      }
    }

    fetchArticles()
  }, [])

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