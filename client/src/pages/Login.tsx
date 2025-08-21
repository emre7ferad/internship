import { useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { PiFileLock } from "react-icons/pi";
import { BiMessageError } from "react-icons/bi";
import ContactsFooter from "../components/ContactsFooter";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";
import { loginUser } from "../services/authService";
import Input from "../components/LoginInput";

const Login: React.FC = () => {
    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [generalError, setGeneralError] = useState('')
    const auth = useAuth();
    const { t } = useTranslation('login')
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const newErrors = {
            username: !username.trim() ? `${t('errorUsername')}` : "",
            password: !password.trim() ? `${t('errorPassword')}` : "",  
        };

        setErrors(newErrors)
        const hasErrors = Object.values(newErrors).some(error => error && error.length > 0);

        if (hasErrors) return;

        try {
            const data = await loginUser(username, password);
            
            auth.login(data.token);
            navigate('/dashboard');
        } catch (err: any) {
            if (err.response && err.response.status === 401) {
                setUsername('');
                setPassword('');
                setErrors((prev) => ({
                    ...prev,
                    general: err.response.data?.error || `${t('invalidInput')}`
                }));
            } else {
                setGeneralError(`${t('serverError')}`);
            }
        }

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target as { name: "username" | "password"; value: string};

        name === 'username' ? setUsername(value) : setPassword(value);

        setErrors(prev => ({ ...prev, 
            [name]: value.trim() ? '' : 
                name === 'username' ? `${t('errorUsername')}` : `${t('errorPassword')}`
        }));
    }

    interface InfoCardProps {
        title: string;
        description: string;
        linkText: string;
        linkHref?: string;
        showDivider?: boolean;
        linkStyle?: string;
    }

    const InfoCard = ({ 
        title, 
        description, 
        linkText, 
        linkHref = "#", 
        showDivider = true, 
        linkStyle = "hover:underline hover:text-blue-800" 
    }: InfoCardProps) => {
        return (
            <div className="my-2">
                <h2 className="text-2xl mb-2">{title}</h2>
                <p className="text-gray-600">{description}</p>
                <a href={linkHref} className={`mt-2 mb-4 block ${linkStyle}`}>{linkText}&gt;</a>
                {showDivider && <hr className="text-gray-300"/>}
            </div>
        );
    };

    return (
        <div className="text-center items-center justify-center md:text-left">
            <div className="flex flex-col lg:flex-row items-center justify-center mt-6 md:mt-10">
                {/*Left side*/}
                <div className="w-full max-w-md md:mx-20 mb-6 md-mb-0">
                    {/*Login form section*/}
                    <div className="border border-gray-300 p-4 md:p-6 rounded-lg">
                        <form noValidate onSubmit={handleSubmit}>
                            <h1 className="text-xl mb-4">{t('loginFormHeading')}</h1>
                            <Input
                                label={t('username')}
                                name="username"
                                type="text"
                                required
                                value={username}
                                onChange={handleChange}
                                error={errors.username}
                                icon={FaUser}
                            />
                            <Input
                                label={t('password')}
                                name="password"
                                type="password"
                                required
                                value={password}
                                onChange={handleChange}
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

                            <a href="#" className="text-sm text-gray-500 mt-0 mb-4 block hover:underline">{t('forgotPassword')}</a>

                            <button 
                                type="submit"
                                className="w-full cursor-pointer bg-blue-800 text-2xl text-white py-2 px-2 hover:bg-blue-600"
                            >
                                {t('loginFibank')}
                            </button>
                            <a href="$" className="w-full block text-center mt-3 cursor-pointer bg-red-500 text-2xl text-white py-2 px-2 hover:bg-red-700"
                            >{t('loginEFibank')}
                            </a>
                        </form>
                    </div>

                    {/*section 2*/}
                    <div className="mt-3 border border-gray-300 p-4 md:p-6 rounded-lg">
                        <h2 className="text-center">{t('securedLogin')} <a href="https://www.thawte.com/tls-ssl/tls-ssl-certificates" className="text-blue-800">{t('sslCertificate')}</a> {t('from')} </h2>
                        <div className="justify-center my-2 flex items-center space-x-2">
                            <a href="#" className="inline-block">
                                <img src="/thawte-logo.png" alt="Thawte" className="block w-36 h-8" />
                            </a>
                            <p className="text-xs">2015-02-02</p>
                        </div>
                        <div className="justify-center flex items-center space-x-2 bg-gray-100 w-full">
                            <a href="#" className="flex items-center space-x-2 hover:underline hover:text-blue-800">
                                <PiFileLock/>
                                {t('securityTips')}&gt;
                            </a>
                            <span className='text-gray-300'>|</span>
                            <a href="#" className="flex items-center space-x-2 hover:underline hover:text-blue-800">
                                <BiMessageError/>
                                {t('errorMessages')}&gt;
                            </a>
                        </div>
                    </div>
                </div>

                {/*Right side*/}
                <div className="w-full max-w-md md:mx-20 lg:pr-26">
                    <section className="font-sans">
                        <InfoCard 
                        title={t('important')}
                        description={t('rightTxt1')}
                        linkText={t('readMore')}
                        />

                        <InfoCard 
                        title={t('checkSystem')}
                        description={t('rightTxt2')}
                        linkText={t('demoVersion')}
                        linkStyle="text-blue-800 font-semibold hover:underline"
                        />

                        <InfoCard 
                        title={t('bankingWithToken')}
                        description={t('rightTxt3')}
                        linkText={t('learnMore')}
                        showDivider={false}/>
                    </section>
                </div>
            </div>
            <ContactsFooter />
            <Footer/>
        </div>
    )
}

export default Login;