import cls from 'classnames'

import './RadioButton.scss'

const RadioButton = ({ options, value, onSelect }) => {
    return <div className='RadioButton'>
        {Object.keys(options).map((opt, i) =>
            <div
                key={i} className={cls({ selected: value === opt })}
                onClick={() => onSelect(opt)}
            >{options[opt]}</div>)}
    </div>

}
export default RadioButton
