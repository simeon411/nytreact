import axios from "axios";


export default {
	// The getArticles method retrieves articles from the NYT API server
	// It accepts a "query" or term to search the NYT api for
  getArticles: function(query) {
    
    let authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
    let queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&q=" + query;
    console.log(queryURLBase)
    return axios.get(queryURLBase, { params: { q: query}});
  },

  // Saves articles to MongoDB 
  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  },

  // Retrieve articles from MongoDB
  getSavedArticles: function() {
    return axios.get("/api/articles");
  },

  // Delete article from MongoDB via ID.
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
};
