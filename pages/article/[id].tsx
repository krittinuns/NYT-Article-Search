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
    const response = await axios.get(process.env.NEXT_PUBLIC_NYT_SEARCH_URL, {
      params: {
        page: 0,
        fq: `_id:"nyt://article/${articleId}"`,
        'api-key': process.env.NEXT_PUBLIC_NYT_API_KEY,
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
