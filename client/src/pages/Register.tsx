import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";

const Register = () => {

  const navigate = useNavigate();

  const [password, setPassword] = useState("")
  const [strength, setStrength] = useState(0)
  const [confirmPassword, setConfirmPassword] = useState("")

  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [egn, setEgn] = useState("")
  const [fullNameCyrillic, setFullNameCyrillic] = useState("")
  const [fullNameLatin, setFullNameLatin] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [username, setUsername] = useState("")

  const { t } = useTranslation('register')

  
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  const newErrors = {
    egn: !egn.trim() ? `${t('egnEnter')}` : "",
    fullNameCyrillic: !fullNameCyrillic.trim() ? `${t('nameCyrillicEnter')}` : "",
    fullNameLatin: !fullNameLatin.trim() ? `${t('nameLatinEnter')}` : "",
    email: !email.trim() ? `${t('emailEnter')}` : "",
    phone: !phone.trim() ? `${t('phoneEnter')}` : "",
    address: !address.trim() ? `${t('addressEnter')}` : "",
    username: !username.trim() ? `${t('usernameEnter')}` : "",
    password: !password.trim()
      ? `${t('passwordEnter')}`
      : !isPasswordValid(password, strength)
      ? `${t('invalidPassword')}`
      : "",
      confirmPassword: !confirmPassword.trim()
      ? `${t('pleaseConfirmPassword')}`
      : confirmPassword !== password
      ? `${t('invalidPasswordConfirm')}`
      : ""
  };
  
  setErrors(newErrors);
  
  const hasErrors = Object.values(newErrors).some(error => error && error.length > 0);
  if (hasErrors) return;
  
  const lnchInput = document.querySelector('input[name="lnch"]') as HTMLInputElement;
  
  const userData = {
    egn,
    nameCyrillic: fullNameCyrillic,
    nameLatin: fullNameLatin,
    email,
    phone,
    address,
    username,
    password,
    isAdmin: false,
    lnch: lnchInput?.value || undefined
  };
  
  try {
    const response = await axios.post('http://localhost:5000/api/users', userData);
    const result = response.data;
  
    if (response.status === 200 || response.status === 201) {
      console.log('User registered:', result);
      navigate('/login');
    } else {
      console.error('Registration failed:', result.error);
    }
  } catch (err) {
    console.error('Error submitting form:', err);
  }
  };
  

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setUsername(value)
    if (value.trim() === "") {
      setErrors(prev => ({...prev, username: `${t('usernameEnter')}`}))
    } else if (/[\u0400-\u04FF]/.test(value)){
      setErrors(prev => ({...prev, username: `${t('invalidUsername   n')}`}))
    } else {  
      setErrors(prev => ({...prev, username: ""}))
    }
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setAddress(value)
    if (value.trim() === "") {
      setErrors(prev => ({...prev, address: `${t('addressEnter')}`}))
    }
    else{
      setErrors(prev => ({...prev, address: ""}))
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPhone(value)
    if(value.trim() === ""){
      setErrors(prev => ({...prev, phone: `${t('phoneEnter')}`}))
    }
    else if (!/^(?:\+359|0)\d{9}$/.test(value)){
      setErrors(prev => ({...prev, phone: `${t('invalidPhone')}`}))
    }
    else {
      setErrors(prev => ({...prev, phone: ""}))
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    if (value.trim() === "") {
      setErrors(prev => ({...prev, email: `${t('emailEnter')}`}))
    }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)){
      setErrors(prev => ({...prev, email: `${t('invalidEmail')}`}))
    } else {
      setErrors(prev => ({...prev, email: ""}))
    }
  }

  const handleFullNameLatinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFullNameLatin(value)
    if (value.trim() === "") {
      setErrors(prev => ({...prev, fullNameLatin: `${t('nameLatinEnter')}`}))
    }
    else if (!/^[A-Za-z\s]+$/.test(value)) {
      setErrors(prev => ({...prev, fullNameLatin: `${t('invalidLatinName')}`}))
    } else {
      setErrors(prev => ({...prev, fullNameLatin: ""}))
    }
  }

const handleFullNameCyrillicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value
  setFullNameCyrillic(value)
  if (value.trim() === "") {
    setErrors(prev => ({...prev, fullNameCyrillic: `${t('nameCyrillicEnter')}`}))
  }
  else if (!/^[\u0400-\u04FF\s]+$/.test(value)) {
    setErrors(prev => ({...prev, fullNameCyrillic: `${t('invalidCyrillicName')}`}))
  } else {
    setErrors(prev => ({...prev, fullNameCyrillic: ""}))
  }
}

  const handleEgnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEgn(value)
    if(value.trim() === "") {
      setErrors(prev => ({...prev, egn: `${t('egnEnter')}`}))
    }
    if (!/^\d{10}$/.test(value)) {
      setErrors(prev => ({...prev, egn: `${t('invalidEgn')}`}))
    } else {
      setErrors(prev => ({...prev, egn: ""}))
    }
  }

  const evaluatePasswordStrength = (pwd: string) => {
    if (pwd.length === 0) return 0
    if (pwd.length < 6) return 1
    const hasLetter = /[A-Za-z]/.test(pwd)
    const hasDigit = /\d/.test(pwd)

    if (hasLetter && hasDigit && pwd.length >= 12) return 4
    if (hasLetter && hasDigit && pwd.length >= 6) return 3
    if (hasLetter || hasDigit && pwd.length >= 6) return 2

    return 0
  }


  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPassword(value)

    const newStrength = evaluatePasswordStrength(value)
    setStrength(newStrength)

    if (value.trim() === "") {
      setErrors(prev => ({...prev, password: `${t('passwordEnter')}`}))
    } else if (!isPasswordValid(value, newStrength)) {
      setErrors(prev => ({ ...prev, password: `${t('invalidPassword')}` }))
    } else {
      setErrors(prev => ({...prev, password: ""}))
    }
  }

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setConfirmPassword(value)

    if (value.trim() === "") {
      setErrors(prev => ({...prev, confirmPassword: `${t('pleaseConfirmPassword')}`}))
    } else if (value !== password) {
      setErrors(prev => ({...prev, confirmPassword: `${t('invalidConfirmPassword')}`}))
    } else {
      setErrors(prev => ({...prev, confirmPassword: ""}))
    }
  }


  return (
    <>
    <div className="flex justify-center items-center min-h-screen my-10">
      <form noValidate onSubmit={handleSubmit} className="border-gray-200 border-1 w-full max-w-xl bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{t('header')}</h2>
        <p className="text-sm text-gray-600 mb-6">{t('headerText')}</p>

        <hr className="border-t border-gray-300 my-6"/>
        <p 
            className="text-sm relative text-gray-500 mb-4 flex items-center">
                <span className="absolute -left-3 text-red-500 mr-1">*</span>
                {t('requiredFields')}
        </p>
        <Input 
        label={t('egn')}
        name="egn" 
        value={egn}
        required
        onChange={handleEgnChange}
        error={errors.egn}/>
        <Input 
            label={t('lnc')} 
            name="lnch" 
            tooltip={[
                `${t('lncTooltip')}`
            ]}/>
        <Input 
        label={t('nameCyrillic')}
        name="fullNameCyrillic" 
        required
        value={fullNameCyrillic}
        onChange={handleFullNameCyrillicChange}
        error={errors.fullNameCyrillic} />

        <Input 
        label={t('nameLatin')}
        name="fullNameLatin" 
        required 
        value={fullNameLatin}
        onChange={handleFullNameLatinChange}
        error={errors.fullNameLatin}/>

        <Input 
        type="email" 
        label="E-mail:" 
        name="email" 
        required 
        value={email}
        onChange={handleEmailChange}
        error={errors.email}/>

        <Input 
        type="tel" 
        label={t('phone')} 
        name="phone" 
        required 
        value={phone}
        onChange={handlePhoneChange}
        error={errors.phone}/>

        <TextArea 
        label={t('address')}
        name="address" 
        required 
        value={address}
        onChange={handleAddressChange}
        error={errors.address}/>

        <Input 
        label={t('username')} 
        name="username" 
        required 
        value={username}
        onChange={handleUsernameChange}
        error={errors.username}/>

        <Input 
          type="password" 
          label={t('password')} 
          name="password" 
          required
          tooltip={[
            <b className="list-none">{t('passwordRequirements')}</b>,
              `${t('passwordTooltip1')}`,
              `${t('passwordTooltip2')}`,
              `${t('passwordTooltip3')}`,
              `${t('passwordTooltip4')}`
          ]} 
          value={password}
          onChange={handlePasswordChange}
          error={errors.password}
        />
        {/* Password strength indicator */}
        <div className="mb-4">
          <div className="h-2 w-full bg-gray-200 rounded">
            <div
              className={`h-2 rounded transition-all duration-300 ${
                strength === 0
                  ? "w-0"
                  :password.length < 6
                  ? "w-1/4 bg-red-500"
                  :password.length > 24
                  ? "w-1/4 bg-red-500"
                  : strength === 1
                  ? "w-1/4 bg-red-500"
                  : strength === 2
                  ? "w-2/4 bg-yellow-500"
                  : strength === 3
                  ? "w-3/4 bg-green-500"
                  : "w-full bg-green-500"
              }`}
            ></div>
          </div>
          <span className="text-xs text-gray-600">
            {password.length === 0
              ? `${t('passwordSecurity0')}`
              : !/^[\x00-\x7F]*$/.test(password)
              ? `${t('passwordSecurityInvalid')}`
              : password.length > 24
              ? `${t('passwordSecurityLength24')}`
              : password.length < 6
              ? `${t('passwordSecurityLength6')}`
              :strength === 1
              ? `${t('passwordSecurity1')}`
              : strength === 2
              ? `${t('passwordSecurity2')}`
              : strength === 3
              ? `${t('passwordSecurity3')}`
              : strength === 4
              ? `${t('passwordSecurity4')}`
              : `${t('passwordSecurity4')}`}
          </span>
        </div>
        <Input 
        type="password" 
        label={t('confirmPassword')} 
        name="confirmPassword" 
        required 
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        error={errors.confirmPassword}
        />

        <hr className="border-t border-gray-300 my-6"/>

        <p className="text-sm text-gray-600 my-4">
          {t('formFooterText')}
        </p>

        <button
          type="submit"
          className='w-full text-white py-2 px-4 cursor-pointer rounded transition duration-200 hover:bg-blue-600 bg-blue-800'
        >
          {t('registerBtn')}
        </button>
      </form>
    </div>
    <Footer />
    </>
  )
}

const Input = ({
  label,
  name,
  type = "text",
  required = false,
  tooltip = null,
  value,
  onChange,
  error
}: any) => {
  return (
    <div className="flex items-center mb-4 relative">
      <label htmlFor={name} className="w-1/3 relative text-sm font-medium text-gray-700">
        {required && <span className="absolute -left-3 text-red-500">*</span>}
        {label}
      </label>

      <div className="w-2/3 relative">
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          className={`w-full border border-gray-300 rounded-md p-2 pr-8 focus:outline-none focus:ring-1  ${error ? 'border-red-500' : 'border-gray-300 focus:ring-blue-400'}`}
          value={value}
          onChange={onChange}
        />
        {error && (
          <span className="text-sm mt-1 text-red-500">{error}</span>
        )}
        {tooltip && (
          <div className="absolute top-2 right-2 group">
            <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold cursor-default">?</span>
            <div className="absolute z-10 hidden group-hover:block bg-gray-100 border border-gray-300 text-xs text-gray-700 p-2 rounded shadow-md w-64 right-0 top-6">
              <ul className="list-disc list-inside space-y-1">
                {tooltip.map((item: string, index: number) => (
                  <li key={index} className={index === 0 ? "list-none mb-1" : ""}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
 

const TextArea = ({ label, name, required = false, value, onChange, error }: any) => {
    return (
        <div className="flex items-center mb-4">
            <label className="w-1/3 relative text-sm font-medium text-gray-700 mb-1" htmlFor={name}>
                {required && (<span className="absolute -left-3 text-red-500">*</span>)}
                {label}
            </label>
            
            <div className="w-2/3">
              <textarea
                  id={name}
                  name={name}
                  required={required}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                  value={value}
                  onChange={onChange}
              />
              {error && (
              <span className="text-sm mt-1 text-red-500">{error}</span>
              )}
            </div>
        </div>
    )
}

const isPasswordValid = (pwd: string, strength: number) => {
  if (!/^[\x00-\x7F]*$/.test(pwd)) return false
  if (pwd.length < 6) return false
  if (!/[A-Za-z]/.test(pwd)) return false
  if (!/\d/.test(pwd)) return false

  if (strength < 3) return false
  return (
    pwd.length >= 6 &&
    /[A-Za-z]/.test(pwd) &&
    /\d/.test(pwd) &&
    /^[\x00-\x7F]*$/.test(pwd)
  )
}

export default Register