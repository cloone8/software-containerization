import React from 'react';
import Quotes from './quotes';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


class Comment extends React.Component {

    handleClick = () => {
        let addQuote = {"author" : this.state.currentAuthor,
                        "quote" : this.state.currentQuote};
        // addQuote.quote = this.state.currentQuote;
        // addQuote.auth = this.state.currentAuthor;
        this.state.quotes.push(addQuote);
        console.log(this.state.quotes);

        fetch('http://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then((data) => {
                this.setState({ contacts: data })
            }).catch(console.log);
    }

    state = {
        quotes: [],
        currentQuote: "This is a quote",
        currentAuthor: "Erik"
    };

    render() {
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClick}>Add quote to database</Button>
                <Quotes quotes={this.state.quotes} />
            </div>
        );
    }
}

export default Comment
