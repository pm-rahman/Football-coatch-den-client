const Button = ({btnText}) => {
    return (
        <div>
            <button className="bg-[#e84c3d] hover:bg-[#d0493d] text-white text-lg capitalize px-6 py-3">{btnText}</button>
        </div>
    );
};

export default Button;