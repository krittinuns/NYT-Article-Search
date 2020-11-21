import styles from '../styles/Footer.module.css'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

const Footer = (): JSX.Element => {
  return (
    <footer className={styles.footer}>
      <Typography variant="caption" color="textSecondary" component="p">
        <Link
          href="https://github.com/krittinuns/NYT-Article-Search"
          target="_blank"
          rel="noopener"
        >
          By Krittinun Sirodom
        </Link>
      </Typography>
      <Typography variant="caption" color="textSecondary" component="p">
        Content : Copyright (c) 2020 The New York Times Company. All Rights Reserved.
      </Typography>
    </footer>
  )
}

export default Footer
