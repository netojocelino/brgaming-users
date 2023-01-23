import Header from '../components/Header'

interface WizardGuestProps {
    errorMessage: string | undefined
    title: string

    children?: any
}

export default function (props: WizardGuestProps) {
    return (
        <div className='w-screen h-screen items-center flex flex-col overscroll-none'>
            <Header title='BR Gaming Users' />

            <div className="w-full h-1/2 flex flex-col px-5 sm:w-1/2 sm:px-0">

                <h2 className="text-center text-3xl text-custom-100 w-full mt-20 mb-10">{ props.title }</h2>

                { props.errorMessage && <div
                    className='w-full p-2 rounded-md text-center font-semibold text-custom-800 bg-custom-200'
                >
                    { props.errorMessage }
                </div>}

                <form className="w-full h-3/4 flex justify-center items-center flex-col space-y-5 mt-5">
                    { props.children }
                </form>
            </div>
        </div>
    )
}
