import React from 'react'
import Button from '@material-ui/core/Button';


const handleClick = (quote, quotes) => {
    var toRemove = JSON.parse(JSON.stringify(quote));
    const deleteQuote = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    };
    fetch(window.REST_API_URL + 'quote/' + toRemove.id, deleteQuote)
        .then(response => response.json());

    window.location.reload(); 
}

const Quotes = ({ quotes }) => {
    return (
        <div>
            {quotes.map((quote) => (
                <div className="card">
                    <div className="card-body">
                        <h5 class="card-title">{"Author: " + quote.author}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{"Quote: " + quote.content}</h6>
                        <Button variant="contained" color="primary" onClick={() => handleClick(quote, quotes)}>Delete Quote</Button>
                    </div>
                </div>
            ))}
        </div>
    )
};

export default Quotes
