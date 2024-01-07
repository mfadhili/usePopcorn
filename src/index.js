import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import StarRating from "./components/StarRating";


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
      {/*<StarRating
          maxRating={5} className={"test"}
          messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
          defaultRating={3}
      />
      <StarRating maxRating={5} color={"red"} size={24}/>

      <Test/>*/}
  </React.StrictMode>
);


function Test() {
    const [movieRating, setMovieRating] = useState(0)
    return (
        <div>
            <StarRating color={"blue"} maxRating={10} onSetRating={setMovieRating}/>
            <p>This movie was rated {movieRating} stars</p>
        </div>
    );
}
