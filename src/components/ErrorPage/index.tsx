import { Link } from "react-router-dom"

interface ErrorPageProps {
    errorMessage: string | undefined
}

export default function (props: ErrorPageProps) {
    return (
        <div
            className='flex w-screen h-screen justify-center items-center text-center font-semibold text-custom-800 bg-custom-200 flex-col'
        >
            <span>
                { props.errorMessage ?? 'Não foi possível abrir a página' }
            </span>

            <Link to={'/'} >
                <button
                        className="w-full mt-4 px-10 py-5 bg-custom-100 hover:bg-custom-300rounded-md text-slate-50 font-semibold"
                        type="button"
                    >Ir para página inicial</button>

            </Link>
        </div>
    )
}
