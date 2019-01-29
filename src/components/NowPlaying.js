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
        return this.props.movies.map((movie) => (
           <MovieItem
               key={movie.id}
               movie={movie}
               genres={this.getGenres(movie.genre_ids, this.props.genres)}
           />
        ));
    }
}

// NowPlaying.propTypes = {
//     movies: PropTypes.array.isRequired
// };

export default NowPlaying;