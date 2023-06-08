import Button from '../../../Components/Button/Button';
import banner from '../../../assets/home/banner.svg';
import trainingImage from '../../../assets/home/training-image.png';
const HomeBanner = () => {
    return (
        <div className='relative py-4 md:h-[450px] overflow-hidden'>
            <img className='absolute -z-10 top-0 left-0 h-full w-full' src={banner} alt="" />
            <div className='px-5 md:px-10 lg:px-20 grid md:grid-cols-2 gap-2'>
                <div className='md:h-[450px] text-white flex flex-col justify-center'>
                    <span className='text-[#e84c3d] capitalize text-lg font-semibold tracking-wider inline-block pb-1 mb-1 border-b border-slate-500'>Hare Some exclusive classes</span>
                    <h5 className='text-3xl font-light mb-3'>Unleash Your Football Potential</h5>
                    <p className='text-justify mb-2'>The Football Coach's Den is the premier online resource for football training. Our team of experienced coaches and trainers can help you improve your skills, learn new techniques, and reach your full potential.</p>
                    <Button btnText='purchase classes' />
                </div>
                <div className=' hidden md:block lg:flex justify-end'>
                    <img className='h-[450px]' src={trainingImage} alt="" />
                </div>
            </div>
        </div>
    );
};

export default HomeBanner;