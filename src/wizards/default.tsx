import Header from '../components/Header'

import { GetRole } from '../utils/ReactActions'


interface WizardDefaultProps {
    user: any
    errorMessage: string | undefined
    title: string

    children?: any
}

export default function (props: WizardDefaultProps) {
    const GetBackgroundColor = (color: string) => ({
        backgroundColor: color
    })

    return (
        <div className='w-screen h-screen items-center flex flex-col overscroll-none'>
            <Header title='BR Gaming Users' />

            <div className='flex flex-row w-full h-full'>
                <div className='w-1/6 mr-10 h-full flex flex-col border-r border-blue-300' style={GetBackgroundColor(props.user.color)}>
                    <h1 className='text-custom-200 text-center text-2xl mt-10'>{ GetRole(props.user.role) }</h1>

                    <nav className='w-full py-20'>
                        <ul>
                            <li className='w-full mb-5 text-custom-300 border-b-2 border-custom-100 text-center bg-clip-text bg-gradient-to-r from-black to bg-slate-500 font-semibold transition duration-100 hover:border-custom-300'><a href='#users'>Usuários</a></li>
                            <li className='w-full mb-5 text-custom-300 border-b-2 border-custom-100 text-center bg-clip-text bg-gradient-to-r from-black to bg-slate-500 font-semibold transition duration-100 hover:border-custom-300'><a href='#store'>Minha Loja</a></li>
                            <li className='w-full mb-5 text-custom-300 border-b-2 border-custom-100 text-center bg-clip-text bg-gradient-to-r from-black to bg-slate-500 font-semibold transition duration-100 hover:border-custom-300'><a href='#operations'>Operações</a></li>
                        </ul>
                    </nav>
                </div>

                <div className="w-2/3 h-1/2 flex flex-col px-5 sm:w-1/2 sm:px-0">

                    <h2 className="text-center text-3xl text-custom-100 w-full my-20">{ props.title }</h2>

                    { props.errorMessage && <div
                        className='w-full p-2 rounded-md text-center font-semibold text-custom-800 bg-custom-200'
                    >
                        { props.errorMessage }
                    </div>}

                    { props.children }
                </div>
            </div>
        </div>
    )
}
