# New York Times Web application using [Article Search API](https://developer.nytimes.com/docs/articlesearch-product/1/overview)

### [Demo on Vercel](https://nyt-article-search.vercel.app/)

---

## Getting Start

### Local Development

```bash
npm run dev
# or
yarn dev
```

### Local Build

```bash
npm run build
npm run start
# or
yarn build
yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## Dependencies
* [Next.js](https://nextjs.org/) : React framework for production
* [TypeScript](https://www.typescriptlang.org/) : Extends JavaScript by adding types
* [Material-UI](https://material-ui.com/) : React components for faster and easier web development
* [Axios](https://github.com/axios/axios) : Promise based HTTP client for the browser and node.js
* [Recoil](https://recoiljs.org/) : A state management library for React
* [ESLint](https://eslint.org/) : Find and fix problems in your JavaScript code
* [Prettier](https://prettier.io/) : Opinionated code formatter

---

## Features
### Home Page
* Search articles by terms and order
* Pagination
* Scroll to top
### Detail Page
* Generate with [server-side rendering](https://medium.com/walmartglobaltech/the-benefits-of-server-side-rendering-over-client-side-rendering-5d07ff2cefe8)
* [Next.js image optimization](https://nextjs.org/docs/basic-features/image-optimization)

---

## Remarks
Due to API limitations, 
* If query string empty, only newest sorting could be applied. So I decided to disable the sorting option for better UX
* `ARTICLE_PER_PAGE = 10` and `MAX_ARTICLE_PAGE = 200`
* Getting articles' slug is a bit tricky, need to manipulate strings derived from `web_url`
* No single article query provided, need to search an article by matching `web_url`

---

## Screenshots

#### Desktop
![Desktop: home](/screenshots/desktop-home.jpg)
![Desktop: detail](/screenshots/desktop-detail.png)

#### Mobile
![Mobile: home](/screenshots/mobile-home.jpg)
![Mobile: detail](/screenshots/mobile-detail.png)
