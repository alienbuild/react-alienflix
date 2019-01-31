import React, { Component } from 'react';
import axios from 'axios';
import Filters from './components/filters/Filters';
import NowPlaying from './components/NowPlaying';
import './App.css';
import Logo from './assets/images/logo.svg'

// TMDB Info/Credentials
const base_url = "https://api.themoviedb.org/3/";
const api_key = "39b616a19667f17d8ffcaa175fc93491";

class App extends Component {

    // Init state
    state = {
        movies: [],
        genres: [],
        isLoaded: false,
        selectedMovies: [],
        filters: []
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
                selectedMovies: res.data.results,
                defaultData: res.data.results //this will store default data,
            }));
    }

    removeDuplicates = (arr, getHash) => {
        const seen = new Set();
        return arr.filter(candidate => {
            const hash = getHash(candidate);
            if (seen.has(hash)) return false;
            seen.add(hash);
            return true;
        })
    };

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
        // Grab Filter ID Number
        const eNum = parseInt(e.target.name);
        const activeFilters = this.state.filters;

        // Copy current state and init new state
        const currState = [...this.state.movies];
        let newState = "";

        // User wants to apply a filter
        if (e.target.checked) {

            // Create new state
            newState = currState.filter(movies => movies.genre_ids.includes(eNum));

            // Add filter ID into state array
            activeFilters.indexOf(eNum) === -1 ? activeFilters.push(eNum) : console.log("Checked", eNum);
            console.log('Active filters: ', activeFilters);

            // Set the states
            this.setState((prevState) => {
                if (prevState) {
                    return {
                        movies: newState,
                        filters: activeFilters,
                    }
                }
            });

        } else if (e.target.checked === false){
            // Remove filter ID from state array
            let filteredItems = activeFilters.filter(item => item !== eNum);
            console.log('Active filters: ', filteredItems);

            // Create new state
            const defaultState = [...this.state.defaultData];
            let myNewState = [];

            // Iterate each movie and cross reference genres
            defaultState.forEach(function (item) {
                item.genre_ids.filter(movies => {
                    if (filteredItems.includes(movies)) {
                        myNewState.push(item);
                    }
                });
            });

            // Remove any duplicates in state
             const filteredState = this.removeDuplicates(
                 myNewState,
                a => a.id
            );

            // Set the states
            this.setState(() => {
                return {
                    movies: filteredState.length === 0 ? this.state.defaultData : filteredState,
                    filters: filteredItems
                }
            });

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

    // Toggle Filters
    exposeFilters = (e) => {
        e.preventDefault();
        const el = document.querySelector('#filters');
        el.classList.toggle('active');
    };

  render() {
    return (
      <div className="App">
          <button id="toggle-filters" onClick={this.exposeFilters}></button>
          <header>
              <h1><a href="/" id="main-logo">
                  <img src={Logo} alt="AlienFlix Logo" width="200"/>
              </a></h1>
              <p>Find out what pixels humans are watching right now ...</p>
          </header>
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
