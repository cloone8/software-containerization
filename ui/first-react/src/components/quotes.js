import React, { Component } from 'react'

const Quotes = ({ quotes }) => {
    return (
        <div>
            <center><h1>Quote List</h1></center>
            {quotes.map((quote) => (
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{quote}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{quote}</h6>
                        <p class="card-text">{quote}</p>
                    </div>
                </div>
            ))}
        </div>
    )
};

export default Quotes
