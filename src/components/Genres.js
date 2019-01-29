import React, {Component} from 'react';

class Genres extends Component {
    render() {
        return (
            <small>
                { this.props.genreList.map((genre) => {
                    return <p>{genre}</p>
                }) }
            </small>
        );
    }
}


export default Genres;