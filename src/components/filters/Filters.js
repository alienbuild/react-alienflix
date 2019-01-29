import React from 'react';

const Filters = props => (
    <form>
        <input type="checkbox" onChange={props.updateMovies} />
    </form>
);

export default Filters;