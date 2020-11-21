import { NextPage } from 'next'
import styles from '../styles/page/HomePage.module.css'

import SearchInput from '../components/SearchInput'
import ArticleList from '../components/ArticleList'
import Footer from '../components/Footer'

const HomePage: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <SearchInput />
        <ArticleList />
      </main>
      <Footer />
    </div>
  )
}

export default HomePage
