import { NextPage } from 'next'
import styles from '../styles/page/HomePage.module.css'

import SearchInput from '../components/SearchInput'
import ArticlePagination from '../components/ArticlePagination'
import ArticleList from '../components/ArticleList'
import Footer from '../components/Footer'
import ScrollTopButton from '../components/ScrollTopButton'

const HomePage: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <SearchInput />
        <ArticlePagination />
        <ArticleList />
      </main>
      <Footer />
      <ScrollTopButton />
    </div>
  )
}

export default HomePage
