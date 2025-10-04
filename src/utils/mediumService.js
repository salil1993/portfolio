import { XMLParser } from "fast-xml-parser";

class MediumService {
  constructor(username) {
    this.username = username;
    this.rssUrl = `https://medium.com/feed/@${username}`;
  }

  async fetchFeed() {
    try {
      const proxyUrl = "https://api.allorigins.win/get?url=";
      const response = await fetch(
        `${proxyUrl}${encodeURIComponent(this.rssUrl)}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const xmlData = data.contents;

      const parser = new XMLParser({ ignoreAttributes: false });
      const result = parser.parse(xmlData);

      const channel = result?.rss?.channel;

      if (!channel) {
        throw new Error("Invalid Medium RSS feed structure.");
      }

      const feedInfo = {
        title: channel.title || "Medium Blog",
        link: channel.link || `https://medium.com/@${this.username}`,
        description: this.stripHtml(channel.description || ""),
        lastUpdated: channel.lastBuildDate || null,
      };

      const items = channel.item || [];
      const posts = items.map((item) => this.parsePost(item));

      return { feedInfo, posts };
    } catch (error) {
      console.error("Error fetching Medium feed:", error);
      return { feedInfo: null, posts: [] };
    }
  }

  parsePost(item) {
    const title = item.title;
    const link = item.link;
    const pubDate = new Date(item.pubDate);

    // ensure description is always available
    const rawDescription = item.description || item["content:encoded"] || "";
    const description = this.stripHtml(rawDescription);

    const content = item["content:encoded"] || item.description || "";
    const categories = item.category || [];
    const author = item["dc:creator"] || "Unknown Author";

    return {
      title,
      link,
      author,
      date: this.formatDate(pubDate),
      description:
        this.truncateDescription(description, 150) ||
        "No description available",
      content,
      categories: Array.isArray(categories) ? categories : [categories],
      readingTime: this.estimateReadingTime(content),
      source: "medium",
      external: true,
    };
  }

  stripHtml(html) {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }

  truncateDescription(text, maxLength) {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength).trim() + "...";
  }

  formatDate(date) {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  estimateReadingTime(content) {
    const wordsPerMinute = 200;
    const text = this.stripHtml(content || "");
    const wordCount = text.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  }
}

export default MediumService;
