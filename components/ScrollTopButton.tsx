import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Fab from '@material-ui/core/Fab'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import Zoom from '@material-ui/core/Zoom'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

interface Props {
  children: React.ReactElement
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  })
)

const ScrollTopButton = (): JSX.Element => {
  const classes = useStyles()

  const ScrollTop = (props: Props): JSX.Element => {
    const { children } = props
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 100,
    })
    const handleClick = (event: React.MouseEvent<HTMLDivElement>): void => {
      const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector(
        '#search'
      )
      if (anchor) {
        anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }

    return (
      <Zoom in={trigger}>
        <div onClick={handleClick} role="presentation" className={classes.root}>
          {children}
        </div>
      </Zoom>
    )
  }

  return (
    <ScrollTop>
      <Fab size="small" aria-label="scroll back to top">
        <KeyboardArrowUpIcon />
      </Fab>
    </ScrollTop>
  )
}

export default ScrollTopButton
