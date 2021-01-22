import React from 'react';
import Contacts from './contacts';


class QuoteAdd extends React.Component {

    handleClick = () => {
        console.log('this is:', this);
        fetch('http://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then((data) => {
            this.setState({ contacts: data })
        }).catch(console.log)
    }

    state = {
        contacts: []
    };

    render() {
        return (
            <div>
                <button onClick={this.handleClick}>
                    Add the booksq
                </button>

                <Contacts contacts={this.state.contacts} />
            </div>
        );
    }
}

export default QuoteAdd
