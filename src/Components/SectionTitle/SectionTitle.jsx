const SectionTitle = ({title,subTitle}) => {
    return (
        <div className="mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl mb-2 uppercase font-bold">{title}</h2>
            <p className="text-sm md:w-3/4 lg:w-1/2 md:mx-auto md:text-base font-semibold text-[#bbacca]">{subTitle}</p>
        </div>
    );
};

export default SectionTitle;