import React, { Component } from 'react';
import axios from 'axios';
import cloneDeep from 'lodash/cloneDeep';
import Filters from './components/filters/Filters';
import NowPlaying from './components/NowPlaying';
import './App.css';

// TMDB Info/Credentials
const base_url = "https://api.themoviedb.org/3/";
const api_key = "39b616a19667f17d8ffcaa175fc93491";

class App extends Component {

    // Init state
    state = {
        movies: [],
        genres: [],
        isLoaded: false
    };

    // Fire API on init
    componentWillMount() {
        // Fetch Genre Data
        axios.get(`${base_url}genre/movie/list?api_key=${api_key}`)
            .then(res => this.setState({ genres: res.data.genres }));

        // Fetch 'Now Playing' Data
        axios.get(`${base_url}movie/now_playing?api_key=${api_key}&language=en-US&page=1`)
            .then(res => this.setState({
                movies: res.data.results,
                isLoaded: true
            }));
    }

    // Update/Filter movies
    updateMovies = (e) => {
        if (e.target.checked) {
            const currState = [...this.state.movies];
            const newState = currState.filter(movies => movies.genre_ids.includes(parseInt(e.target.name)));
            this.setState(prevState => ({
                movies: newState
            }));
        } else {
            this.setState(prevState => ({
                movies: prevState.movies
            }));
            console.log(this.state.movies);
        }
    };

  render() {
    return (
      <div className="App">
          <Filters
              updateMovies={this.updateMovies}
              genres={this.state.genres}
              currentMovies={this.state.movies}
          />
          <NowPlaying
              movies={this.state.movies}
              genres={this.state.genres}
          />
      </div>
    );
  }
}

export default App;
