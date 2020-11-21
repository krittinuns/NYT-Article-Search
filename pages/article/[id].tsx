import { GetServerSideProps, NextPage } from 'next'
import styles from '../../styles/page/DetailPage.module.css'
import axios from 'axios'

import Footer from '../../components/Footer'

type ArticlePageProps = {
  headline: string
  abstract: string
  imageUrl: string
  author: string
  date: string
  category: string
  leadParagraph: string
  webUrl: string
}

const ArticlePage: NextPage<ArticlePageProps> = ({
  headline,
  abstract,
  imageUrl,
  author,
  date,
  category,
  leadParagraph,
  webUrl,
}) => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>{headline}</h1>
        <h3>{abstract}</h3>
        <p>{`${process.env.NEXT_PUBLIC_NYT_IMAGE_PATH}/${imageUrl}`}</p>
        <p>{author}</p>
        <p>{date}</p>
        <p>{category}</p>
        <p>{leadParagraph}</p>
        <p>Read more on : {webUrl}</p>
      </main>
      <Footer />
    </div>
  )
}

// data fetching
export const getServerSideProps: GetServerSideProps = async (context) => {
  const articleId = context.params.id as string
  let article: ArticlePageProps

  try {
    const response = await axios.get(process.env.NEXT_PUBLIC_NYT_SEARCH_URL, {
      params: {
        page: 0,
        fq: `_id:"nyt://article/${articleId}"`,
        'api-key': process.env.NEXT_PUBLIC_NYT_API_KEY,
      },
    })

    if (response.data.response.docs.length > 0) {
      const data = response.data.response.docs[0]
      const imageUrl = data.multimedia.length > 0 ? data.multimedia[0].url : 'none'

      article = {
        headline: data.headline.main,
        abstract: data.abstract,
        imageUrl,
        author: data.byline.original,
        date: data.pub_date,
        category: data.news_desk,
        leadParagraph: data.lead_paragraph,
        webUrl: data.web_url,
      }
    }
  } catch (error) {
    console.error(error)
  }

  if (!article) {
    return {
      notFound: true,
    }
  }

  return {
    props: article,
  }
}

export default ArticlePage
