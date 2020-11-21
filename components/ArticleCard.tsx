import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  root: {
    width: 330,
    height: 470,
  },
  media: {
    height: 200,
    backgroundColor: 'lightgrey',
  },
})

type CardInfo = {
  web_url: string
  imageUrl: string
  title: string
  body: string
  author: string
  date: string
  category: string
}

const ArticleCard = (info: CardInfo): JSX.Element => {
  const classes = useStyles()
  const router = useRouter()

  return (
    <CardActionArea
      onClick={(e) => {
        e.preventDefault()
        const slug = info.web_url
          .replace(`${process.env.NEXT_PUBLIC_NYT_WEB_URL}/`, '')
          .replace('.html', '')
        router.push(`/post/${slug}`).then(() => window.scrollTo(0, 0))
      }}
    >
      <Card className={classes.root}>
        <CardMedia className={classes.media} image={info.imageUrl} title={info.title} />
        <CardContent>
          <Typography variant="overline">{info.category}</Typography>
          <Typography variant="h6">{info.title}</Typography>
          <Typography variant="caption" color="textSecondary">
            {info.author}
          </Typography>
          <Typography gutterBottom variant="caption" color="textSecondary">
            {new Date(info.date).toISOString().slice(0, 10)}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {info.body}
          </Typography>
        </CardContent>
      </Card>{' '}
    </CardActionArea>
  )
}

export default ArticleCard
