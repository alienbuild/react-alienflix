import React, {Component} from 'react';

class Filters extends Component {

    render() {
        return (
            <form>
                <ul>
                    {this.props.genres.map(({ id, name }) => (
                        <li key={id}>
                            <label htmlFor="">
                                <input
                                    type="checkbox"
                                    name={id}
                                    onChange={this.props.updateMovies}
                                />
                                { name }
                            </label>
                        </li>
                    ))}
                </ul>
            </form>
        );
    }
}

export default Filters;