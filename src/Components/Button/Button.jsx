const Button = ({type,onClick,className,btnText,full}) => {
    return <button type={type} onClick={onClick} className={`${className} text-sm font-semibold bg-[#9b51e0] hover:bg-[#8643c5] text-white capitalize  ${full?'w-full py-2':'px-6 py-3'}`}>{btnText}</button>;
};

export default Button;