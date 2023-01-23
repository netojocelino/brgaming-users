interface ErrorPageProps {
    errorMessage: string
}

export default function (props: ErrorPageProps) {
    return (
        <div
            className='flex w-screen h-screen justify-center items-center text-center font-semibold text-custom-800 bg-custom-200'
        >
            <span>
                { props.errorMessage ?? 'Não foi possível abrir a página' }
            </span>
        </div>
    )
}
