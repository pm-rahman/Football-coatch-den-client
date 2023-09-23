const EmptyPage = ({emptyText}) => {
    return (
        <div>
            <h2 className="mt-8 text-xl font-semibold text-center uppercase">{emptyText}</h2>
        </div>
    );
};

export default EmptyPage;