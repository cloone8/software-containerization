import React, {Component} from 'react';
import Contacts from './components/contacts';
import QuoteAdd from './components/quoteAdd'

class App extends Component {
    render() {
        return (
            <div>
                <QuoteAdd />
                <Contacts contacts={this.state.contacts} />
            </div>
        )
    }

    state = {
        contacts: []
    };

    componentDidMount() {
        fetch('http://jsonplaceholder.typicode.com/users')
            .then(res => res.json())
            .then((data) => {
                this.setState({ contacts: data })
            })
            .catch(console.log)
    }

    handleClick = () => {
        console.log('this is:', this);
    }
}

export default App;
