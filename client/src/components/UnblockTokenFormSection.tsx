interface FormSectionProps {
    children: React.ReactNode;
    className?: string;
    hasBorderTop?: boolean;
}

const FormSection = ({
    children,
    className = "",
    hasBorderTop = false,
}: FormSectionProps) => {
    return (
        <div className={`${hasBorderTop ? "border-t border-gray-300" : ""} ${className}`}>
            {children}
        </div>
    );
};

export default FormSection;