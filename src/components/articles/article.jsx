import React from "react";
import "./style/article.css";

const Article = ({ date, title, description, link, author, readingTime }) => {
  return (
    <div className="article-card">
      <div className="article-date">{date}</div>

      <h2 className="article-title">
        <a href={link} target="_blank" rel="noopener noreferrer">
          {title}
        </a>
      </h2>

      <p className="article-meta">
        {author} • {readingTime}
      </p>

      <p className="article-description">{description}</p>

      <a
        href={link}
        className="article-readmore"
        target="_blank"
        rel="noopener noreferrer"
      >
        Read Article →
      </a>
    </div>
  );
};

export default Article;
