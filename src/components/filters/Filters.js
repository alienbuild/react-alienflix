import React, {Component} from 'react';

class Filters extends Component {

    // Init state for range input
    state = {
      value: 3
    };

    // Handle range slider input change
    handleChange = (e) => {
        this.setState({value: e.target.value});
        this.props.superFilter(e);
    };

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
                                    onChange={this.handleChange}
                                />
                                { name }
                            </label>
                        </li>
                    ))}
                </ul>
                <ul>
                    <li>
                        Vote Average:
                        <br />
                        <input
                            type="range"
                            name="points"
                            min="0"
                            max="10"
                            step="0.5"
                            value={this.state.value}
                            onChange={this.handleChange}
                        />
                    </li>
                </ul>
            </form>
        );
    }
}

export default Filters;