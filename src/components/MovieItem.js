import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class MovieItem extends Component {
    render() {
        return (
            <li className="movie">
                <Link to={`/movie/${this.props.movie.id}`}>
                    <figure>
                        <img src={`https://image.tmdb.org/t/p/w185/${this.props.movie.poster_path}`} />
                    </figure>
                    <span className={this.props.movie.vote_average < 6 ? 'vote-avg low' : 'vote-avg high'}>{ this.props.movie.vote_average }</span>
                    <figcaption>
                        <h3>{ this.props.movie.title }</h3>
                        <ul className="genres">
                            {this.props.genres.map(genre => (
                                <li key={genre}>{genre}</li>
                            ))}
                        </ul>
                    </figcaption>
                </Link>
            </li>
        );
    }
}

MovieItem.propTypes = {
    movie: PropTypes.object.isRequired
};

export default MovieItem;