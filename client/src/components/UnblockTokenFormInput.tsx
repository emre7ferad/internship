import { useTranslation } from "react-i18next";

interface FormInputProps {
    name: string;
    label: string;
    type: string;
    layout?: "grid" | 'flex';
    classname?: string;
    translationKey?: string;
}

const FormInput = ({
    name,
    label,
    type,
    layout = "grid",
    classname = "",
    translationKey,
}: FormInputProps) => {
    const { t } = useTranslation('unblockToken');
    const translatedLabel = translationKey ? t(translationKey) : label;

    if (layout === "grid") {
        return (
            <div className="md:grid md:grid-cols-2 items-center">
                <label htmlFor={name} className="font-semibold md:text-left">{translatedLabel}</label>
                <input 
                id={name}
                name={name}
                type={type}
                className={`border border-gray-300 p-1 w-full justify-self-end focus:outline-none ${classname}`}/>
            </div>
        );
    }

    return (
        <div className="md:flex text-center md:text-left p-1 items-center justify-between py-4">
            <p className="w-full">{translatedLabel}</p>
            <input 
            id={name}
            name={name}
            type={type}
            className={`border border-gray-300 p-1 w-full md:w-92 focus:outline-none ${classname}`}/>
        </div>
    );
};

export default FormInput;