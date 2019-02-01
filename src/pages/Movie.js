import React, {Component} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";
import MovieItem from "../components/NowPlaying";

// TMDB Info/Credentials
const base_url = "https://api.themoviedb.org/3/";
const api_key = "39b616a19667f17d8ffcaa175fc93491";

class MoviePage extends Component {

    // Init state
    state = {
        movieData: [],
        trailers: [],
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

        axios.get(`${base_url}movie/${this.props.match.params.id}/videos?api_key=${api_key}&language=en-US`)
            .then(res => this.setState({
                trailers: res.data
            }))
    }

    toggleVideo = () => {

        // Grab video placeholder
        const trailers = document.querySelector('.trailer-wrap');
        trailers.classList.toggle('active');

        // Move poster out the way
        const poster = document.querySelector('.poster');
        poster.classList.toggle('active');

        // Set video
        const key = this.state.trailers.results[0].key;
        const iframe = document.querySelector('.trailer-wrap iframe');
        iframe.src = `https://www.youtube.com/embed/${key}`;

    };

    render() {
        let genres = [];
        if (this.state.isLoaded === true) {
            genres = this.state.movieData.genres.map((genre) => <li key={genre.id}>{genre.name}</li>)
        }
        return (
            <div id="movie-page">
                <button id="back"><Link to="/"></Link></button>
                <h1 className="title">{ this.state.movieData.title }</h1>
                <span className="tagline">{ this.state.movieData.tagline }</span>
                <ul className="meta-genre">
                    { genres }
                </ul>
                {/*Trailer Wrap Start*/}
                <div className="trailer-wrap" style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original/${this.state.movieData.backdrop_path})`
                }}>
                    <iframe width="100%" height="500" src={`https://www.youtube.com/embed/`} frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen></iframe>
                    <button id="toggle-video" onClick={this.toggleVideo}></button>
                </div>
                {/*Trailer Wrap End*/}

                {/*Main Start*/}
                <main>
                    <div className="column-1">
                        <img src={`https://image.tmdb.org/t/p/w500/${this.state.movieData.poster_path}`} className="poster"/>
                    </div>
                    <div className="column-2">
                        <h1 className="title">{ this.state.movieData.title }</h1>
                        <ul>
                            <li className={this.state.movieData.status === 'Released' ? 'status released' : 'status'}>{ this.state.movieData.status } </li>
                            <li>Runtime: { this.state.movieData.runtime }</li>
                            <li>homepage: { this.state.movieData.homepage }</li>
                            <li>IMDB ID: { this.state.movieData.imdb_id }</li>
                            <li>Vote Average: { this.state.movieData.vote_average }</li>
                            <li>Vote Count: { this.state.movieData.vote_count }</li>
                        </ul>
                        <h2>Overview</h2>
                        <p>{ this.state.movieData.overview }</p>
                    </div>
                </main>
                {/*Main End*/}

            </div>
        );
    }
}

export default MoviePage;