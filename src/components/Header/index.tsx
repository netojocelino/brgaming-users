import logo from '../assets/logo.svg'

interface HeaderProps {
    title: string
}

export default function (props: HeaderProps) {
    return (
        <div className='flex w-full justify-center border-b border-blue-300'>
            <h1 title={props.title}>
                <img
                    src={logo}
                    alt={props.title}
                    className='max-h-fit h-20' />
            </h1>
        </div>
    )
}
