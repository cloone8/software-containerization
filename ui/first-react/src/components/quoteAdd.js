import React from 'react';
import Contacts from './contacts';
import Quotes from './quotes';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


class QuoteAdd extends React.Component {

    handleClick = () => {
        console.log('this is:', this);
        if (this.state.newQuote === "") {
            this.state.errorText = "Empty quote";
        } else {
            this.state.errorText = "";
            this.state.quotes.push(this.state.newQuote);
        }
        console.log('state:', this.state);
        fetch('http://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then((data) => {
            this.setState({ contacts: data })
        }).catch(console.log)
    }

    state = {
        contacts: [],
        quotes: [],
        newQuote: "",
        errorText: ""
    };

    createQuote = (e) => {
        this.setState({newQuote: e.target.value})
        // this.state.newQuote.push(e.target.value);
    }

    render() {
        return (
            <div>
                <center>
                <Button variant="contained" color="primary" onClick={this.handleClick}>Add quote to database</Button>
                    <TextField
                        id="create-quote"
                        label="New Quote"
                        variant="filled"
                        onChange={this.createQuote}
                        error={this.state.errorText.length === 0 ? false : true }
                        helperText={this.state.errorText} />

                {/* <Contacts contacts={this.state.contacts} /> */}
                <Quotes quotes={this.state.quotes} />
                </center>
            </div>
        );
    }
}

export default QuoteAdd
