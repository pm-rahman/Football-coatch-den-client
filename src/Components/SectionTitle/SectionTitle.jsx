const SectionTitle = ({title,subTitle}) => {
    return (
        <div className="mx-auto text-center">
            <h2 className="text-2xl mb-1 uppercase font-semibold">{title}</h2>
            <p className="uppercase text-sm md:text-base font-semibold text-[#e84c3d]">{subTitle}</p>
        </div>
    );
};

export default SectionTitle;