import React from 'react'

export type OptionItem = {
    label: string
    value: string
}

interface SelectProps {
    id?: string
    label?: string
    placeholder?: string
    selected: OptionItem
    items?: OptionItem[]
    onChange?: (ev: React.ChangeEvent<HTMLSelectElement>) => void
    className?: string
    required?: boolean
}

export const Select: React.FC<SelectProps> = ({
    id = crypto.randomUUID(),
    label = '',
    placeholder = '',
    selected,
    items = [],
    onChange = () => {},
    className = '',
    required = true,
}) => (
    <div className='flex items-center gap-2'>
        {label && <label htmlFor={id}>{label}</label>}

        <select
            id={id}
            value={selected.value}
            onChange={onChange}
            className={'bg-transparent py-0 outline-0 ' + (selected.value === '' ? 'text-gray-400 ' : '') + className}
            required={required}
        >
            <option disabled value=''>
                {placeholder || 'Please select an option'}
            </option>

            {items.map(item => (
                <option key={crypto.randomUUID()} value={item.value}>
                    {item.label}
                </option>
            ))}
        </select>
    </div>
)
