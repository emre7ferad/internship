import { useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { PiFileLock } from "react-icons/pi";
import { BiMessageError } from "react-icons/bi";
import ContactsFooter from "../components/ContactsFooter";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type LoginProps = {
    setLoggedIn: (value: boolean) => void;
};

const Login: React.FC<LoginProps> = ({ setLoggedIn }) => {
    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [generalError, setGeneralError] = useState('')

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const newErrors = {
            username: !username.trim() ? "Моля, въведете потребител!" : errors.username || "",
            password: !password.trim() ? "Моля, въведете парола!" : errors.password || "",  
        }

        setErrors(newErrors)
        const hasErrors = Object.values(newErrors).some(error => error && error.length > 0)

        if (hasErrors) return

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {username, password });

            const data = response.data;

            localStorage.setItem('token', data.token);
            setLoggedIn(true)
            navigate ('/dashboard')
        } catch (err: any) {
            if (err.response && err.response.status === 401) {
                // Show backend error message if present, otherwise show default
                setErrors((prev) => ({
                    ...prev,
                    general: err.response.data?.error || "Невалиден потребител или парола"
                }));
            } else {
                setGeneralError('Сървърна грешка. Опитайте по-късно.');
            }
        }

    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setPassword(value)

        if (value.trim() === '') {
            setErrors(prev => ({...prev, password: 'Моля, въведете парола!'}))
        } else {
            setErrors(prev => ({...prev, password: ''}))
        }
    }

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setUsername(value)

        if (value.trim() === '') {
            setErrors(prev => ({...prev, username: 'Моля, въведете потребител!'}))
        } else {
            setErrors(prev => ({...prev, username: ''}))
        }
    }

    return (
        <div>
            <div className="flex justify-center items-center mt-10">
                {/*Left side*/}
                <div className="mx-20">
                    {/*Login form section*/}
                    <div className="border border-gray-300 p-6 rounded-lg">
                        <form noValidate onSubmit={handleSubmit}>
                            <h1 className="text-xl mb-4">Виртуален банков клон (e-Fibank)</h1>
                            <Input
                                label="Потребител:"
                                name="username"
                                type="text"
                                required
                                value={username}
                                onChange={handleUsernameChange}
                                error={errors.username}
                                icon={FaUser}
                            />
                            <Input
                                label="Парола:"
                                name="password"
                                type="password"
                                required
                                value={password}
                                onChange={handlePasswordChange}
                                error={errors.password}
                                icon={FaLock}
                            />

                            {errors.general && (
                                <div className="text-red-600 text-sm flex items-center gap-1 mb-2">
                                    {errors.general}
                                </div>
                            )}
                            {generalError && (
                                <div className="text-red-600 text-sm flex items-center gap-1 mb-2">
                                    {generalError}
                                </div>
                            )}

                            <a href="#" className="text-sm text-gray-500 mt-0 mb-4 block hover:underline">Забравена парола?</a>

                            <button className="w-full cursor-pointer bg-blue-800 text-2xl text-white py-2 px-2 hover:bg-blue-600">
                                ВХОД В  MY FIBANK
                            </button>
                            <a href="$" className="w-full block text-center mt-3 cursor-pointer bg-red-500 text-2xl text-white py-2 px-2 hover:bg-red-700">ВХОД В E-FIBANK</a>
                        </form>
                    </div>

                    {/*section 2*/}
                    <div className="items-center mt-3 border border-gray-300 p-2 rounded-lg w-full">
                        <h2 className="text-center">Защитен вход със <a href="#" className="text-blue-800">SSL сертификат</a> от: </h2>
                        <div className="justify-center my-2 flex items-center space-x-2">
                            <a href="#" className="inline-block">
                                <img src="/thawte-logo.png" alt="Thawte" className="block w-36 h-8" />
                            </a>
                            <p className="text-xs">2015-02-02</p>
                        </div>
                        <div className="justify-center flex items-center space-x-2 bg-gray-100 w-full">
                            <a href="#" className="flex items-center space-x-2 hover:underline hover:text-blue-800">
                                <PiFileLock/>
                                Съвети за сигурност&gt;
                            </a>
                            <span className='text-gray-300'>|</span>
                            <a href="#" className="flex items-center space-x-2 hover:underline hover:text-blue-800">
                                <BiMessageError/>
                                Съобщения за грешка&gt;
                            </a>
                        </div>
                    </div>
                </div>

                {/*Right side*/}
                <div>
                    <section className="mx-20 font-sans">
                        <div className="my-2">    
                            <h2 className="text-2xl mb-2">ВАЖНО!</h2>
                            <p className="text-gray-600">ПИБ АД УВЕДОМЯВА КАРТОДЪРЖАТЕЛИТЕ <br />си, че има информация за получени фалшиви <br />съобщения по електронната поща, които... <br /></p>
                            <a href="#" className="mt-2 mb-4 block hover:underline hover:text-blue-800">Прочетете повече&gt;</a>
                            <hr className="text-gray-300"/>
                        </div>

                        <div className="my-2">
                            <h2 className="text-2xl mb-2">Разгледайте системата</h2>
                            <p className="text-gray-600">Разгледайте и усетете онлайн банкирането <br />чрез интерактивната ни демо версия. <br /></p>
                            <a href="#" className="mt-2 mb-4 block text-blue-800 font-semibold hover:underline">ДЕМО ВЕРСИЯ&gt;</a>
                            <hr className="text-gray-300 "/>
                        </div>

                        <div className="my-2">
                            <h2 className="text-2xl mb-2">Банкиране с Token</h2>
                            <p className="text-gray-600">Мобилност, удобство и сигурност в едно, <br />с нашето Token устройство за генериране <br />на еднократни пароли за вход. <br /></p>
                            <a href="#" className="mt-2 mb-4 block hover:underline hover:text-blue-800">Научете повече&gt;</a>
                        </div>
                    </section>
                </div>
            </div>
            <ContactsFooter />
        </div>
    )
}

const Input = ({
    label,
    name,
    type,
    required,
    value,
    onChange,
    error,
    icon: Icon,
}: any) => {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-md font-medium text-gray-700 mb-1">
                {required && <span className="text-red-500">*</span>} {label}
            </label>
            <div className="w-full relative">
                {Icon && (
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        <Icon />
                    </div>
                )}
                <input 
                 id={name}
                 name={name}
                 type={type}
                 value={value}
                 onChange={onChange}
                 className={`${Icon ? 'pl-10' : ''} w-full border border-gray-300 rounded-md p-2 pr-8 focus:outline-none focus:ring-1  ${error ? 'border-red-500' : 'border-gray-300 focus:ring-blue-400'}`}
                />
            </div>
            <span className="block text-sm mt-1 min-h-[1.25rem] text-red-500">
                {error || "\u00A0"}
            </span>
        </div>
    )
}

export default Login;