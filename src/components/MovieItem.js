import React, {Component} from 'react';
import PropTypes from 'prop-types';

class MovieItem extends Component {
    render() {
        return (
            <li className="movie">
                <figcaption>
                    <img src={`https://image.tmdb.org/t/p/w185/${this.props.movie.poster_path}`} />
                </figcaption>
                <figcaption>
                    <p>{ this.props.movie.title }</p>
                    <ul className="genres">
                        {this.props.genres.map(genre => (
                            <li key={genre}>{genre}</li>
                        ))}
                    </ul>
                </figcaption>
            </li>
        );
    }
}

MovieItem.propTypes = {
    movie: PropTypes.object.isRequired
};

export default MovieItem;