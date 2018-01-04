import React, { Component } from "react";
import API from "../../utils/API";
// import { List, ListItem } from "../../components/List";
import { ArticleList, ArticleListItem } from "../../components/ArticleList";

class Home extends Component {
  // Setting our component's initial state
  state = {
    articles: [],
    topic: "",
    startYear: "",
    endYear: ""
  };


  handleFormSubmit = event => {
    // When the form is submitted, prevent its default behavior, get recipes update the recipes state
    event.preventDefault();
    API.getArticles(this.state.topic)
      .then(res => {
        this.setState({ articles: res.data.response.docs }, () => (console.log(this.state.articles)))
      })
      .catch(err => console.log(err));
  };

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // When the button is clicked, use the API.saveArticle method to save the book data
  // Then reload books from the database
  saveArticle = article => {
    console.log(article)
      API.saveArticle({
        title: article.headline.main,
        url: article.web_url,
        _id: article._id
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
  };


  render() {
    return (
        <div className="container">
          <div className="jumbotron">
            <h1 className="text-center"><strong><i className="fa fa-newspaper-o"></i> New York Times Search</strong></h1>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <br/>
              <div className="panel panel-primary">
                <div className="panel-heading">
                  <h3 className="panel-title"><strong><i className="fa  fa-list-alt"></i>   Search Parameters</strong></h3>
                </div>
                <div className="panel-body">
                  <form >

                    <div className="form-group">
                      <label> Topic:</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="search-term"
                        value={this.state.topic}
                        onChange={this.handleInputChange}
                        name="topic"
                        placeholder="Topic of Article" 
                      />
                    </div>

                    <div className="form-group">
                      <label>Start Year (Optional):</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="start-year"
                        value={this.state.startYear}
                        onChange={this.handleInputChange}
                        name="startYear"
                        placeholder="1950"
                      />
                    </div>

                    <div className="form-group">
                      <label>End Year (Optional):</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="end-year"
                        value={this.state.endYear}
                        onChange={this.handleInputChange}
                        name="endYear"
                        placeholder="2017"
                      />
                    </div>

                    <button type="submit" className="btn btn-default" id="run-search" onClick={this.handleFormSubmit}>
                      <i className="fa fa-search"></i> Search
                    </button>
                    

                  </form>
                </div>
              </div>
            </div>
          </div>
          

          <div className="row">
            <div className="col-sm-12">
              <br/>

              
              <div className="panel panel-primary">

                
                <div className="panel-heading">
                  <h3 className="panel-title"><strong><i className="fa fa-table"></i>   Top Articles</strong></h3>
                </div>

                
                <div className="panel-body" id="well-section">
                  <ArticleList>
                    {this.state.articles.map(article => {
                      return (
                        <ArticleListItem
                          key={article._id}
                          id={article._id}
                          title={article.headline.main}
                          url={article.web_url}
                          date={article.pub_date}
                          onClick={() => this.saveArticle(article)}
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

export default Home;
