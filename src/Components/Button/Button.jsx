const Button = ({btnText,full}) => {
    return (
        <div>
            <button className={`bg-[#e84c3d] hover:bg-[#d0493d] text-white text-lg capitalize  ${full?'w-full py-2':'px-6 py-3'}`}>{btnText}</button>
        </div>
    );
};

export default Button;