import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { searchState } from '../store'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import ClearIcon from '@material-ui/icons/Clear'
import SearchIcon from '@material-ui/icons/Search'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputAdornment from '@material-ui/core/InputAdornment'

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
  const [search, setSearch] = useRecoilState(searchState)
  const [searchInputValue, setSearchInputValue] = useState('')
  const classes = useStyles()

  const clearSearch = (): void => {
    setSearch({ term: '', sort: 'newest' })
    setSearchInputValue('')
  }

  const submitSearch = (): void => {
    if (search.term !== searchInputValue) {
      setSearch({ ...search, term: searchInputValue })

      // Due to limitation of the API, if query if empty string, only newest sorting would be applied
      // Disable the sorting option for better UX
      if (searchInputValue === '') {
        clearSearch()
      }
    }
  }

  const updateSearchingSort = (sort: string): void => {
    setSearch({ ...search, sort: sort })
  }

  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        value={searchInputValue}
        placeholder="Search New York Times Articles"
        inputProps={{ 'aria-label': 'search New York Times articles' }}
        onChange={(ev) => {
          setSearchInputValue(ev.target.value)
        }}
        onBlur={submitSearch}
        onKeyPress={(ev) => {
          if (ev.key === 'Enter') {
            ev.preventDefault()
            submitSearch()
          }
        }}
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
      />
      <FormControl
        variant="outlined"
        size="small"
        style={{ minWidth: 120 }}
        disabled={searchInputValue === ''}
      >
        <Select
          value={search.sort}
          onChange={(ev) => {
            updateSearchingSort(ev.target.value as string)
          }}
        >
          <MenuItem value="newest">Newest</MenuItem>
          <MenuItem value="oldest">Oldest</MenuItem>
        </Select>
      </FormControl>
      <IconButton
        className={classes.iconButton}
        onClick={clearSearch}
        disabled={searchInputValue === ''}
      >
        <ClearIcon />
      </IconButton>
    </Paper>
  )
}

export default SearchInput
