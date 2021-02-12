import { useState } from 'react'
import './InitializePrompt.scss'
import RadioButton from './RadioButton';

const InitializePrompt = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [isModerator, setIsModerator] = useState(false)
    return <div className="InitializePrompt">
        <div className="content">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit(name,isModerator)
                }}>
                <div className="container">
                    <div className="header">
                        <h1>Panel Together</h1>
                    </div>
                    <div className="body">
                        <input
                            type="text" required placeholder="Name" name="name"
                            onChange={e => setName(e.target.value)} />

                        <RadioButton
                            options={{
                                panelist: 'Panelist',
                                moderator: 'Moderator'
                            }}
                            value={isModerator ? 'moderator' : 'panelist'}
                            onSelect={v => setIsModerator(v === 'moderator')}
                        />

                        <input type="submit" value="Join Panel" />
                    </div>
                </div>
            </form>
        </div>
    </div>
}

export default InitializePrompt;

