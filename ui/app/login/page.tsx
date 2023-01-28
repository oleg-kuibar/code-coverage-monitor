'use client'

export default function LoginPage() {
    return (
        <>
            <h3 className="pt-4 text-2xl text-center">Welcome Back!</h3>
            <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="username">
                        Username / Email
                    </label>
                    <input
                        className="w-full px-3 py-2 text-sm leading-tight text-white-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="username"
                        type="email"
                        placeholder="Username"
                        required={true}
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-white-700 border border-red-500 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="******************"
                    />
                    <p className="text-xs italic text-red-500">Please choose a password.</p>
                </div>
                <div className="mb-6 text-center">
                    <button
                        className="w-full px-4 py-2 font-bold text-white bg-amber-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                        type="button"
                    >
                        Sign In
                    </button>
                </div>
                <hr className="mb-6 border-t"/>
                <div className="text-center">
                    <a
                        className="inline-block text-sm text-orange-500 align-baseline hover:text-orange-800"
                        href="#"
                    >
                        Forgot Password?
                    </a>
                </div>
                <div className="text-center">
                    <a
                        className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                        href="#"
                    >
                        Create an Account!
                    </a>
                </div>
            </form>
        </>
    );
}