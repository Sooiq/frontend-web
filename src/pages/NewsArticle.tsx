import React from "react";
import NewsTagComponent from "../components/news/NewsTag";

// Hard-coded data for the article based on your image
const article = {
  date: "2025.03.02",
  time: "13.00",
  title: "Russia attacked Ukraine",
  tags: [
    { text: "ANTM", color: "green" as const },
    { text: "TINS", color: "green" as const }
  ],
  paragraphs: [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac diam sed purus iaculis mollis. Nulla maximus libero ac eros vestibulum congue. Duis dapibus mi in varius laoreet. Etiam ut felis nec elit tincidunt pretium ac nec facilisis. Donec ex felis, blandit sit amet consequat id, hendrerit eu nibh. Aenean erat est, porta sit amet faucibus sed, sagittis ac turpis. Quisque eu neque risus. Etiam congue, elit eu dictum dignissim, nisl ex fringilla dui, id fermentum sapien magna in lacus. Mauris non luctus mi. Pellentesque malesuada tincidunt lacus in tempus. Praesent gravida est eget mauris tempor cursus.",
    "Quisque eget mauris mi. Nunc in ligula semper, tempor metus sit amet, accumsan leo. Integer rutrum est nec odio tincidunt, et vestibulum tellus venenatis. Proin nec mattis orci. Maecenas odio purus, faucibus ac congue eu, dignissim pretium nulla. Maecenas vehicula mollis est sit amet volutpat. Pellentesque volutpat nisl et risus bibendum, in pharetra tellus scelerisque. Maecenas bibendum pretium odio, sit amet aliquet ex interdum a. Etiam ac tincidunt mauris.",
    "Praesent id vestibulum erat, eu pharetra quam. Morbi consequat suscipit enim at lobortis. Duis pharetra, tortor vitae faucibus pretium, nulla purus luctus risus, eu porttitor nulla mauris vel ligula. Nulla sollicitudin tincidunt turpis. Vestibulum congue tortor dolor, ac tincidunt arcu posuere sit amet. Duis vel augue ante. Aliquam dignissim auctor mi, ac sodales massa commodo in. Sed tellus augue, ultrices sit amet odio non, tempus mollis dui. Mauris at neque nulla. Quisque quis malesuada nunc, a volutpat enim.",
    "Curabitur mattis nunc eu congue pulvinar. Integer molestie massa nec tortor ultricies luctus. Nulla quis venenatis magna. Curabitur fringilla nec risus a porta. Nunc molestie elit id urna porttitor bibendum. Ut condimentum dolor at augue consectetur viverra vitae vitae leo. Mauris elit libero, dignissim scelerisque risus sit amet, faucibus semper turpis. Proin semper sit amet eros imperdiet faucibus. Sed rutrum nisl eros, at rhoncus est pellentesque sit amet. Etiam eget dapibus dui. Vivamus lacus augue, volutpat a tortor quis, auctor egestas tortor."
  ],
  sources: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
};

const NewsArticle: React.FC = () => {
  return (
    // We'll give it the same card styling as the background
    <div className="bg-dark-secondary rounded-xl shadow-lg p-6 lg:p-10">
      <header>
        <p className="text-sm text-gray-400 mb-2">
          {article.date} | {article.time}
        </p>
        <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
          {article.title}
        </h1>
        <div className="flex gap-2 mb-6">
          {article.tags.map((tag) => (
            // We can reuse the NewsTag component we built
            <NewsTagComponent key={tag.text} tag={tag} />
          ))}
        </div>
      </header>

      {/* Article Body */}
      <article className="space-y-6 text-gray-300 leading-relaxed">
        {article.paragraphs.map((p, index) => (
          <p key={index}>{p}</p>
        ))}
      </article>

      {/* Sources */}
      <footer className="mt-8 pt-4 border-t border-gray-700">
        <p className="text-sm text-gray-400">
          <span className="font-semibold text-gray-300">Sources: </span>
          {article.sources}
        </p>
      </footer>
    </div>
  );
};

export default NewsArticle;
