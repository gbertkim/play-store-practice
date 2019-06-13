import React from 'react';

export default function Play(props) {
  return (
    <div className="play">
      <h2>{ props.App }</h2>
      <div className="play_Category"> 
        Category: { props.Category }
      </div>
      <div className="play_Rating"> 
        Rating: {props.Rating }
      </div> 
      <div className="play_Genre">
        Genre: { props.Genres }
      </div>
      <div className="play_Installs">
        Installs: {props.Installs}
      </div>
    </div>
  );
}
