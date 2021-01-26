import React from 'react';
import Quotes from './quotes';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


class QuoteAdd extends React.Component {

    handleClick = () => {
        console.log('this is:', this);
        this.state.quoteErrorText = "";
        this.state.quoteAuthorText = "";
        if (this.state.newQuote.quote === "") {
            this.state.quoteErrorText = "Empty quote";
        } 
        if (this.state.newQuote.author === "") {
            this.state.quoteAuthorText = "Empty author";
        }
        if (this.state.newQuote.quote !== "" && this.state.newQuote.author !== "") {
            this.state.quoteErrorText = "";
            this.state.quoteAuthorText = "";
            this.state.quotes.push(this.state.newQuote);
        }
        
        console.log('state:', this.state.quotes);
        fetch('http://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then((data) => {
            this.setState({ contacts: data })
        }).catch(console.log);
    }

    state = {
        contacts: [],
        quotes: [],
        newQuote: {
            quote: '',
            author: ''
        },
        quoteErrorText: '',
        quoteAuthorText: '',
    };

    setQuote = (e) => {
        this.state.newQuote.quote = e.target.value;
    }

    setAuthor = (e) => {
        this.state.newQuote.author = e.target.value;
    }

    render() {
        return (
            <div>
                <screenLeft>
                <Button variant="contained" color="primary" onClick={this.handleClick}>Add quote to database</Button>
                    <TextField
                        id="create-quote"
                        label="New Quote"
                        variant="filled"
                        onChange={this.setQuote}
                        error={this.state.quoteErrorText.length === 0 ? false : true }
                        helperText={this.state.quoteErrorText} />

                    <TextField
                        id="quote-author"
                        label="Author"
                        variant="filled"
                        onChange={this.setAuthor}
                        error={this.state.quoteAuthorText.length === 0 ? false : true}
                        helperText={this.state.quoteAuthorText} />

                <h1>Quote List</h1>
                <Quotes quotes={this.state.quotes} />
                </screenLeft>
            </div>
        );
    }
}

export default QuoteAdd
