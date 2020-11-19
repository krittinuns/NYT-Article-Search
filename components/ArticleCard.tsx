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
  },
})

type CardInfo = {
  id: string
  imageUrl: string
  title: string
  body: string
  author: string
  date: string
  category: string
}

const ArticleCard = (info: CardInfo): JSX.Element => {
  const classes = useStyles()

  return (
    <CardActionArea>
      <Card className={classes.root}>
        <CardMedia className={classes.media} image={info.imageUrl} title="Contemplative Reptile" />
        <CardContent>
          <Typography variant="overline" component="p">
            {info.category}
          </Typography>
          <Typography variant="h6" component="h2">
            {info.title}
          </Typography>
          <Typography variant="caption" color="textSecondary" component="p">
            {info.author}
          </Typography>
          <Typography gutterBottom variant="caption" color="textSecondary" component="p">
            {new Date(info.date).toISOString().slice(0, 10)}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {info.body}
          </Typography>
        </CardContent>
      </Card>{' '}
    </CardActionArea>
  )
}

export default ArticleCard
