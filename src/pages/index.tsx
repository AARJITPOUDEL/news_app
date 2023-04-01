import { useState } from "react";
import Head from "next/head";
import axios from "axios";
import styles from "@/styles/Home.module.css";

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
}

interface NewsData {
  articles: Article[];
}

const API_KEY = "662679a862ef4569bc9d2bf1a14b11d9";
const API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([]);

  const fetchArticles = async () => {
    try {
      const response = await axios.get<NewsData>(API_URL);
      setArticles(response.data.articles);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>News App</title>
      </Head>
      <h1 className={styles.title}>News App</h1>
      <button className={styles.button} onClick={fetchArticles}>
        Fetch Articles
      </button>
      <div className={styles.articles}>
        {articles.map((article) => (
          <div className={styles.article} key={article.title}>
            <h2 className={styles.articleTitle}>{article.title}</h2>
            <img
              className={styles.articleImage}
              src={article.urlToImage}
              alt={article.title}
            />
            <p className={styles.articleDescription}>{article.description}</p>
            <a className={styles.articleLink} href={article.url}>
              Read More
            </a>
          </div>
        ))}
      </div>
      <h3 className={styles.title1}>
        Made By
        <a href="https://www.linkedin.com/in/aarjit-poudel-2925841b5/">
          Aarjit Poudel
        </a>
      </h3>
    </div>
  );
}
