import React from "react";

// ArticleListItem renders a bootstrap list item containing data from the New York Times API
export const ArticleListItem = props => (
  <li className="list-group-item">
    <div className="container">
      <div className= "row">
        <div className= "col-md-10">
          <h3 className='articleHeadline'>
            <strong>  
              {props.title}  
            </strong> 
          </h3>
          <p>
            Publish Date: {props.date}
          </p>
          <a type="button" className="btn btn-primary" rel="noreferrer noopener" target="_blank" href={props.url}>Go to Article</a>
        </div>
        <div className= "col-md-2">
            <button type="button" className="btn btn-success btn-sm" onClick={props.onClick} id={props.id}>Save Article</button>
        </div>
      </div>
    </div>
  </li>
);
