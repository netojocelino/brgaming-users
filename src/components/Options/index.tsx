interface SelectOptionItem {
    id: string
    value: string
    show?: boolean
}
interface OptionsProps {
    label: string
    placeholder: string
    inputValue: any
    inputHandler: any 
    items: SelectOptionItem[]
}

export default function (props: OptionsProps) {
    return (
        <div className="w-full space-x-4 flex">
            <label className="text-stone-600 w-1/4 font-semibold">
                { props.label }
            </label>
            <select className="p-1 text-md leading-6 text-slate-900 rounded ring-1 ring-custom-600 bg-[transparent] shadow-sm w-3/4">
                <option className="text-custom-100" value="">{ props.placeholder }</option>
                {props.items.map((option: SelectOptionItem) => (
                    <option
                        className="text-custom-100"
                        key={option.id}
                        value={option.id}
                        disabled={option.show === false}
                    >
                        {option.value}
                    </option>
                ))}
            </select>
        </div>
    )
}
