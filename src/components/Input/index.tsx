interface InputProps {
    label: string
    type: string
    disabled?: boolean | false
    placeholder?: string
    inputValue: any
    inputHandler: any 
}

export default function (props: InputProps) {
    return (
        <div className="w-full space-x-4 flex">
            <label className="text-stone-600 w-1/4 font-semibold">
                { props.label }
            </label>
            <input
                value={props.inputValue}
                onChange={props.inputHandler}
                type={props.type}
                disabled={props.disabled}
                placeholder={props?.placeholder}
                className="p-1 text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md ring-1 ring-custom-600 shadow-sm w-3/4"
            />
        </div>
    )
}
