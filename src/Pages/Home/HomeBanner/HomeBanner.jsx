import Button from '../../../Components/Button/Button';
import trainingImage from '../../../assets/home/training-image.png';

const HomeBanner = () => {
    return (
        <>
            <div className='relative gradient-bg py-4 md:h-[450px] overflow-hidden'>
                <div className='px-5 md:px-10 lg:px-20 grid md:grid-cols-2 gap-2'>
                    <div className='md:h-[450px] text-white flex flex-col justify-center'>
                        <span className='text-[#9b51e0] uppercase font-semibold inline-block pb-1 mb-1'>Hare Some exclusive classes</span>
                        <h5 className='text-3xl font-semibold mb-3'>Unleash Your Football Potential</h5>
                        <p className='text-[#bbacca] text-justify mb-2'>The Football Coach's Den is the premier online resource for football training. Our team of experienced coaches and trainers can help you improve your skills, learn new techniques, and reach your full potential.</p>
                        <div><Button className="mt-4 rounded-full" btnText='purchase classes' /></div>
                    </div>
                    <div className='mt-8 hidden md:block lg:flex justify-end'>
                        <img className='h-[450px]' src={trainingImage} alt="" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomeBanner;