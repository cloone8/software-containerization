import React from 'react'

const Quotes = ({ quotes }) => {
    return (
        <div>
            <screenLeft><h1>Quote List</h1></screenLeft>
            {quotes.map((quote) => (
                <div className="card">
                    <div className="card-body">
                        <h5 class="card-title">{"Author: " + quote.author}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{"Quote: " + quote.quote}</h6>
                        {/* <p class="card-text">{quote}</p> */}
                    </div>
                </div>
            ))}
        </div>
    )
};

export default Quotes
