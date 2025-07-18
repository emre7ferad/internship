import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios';

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

  
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  const newErrors = {
    egn: !egn.trim() ? "Моля въведете ЕГН!" : "",
    fullNameCyrillic: !fullNameCyrillic.trim() ? "Моля въведете име!" : "",
    fullNameLatin: !fullNameLatin.trim() ? "Моля въведете име на латиница!" : "",
    email: !email.trim() ? "Моля въведете E-Mail!" : "",
    phone: !phone.trim() ? "Моля въведете телефон!" : "",
    address: !address.trim() ? "Моля въведете адрес!" : "",
    username: !username.trim() ? "Моля въведете потребителско име!" : "",
    password: !password.trim()
      ? "Моля въведете парола!"
      : !isPasswordValid(password, strength)
      ? "Паролата не отговаря на изискванията"
      : "",
      confirmPassword: !confirmPassword.trim()
      ? "Моля повторете паролата!"
      : confirmPassword !== password
      ? "Паролите не съвпадат"
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
      alert(`Грешка при регистрация: ${result.error}`);
    }
  } catch (err) {
    console.error('Error submitting form:', err);
    alert('Възникна грешка при изпращане на формата.');
  }
  };
  

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setUsername(value)
    if (value.trim() === "") {
      setErrors(prev => ({...prev, username: "Моля въведете потребителско име!"}))
    } else if (/[\u0400-\u04FF]/.test(value)){
      setErrors(prev => ({...prev, username: "Символи на кирилица не са позволени!"}))
    } else {  
      setErrors(prev => ({...prev, username: ""}))
    }
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setAddress(value)
    if (value.trim() === "") {
      setErrors(prev => ({...prev, address: "Моля въведете адрес!"}))
    }
    else{
      setErrors(prev => ({...prev, address: ""}))
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPhone(value)
    if(value.trim() === ""){
      setErrors(prev => ({...prev, phone: "Моля въведете телефон!"}))
    }
    else if (!/^(?:\+359|0)\d{9}$/.test(value)){
      setErrors(prev => ({...prev, phone: "Моля въведете правилен телефон!"}))
    }
    else {
      setErrors(prev => ({...prev, phone: ""}))
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEmail(value)
    if (value.trim() === "") {
      setErrors(prev => ({...prev, email: "Моля въведете E-mail!"}))
    }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)){
      setErrors(prev => ({...prev, email: "Невалиден E-Mail!"}))
    } else {
      setErrors(prev => ({...prev, email: ""}))
    }
  }

  const handleFullNameLatinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFullNameLatin(value)
    if (value.trim() === "") {
      setErrors(prev => ({...prev, fullNameLatin: "Моля въведете име на латиница!"}))
    }
    else if (!/^[A-Za-z\s]+$/.test(value)) {
      setErrors(prev => ({...prev, fullNameLatin: "Вашето име съдържа символи на кирилица!"}))
    } else {
      setErrors(prev => ({...prev, fullNameLatin: ""}))
    }
  }

const handleFullNameCyrillicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value
  setFullNameCyrillic(value)
  if (value.trim() === "") {
    setErrors(prev => ({...prev, fullNameCyrillic: "Моля въведете име!"}))
  }
  else if (!/^[\u0400-\u04FF\s]+$/.test(value)) {
    setErrors(prev => ({...prev, fullNameCyrillic: "Вашето име съдържа символи на латиница!"}))
  } else {
    setErrors(prev => ({...prev, fullNameCyrillic: ""}))
  }
}

  const handleEgnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setEgn(value)
    if(value.trim() === "") {
      setErrors(prev => ({...prev, egn: "Моля въведете ЕГН!"}))
    }
    if (!/^\d{10}$/.test(value)) {
      setErrors(prev => ({...prev, egn: "Невалидно ЕГН!"}))
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
      setErrors(prev => ({...prev, password: "Моля въведете парола!"}))
    } else if (!isPasswordValid(value, newStrength)) {
      setErrors(prev => ({ ...prev, password: "Паролата не отговаря на изискванията" }))
    } else {
      setErrors(prev => ({...prev, password: ""}))
    }
  }

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setConfirmPassword(value)

    if (value.trim() === "") {
      setErrors(prev => ({...prev, confirmPassword: "Моля повторете паролата!"}))
    } else if (value !== password) {
      setErrors(prev => ({...prev, confirmPassword: "Паролата не съвпада!"}))
    } else {
      setErrors(prev => ({...prev, confirmPassword: ""}))
    }
  }


  return (
    <div className="flex justify-center items-center min-h-screen mt-10">
      <form noValidate onSubmit={handleSubmit} className="border-gray-200 border-1 w-full max-w-xl bg-white p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Регистрация на нов потребител</h2>
        <p className="text-sm text-gray-600 mb-6">
          Тази регистрационна форма се попълва, само ако нямате потребител и парола
          за Виртуален банков клон (e-fibank) на ПИБ. Ако вече имате потребител и парола,
          добавянето на достъп до ново физическо или юридическо лице става в банката.
          Ако сте забравили своя потребител и/или парола, заповядайте в банката, за да ги получите.
        </p>

        <hr className="border-t border-gray-300 my-6"/>
        <p 
            className="text-sm relative text-gray-500 mb-4 flex items-center">
                <span className="absolute -left-3 text-red-500 mr-1">*</span>
                Задължителни полета
        </p>
        <Input 
        label="ЕГН:"
        name="egn" 
        value={egn}
        required
        onChange={handleEgnChange}
        error={errors.egn}/>
        <Input 
            label="ЛНЧ или паспорт:" 
            name="lnch" 
            tooltip={[
                "Попълва се само от чуждестранни граждани."
            ]}/>
        <Input 
        label="Име и фамилия на кирилица:" 
        name="fullNameCyrillic" 
        required
        value={fullNameCyrillic}
        onChange={handleFullNameCyrillicChange}
        error={errors.fullNameCyrillic} />

        <Input 
        label="Име и фамилия на латиница:" 
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
        label="Телефон:" 
        name="phone" 
        required 
        value={phone}
        onChange={handlePhoneChange}
        error={errors.phone}/>

        <TextArea 
        label="Адрес:" 
        name="address" 
        required 
        value={address}
        onChange={handleAddressChange}
        error={errors.address}/>

        <Input 
        label="Потребителско име:" 
        name="username" 
        required 
        value={username}
        onChange={handleUsernameChange}
        error={errors.username}/>

        <Input 
          type="password" 
          label="Парола за вход:" 
          name="password" 
          required
          tooltip={[
            <b className="list-none">Изисквания за парола:</b>,
              "Да е с дължина от 6 до 24 знака.",
              "Да съдържа поне една буква.",
              "Да съдържа поне една цифра.",
              "Да е на латиница."
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
              ? "Сигурност на парола"
              : !/^[\x00-\x7F]*$/.test(password)
              ? "Паролата съдържа невалидни символи"
              : password.length > 24
              ? "Паролата е твърде дълга"
              : password.length < 6
              ? "Паролата е твърде къса"
              :strength === 1
              ? "Паролата е твърде слаба"
              : strength === 2
              ? "Паролата е средно сигурна"
              : strength === 3
              ? "Паролата е с високо ниво на сигурност"
              : strength === 4
              ? "Паролата е максимално сигурна"
              : "Паролата е максимално сигурна"}
          </span>
        </div>
        <Input 
        type="password" 
        label="Повторете паролата:" 
        name="confirmPassword" 
        required 
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        error={errors.confirmPassword}
        />

        <hr className="border-t border-gray-300 my-6"/>

        <p className="text-sm text-gray-600 my-4">
          Необходимо е да запомните потребителското си име и парола, които току-що 
          въведохте. След като потвърдите регистрацията в банката, те ще Ви служат за вход
          във Виртуалeн банков клон (e-fibank).
        </p>

        <button
          type="submit"
          className='w-full text-white py-2 px-4 cursor-pointer rounded transition duration-200 hover:bg-blue-600 bg-blue-800'
        >
          ИЗПРАТЕТЕ ИСКАНЕ ЗА РЕГИСТРАЦИЯ
        </button>
      </form>
    </div>
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