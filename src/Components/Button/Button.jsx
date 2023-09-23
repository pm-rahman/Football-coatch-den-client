const Button = ({btnText,full}) => {
    return (
        <div>
            <button className={`bg-[#9b51e0] hover:bg-[#8643c5] text-white text-lg capitalize  ${full?'w-full py-2':'px-6 py-3'}`}>{btnText}</button>
        </div>
    );
};

export default Button;