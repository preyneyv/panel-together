import { useState } from 'react'
import cls from 'classnames'
import RadioButton from './RadioButton'
import './MainWindow.scss'


const UserBubble = ({ self, user }) => {
    const state = user.raisedHand ? 'hand' : (user.goFaster ? 'time' : 'none')
    return <div className='user'>
        <div className={cls('bubble', state)}>
            <div className={'symbol-container'}>
                <div className={cls({ show: state === 'hand' })}>✋</div>
                <div className={cls({ show: state === 'none' })}>{user.isModerator ? '⚖️' : '🎤'}</div>
                <div className={cls({ show: state === 'time' })}>⌛</div>
            </div>
        </div>
        <div className='name'>{self ? 'You' : user.name}</div>
    </div>
}

const MainWindow = ({ self, users, messages, onUpdate }) => {
    const [state, setState] = useState('none')

    return <div className='MainWindow'>
        <header>
            <h1>Panel Together</h1>
        </header>
        <article>
            <section>
                <h3 className='section-title'>Panelists</h3>
                <div className='user-list'>
                    {users.map(u =>
                        <UserBubble
                            key={u.id} user={u}
                            self={u.id === self.id} />)}
                </div>
            </section>
            <section>
                <h3 className='section-title'>You</h3>
                <RadioButton
                    options={{
                        hand: 'Raise Hand',
                        none: 'None',
                        time: 'Out of Time'
                    }}
                    value={state}
                    onSelect={v => {
                        setState(v)
                        onUpdate({
                            raisedHand: v === 'hand',
                            goFaster: v === 'time'
                        })
                    }}
                />
            </section>
        </article>
    </div>
}

export default MainWindow;
