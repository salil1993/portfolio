import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

import NavBar from "../components/common/navBar";
import Footer from "../components/common/footer";
import Logo from "../components/common/logo";
import Article from "../components/articles/article";
import MediumService from "../utils/mediumService";
import "./styles/articles.css";

const Articles = () => {
  const [posts, setPosts] = useState([]);		
  const [feedInfo, setFeedInfo] = useState({
    title: "Articles",
    description: "Latest articles and insights.",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const medium = new MediumService("saliljha1993"); // replace with your Medium username

    medium.fetchFeed().then(({ feedInfo, posts }) => {
      if (feedInfo) {
        setFeedInfo(feedInfo);
      }
      setPosts(posts);
      setLoading(false);
    });
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <title>{feedInfo.title}</title>
        <meta name="description" content={feedInfo.description || "-"} />
        <meta
          name="keywords"
          content={
            posts.length > 0
              ? posts.flatMap((p) => p.categories).slice(0, 10).join(", ")
              : "-"
          }
        />
      </Helmet>

      <div className="page-content">
        <NavBar active="articles" />
        <div className="content-wrapper">
          <div className="articles-logo-container">
            <div className="articles-logo">
              <Logo width={46} />
            </div>
          </div>

          <div className="articles-main-container">
            <div className="title articles-title">{feedInfo.title}</div>

            <div className="subtitle articles-subtitle">
              {feedInfo.description}
            </div>

            <div className="articles-container">
              <div className="articles-wrapper">
                {loading ? (
                  <p>Loading articles...</p>
                ) : posts.length === 0 ? (
                  <p>No articles found.</p>
                ) : (
                  posts.map((post, index) => (
                    <div
                      className="articles-article"
                      key={(index + 1).toString()}
                    >
                      <Article
                        date={post.date}
                        title={post.title}
                        description={post.description}
                        link={post.link}
                        author={post.author}
                        readingTime={post.readingTime}
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="page-footer">
            <Footer />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Articles;
