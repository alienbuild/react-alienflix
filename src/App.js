import React, { Component } from 'react';
import axios from 'axios';
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
        isLoaded: false,
        selectedMovies: []
    };

    // Fire API on init
    componentDidMount() {
        // Fetch Genre Data
        axios.get(`${base_url}genre/movie/list?api_key=${api_key}`)
            .then(res => this.setState({ genres: res.data.genres }));

        // Fetch 'Now Playing' Data
        axios.get(`${base_url}movie/now_playing?api_key=${api_key}&language=en-US&page=1`)
            .then(res => this.setState({
                movies: res.data.results,
                isLoaded: true,
                defaultData: res.data.results //this will store default data
            }));
    }

    // Super filter
    superFilter = (e) => {
        if (e.target.type === "checkbox") {
            // User wants to filter by genre
            this.genreFilter(e);
        } else if (e.target.type === "range") {
            // User wants to filter by popularity
            this.popularityFilter(e);
        }
    };

    // Update / Filter movies by Genre
    genreFilter = (e) => {
        if (e.target.checked) {
            const currState = [...this.state.movies];
            const newState = currState.filter(movies => movies.genre_ids.includes(parseInt(e.target.name)));
            this.setState(() => ({
                movies: newState
            }));
        } else {
            this.setState ({ movies: this.state.defaultData }); // default data
        }
    };

    // Update / Filter movies by Popularity
    popularityFilter = (e) => {
        const currState = [...this.state.defaultData];
        const newState = currState.filter(movies => movies.vote_average > e.target.value);
        this.setState(() => ({
            movies: newState
        }));
    };

  render() {
    return (
      <div className="App">
          <Filters
              genreFilter={this.genreFilter}
              genres={this.state.genres}
              superFilter={this.superFilter}
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
