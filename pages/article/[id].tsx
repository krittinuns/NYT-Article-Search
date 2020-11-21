import { GetServerSideProps, NextPage } from 'next'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Image from 'next/image'
import styles from '../../styles/page/DetailPage.module.css'
import axios from 'axios'

import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Link from '@material-ui/core/Link'

import Footer from '../../components/Footer'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: `${theme.spacing(4)}px 0px`,
    },
    content: {
      padding: `0px ${theme.spacing(4)}px`,
    },
    image: {
      margin: `${theme.spacing(2)}px 0px`,
    },
    contentBody: {
      padding: `${theme.spacing(2)}px ${theme.spacing(4)}px`,
    },
  })
)

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
  const classes = useStyles()

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Container maxWidth="md">
          <Paper className={classes.paper}>
            <Typography variant="h4" gutterBottom align="center" className={classes.content}>
              {headline}
            </Typography>
            <Typography variant="h6" gutterBottom color="textSecondary" className={classes.content}>
              {abstract}
            </Typography>
            <Box className={classes.image}>
              <Image
                src={`${process.env.NEXT_PUBLIC_NYT_IMAGE_PATH}/${imageUrl}`}
                width={600}
                height={400}
                layout="responsive"
              />
            </Box>
            <Typography
              variant="overline"
              color="textSecondary"
              component="p"
              className={classes.content}
            >
              {category}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary" className={classes.content}>
              {author}
            </Typography>
            <Typography
              variant="caption"
              color="textSecondary"
              className={classes.content}
              component="p"
            >
              Published {new Date(date).toISOString().slice(0, 10)}
            </Typography>
            <Typography variant="body1" className={classes.contentBody}>
              {leadParagraph}
            </Typography>
            <Typography
              variant="overline"
              color="textSecondary"
              className={classes.content}
              component="p"
              align="right"
            >
              <Link href={webUrl} target="_blank" rel="noopener">
                read more
              </Link>
            </Typography>
          </Paper>
        </Container>
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
