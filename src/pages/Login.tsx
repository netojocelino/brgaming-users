import logo from '../assets/logo.svg'

export default function Home () {
    return (
        <div className='w-screen h-screen items-center flex flex-col'>
            <div className='flex w-full justify-center border-b border-blue-300'>
                <h1 title="BR Gaming Users">
                    <img
                        src={logo}
                        alt="BR Gaming Users"
                        className='max-h-fit h-20' />
                </h1>
            </div>

            <div className="w-1/2 h-1/2 flex flex-col">

                <h2 className="text-center text-3xl text-custom-100 w-full mt-20">Entre na sua conta</h2>

                <form className="w-full h-3/4 flex justify-center items-center flex-col space-y-5">
                    <div className="w-full space-x-4 flex">
                        <label className="text-stone-600 w-1/4 font-semibold">
                            Login
                        </label>
                        <input
                            type="text"
                            placeholder="Digite seu Login"
                            className="p-1 text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md ring-1 ring-custom-600 shadow-sm w-3/4"
                        />
                    </div>

                    <div className="w-full space-x-4 flex">
                        <label className="text-stone-600 w-1/4 font-semibold">
                            Senha
                        </label>
                        <input
                            type="password"
                            placeholder="Digite sua senha"
                            className="p-1 text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md ring-1 ring-custom-600 shadow-sm w-3/4"
                        />
                    </div>

                    <div className="w-full flex justify-center items-center">
                        <button
                            className="w-full bg-custom-200 hover:bg-custom-300 p-2 rounded-md text-slate-50 font-semibold"
                            type="submit"
                        >Enviar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
