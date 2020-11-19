import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '5px 8px',
      display: 'flex',
      alignItems: 'center',
      width: '80%',
      marginBottom: '2rem',
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
  })
)

const SearchInput = (): JSX.Element => {
  const classes = useStyles()

  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search New York Times Articles"
        inputProps={{ 'aria-label': 'search New York Times articles' }}
      />
      <IconButton className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
      <IconButton className={classes.iconButton} aria-label="menu">
        <MenuIcon />
      </IconButton>
    </Paper>
  )
}

export default SearchInput
