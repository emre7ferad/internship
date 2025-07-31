import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Footer from "../components/Footer";
import Input from "../components/RegisterInput";
import TextArea from "../components/TextArea";
import { useForm } from "../hooks/useForm";
import { evaluatePasswordStrength } from "../hooks/passwordUtils";
import { registerUser } from "../services/userService";
import type { RegisterData } from "../services/userService";
import PasswordStrengthIndicator from "../components/PasswordStrengthIndicator";

const Register = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('register');
  const [strength, setStrength] = React.useState(0);
  const [serverError, setServerError] = React.useState('');

  const { formData, errors, handleChange, validateForm } = useForm({
    egn: "",
    fullNameCyrillic: "",
    fullNameLatin: "",
    email: "",
    phone: "",
    address: "",
    username: "",
    password: "",
    confirmPassword: ""
  }, t);

  const handlePasswordChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    handleChange('password', value);
    setStrength(evaluatePasswordStrength(value));
  }, [handleChange]);

  const handleSubmit = React.useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');

    if (!validateForm()) return;

    const lnchInput = document.querySelector('input[name="lnch"]') as HTMLInputElement;

    const userData: RegisterData = {
      egn: formData.egn,
      nameCyrillic: formData.fullNameCyrillic,
      nameLatin: formData.fullNameLatin,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      username: formData.username,
      password: formData.password,
      isAdmin: false,
      lnch: lnchInput?.value || undefined
    };

    try {
      await registerUser(userData);
      navigate('/login');
    } catch (err: any) {
      console.error('Registration error:', err);
      setServerError(err.error || t('unexpectedError'));
      
      if (err.response?.data?.errors) {
        Object.entries(err.response.data.errors).forEach(([key]) => {
          handleChange(key, formData[key]);
        });
      }
    }
  }, [formData, navigate, t, validateForm, handleChange]);

  const formFields = [
    { name: "egn", label: t('egn'), type: "text", required: true },
    { name: "lnch", label: t('lnc'), type: "text", tooltip: [t('lncTooltip')], noValidation: true },
    { name: "fullNameCyrillic", label: t('nameCyrillic'), type: "text", required: true },
    { name: "fullNameLatin", label: t('nameLatin'), type: "text", required: true },
    { name: "email", label: "E-mail:", type: "email", required: true },
    { name: "phone", label: t('phone'), type: "tel", required: true },
    { name: "address", label: t('address'), type: "textarea", required: true },
    { name: "username", label: t('username'), type: "text", required: true },
    { 
      name: "password", 
      label: t('password'), 
      type: "password", 
      required: true,
      tooltip: [
        <b className="list-none">{t('passwordRequirements')}</b>,
        t('passwordTooltip1'),
        t('passwordTooltip2'),
        t('passwordTooltip3'),
        t('passwordTooltip4')
      ],
      withStrengthIndicator: true
    },
    { name: "confirmPassword", label: t('confirmPassword'), type: "password", required: true }
  ];

  return (
    <>
      <div className="flex justify-center items-center min-h-screen my-10">
        <form 
          noValidate 
          onSubmit={handleSubmit} 
          className="border-gray-200 border-1 w-full max-w-xl bg-white p-8 rounded-lg"
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-800">{t('header')}</h2>
          <p className="text-sm text-gray-600 mb-6">{t('headerText')}</p>

          <hr className="border-t border-gray-300 my-6" />
          <p className="text-sm relative text-gray-500 mb-4 flex items-center">
            <span className="absolute -left-3 text-red-500 mr-1">*</span>
            {t('requiredFields')}
          </p>

          {formFields.map((field) => {
            if (field.type === "textarea") {
              return (
                <TextArea
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  required={field.required}
                  value={formData[field.name]}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  error={errors[field.name]}
                />
              );
            }

            const inputElement = (
              <Input
                key={field.name}
                type={field.type}
                label={field.label}
                name={field.name}
                required={field.required}
                value={formData[field.name]}
                onChange={field.name === "password" 
                  ? handlePasswordChange 
                  : (e) => !field.noValidation && handleChange(field.name, e.target.value)}
                error={errors[field.name]}
                tooltip={field.tooltip}
              />
            );

            if (field.withStrengthIndicator) {
              return (
                <React.Fragment key={field.name}>
                  {inputElement}
                  <PasswordStrengthIndicator 
                  strength={strength}
                  password={formData.password}
                  />
                </React.Fragment>
              );
            }

            return inputElement;
          })}

          <hr className="border-t border-gray-300 my-6" />

          <p className="text-sm text-gray-600 my-4">
            {t('formFooterText')}
          </p>

          {serverError && (
            <p className="text-red-600 text-sm mb-4">{serverError}</p>
          )}

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
  );
};

export default Register;