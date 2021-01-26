import React from 'react';
import Quotes from './quotes';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


class CommentAdd extends React.Component {

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
        currentAuthor: "Erik",
        commentAuthor: "",
        commentText: ""
    };

    render() {
        let commentButton;
        let commentTextField;
        let commentAuthor;
        if (this.state.quotes.length != 0) {
            commentButton = <Button variant="contained" color="primary" >Leave comment</Button>;
            commentTextField = <TextField
                                    id="create-comment"
                                    label="New comment"
                                    variant="filled" />;
            commentAuthor = <TextField
                                id="create-comment"
                                label="New comment"
                                variant="filled" />;
        }
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClick}>Get new quote</Button>
                <Quotes quotes={this.state.quotes} />
                {commentButton} {commentAuthor} {commentTextField}
            </div>
        );
    }
}

export default CommentAdd
