import React from 'react';
import './App.css';
import InitializePrompt from './InitializePrompt';
import MainWindow from './MainWindow';

const socket = window.io(process.env.REACT_APP_API_ROOT);
class App extends React.Component {
    state = {
        self: {
            id: null,
            name: null,
            raisedHand: false,
            goFaster: false,
            isModerator: false
        },
        users: [],
        messages: []
    }

    constructor() {
        super()
        this.socket = socket
        console.log(this.socket)

        this.socket.on('connect', () => {
            this.setState({
                self: { ...this.state.self, id: this.socket.id }
            })
            this.socket.emit('update', this.state.self)
        })

        this.socket.on('update', users => this.setState({ users }))

        this.socket.on('broadcast', (message, user) => this.setState({
            messages: this.state.messages.concat([{ message, user }])
        }))
    }

    render() {
        const initialized = !!this.state.self.name;
        return <div className="App">
            {initialized
                ? <MainWindow
                    self={this.state.self}
                    users={this.state.users}
                    messages={this.state.messages}
                    onUpdate={update => {
                        this.socket.emit('update', update)
                    }}/>
                : <InitializePrompt onSubmit={(name, isModerator) => {
                    this.setState({
                        self: { ...this.state.self, name, isModerator }
                    }, () => {
                        this.socket.emit('update', this.state.self)
                    })
                }} />
            }
        </div>
    }
}


export default App;
