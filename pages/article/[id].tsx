import { GetServerSideProps, NextPage } from 'next'
import axios from 'axios'

type ArticlePageProps = {
  leadParagraph: string
}

const ArticlePage: NextPage<ArticlePageProps> = (prop) => {
  return <p>{prop.leadParagraph}</p>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const articleId = context.params.id as string
  let article: ArticlePageProps

  try {
    const response = await axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json', {
      params: {
        page: 0,
        fq: `_id:"nyt://article/${articleId}"`,
        'api-key': 'o1j8YD4Pu90wLjZHrpkGIsXj0QAACJEb', // TODO : get from env
      },
    })

    if (response.data.response.docs.length > 0) {
      const data = response.data.response.docs[0]
      article = {
        leadParagraph: data.lead_paragraph,
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
