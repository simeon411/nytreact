import React, { Component } from "react";
import API from "../../utils/API";
// import { List, ListItem } from "../../components/List";
import { ArticleList, ArticleListItem } from "../../components/SavedArticleList";

class Saved extends Component {
  // Setting our component's initial state
  state = {
    articles: [],
    title: "",
    author: "",
    synopsis: ""
  };

  // When the component mounts, load all articles and save them to this.state.articles
  componentDidMount() {
    this.loadArticles();
  }

  // Loads all articles  and sets them to this.state.articles
  loadArticles = () => {
    API.getSavedArticles()
      .then(res =>
        this.setState({ articles: res.data })
      )
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads articles from the db
  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };


  render() {
    return (
      <div className="container"> 
                <div className="row">
            <div className="col-sm-12">
              <br/>

              
              <div className="panel panel-primary">

                
                <div className="panel-heading">
                  <h3 className="panel-title"><strong><i className="fa fa-table"></i>   Saved Articles</strong></h3>
                </div>

                
                <div className="panel-body" id="well-section">
                  <ArticleList>
                    {this.state.articles.map(article => {
                      return (
                        <ArticleListItem
                          key={article._id}
                          id={article._id}
                          title={article.title}
                          url={article.url}
                          onClick={() => this.deleteArticle(article._id)}
                        />
                      );
                    })}
                  </ArticleList>
                </div>
              </div>
            </div>
          </div> 
      </div> 
    );
  }
}

export default Saved;
