import React, {Component} from 'react';
import MovieItem from './MovieItem';
import PropTypes from 'prop-types';

class NowPlaying extends Component {

    // Get genres for given movie
    getGenres = (genreIds, genres) => {

        return genreIds.map(genreId => {
            const filteredGenres = genres.find(genre => genre.id === genreId);
            if (genres === undefined || genres.length === 0) {
                return false;
            }
            return filteredGenres.name;
        })

    };



    render() {
        const movies = [...this.props.movies].sort( (a,b) => a.vote_average - b.vote_average ).reverse();
        return (
            <ul className="movie-list">
                {movies.map((movie) => (
                    <MovieItem
                        key={movie.id}
                        movie={movie}
                        genres={this.getGenres(movie.genre_ids, this.props.genres)}
                    />
                ))}
                <li className="movie">
                    <button className="pagination"></button>
                </li>
            </ul>
        );
    }
}

NowPlaying.propTypes = {
    movies: PropTypes.array.isRequired
};

export default NowPlaying;