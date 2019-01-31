import React, {Component} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

// TMDB Info/Credentials
const base_url = "https://api.themoviedb.org/3/";
const api_key = "39b616a19667f17d8ffcaa175fc93491";

class MoviePage extends Component {

    // Init state
    state = {
        movieData: [],
        isLoaded: false
    };

    // Fire API on init
    componentDidMount() {

        // Fetch requested movie data
        axios.get(`${base_url}movie/${this.props.match.params.id}?api_key=${api_key}&language=en-US`)
            .then(res => this.setState({
                movieData: res.data,
                isLoaded: true
            }))
            .catch(err => console.log(err));
    }

    toggleVideo = () => {
        alert('Video');
    };

    render() {
        return (
            <div id="movie-page">
                <button id="back"><Link to="/"></Link></button>

                <div className="row">
                    <figure id="poster">
                        <img src={`https://image.tmdb.org/t/p/w500/${this.state.movieData.poster_path}`}/>
                        <button id="toggle-video" onClick={this.toggleVideo}></button>
                    </figure>
                    <figcaption>
                        <ul>
                            <li><h1>{ this.state.movieData.title }</h1></li>
                            <li>{ this.state.movieData.tagline }</li>
                        </ul>
                        <p>{ this.state.movieData.overview }</p>
                    </figcaption>
                </div>

                <ul>
                    <li>Status: { this.state.movieData.status }</li>
                    <li>Runtime: { this.state.movieData.runtime }</li>
                    <li>homepage: { this.state.movieData.homepage }</li>
                    <li>IMDB ID: { this.state.movieData.imdb_id }</li>
                </ul>
            </div>
        );
    }
}

export default MoviePage;