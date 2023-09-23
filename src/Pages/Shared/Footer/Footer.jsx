import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import Button from "../../../Components/Button/Button";

const Footer = () => {
  return (
    <div className={`gradient-t-bg container text-white`}>
      {/* footer-top */}
      <footer className="footer py-10">
        <aside>
          <Link to="/" className="font-semibold text-xl sm:text-2xl mb-4">
            The Football Coach's Den
          </Link>
          <p className="text-[#bbacca] flex items-center mb-0">
            <Icon className="text-xl" icon="mdi:map-marker-outline" />{" "}
            Mirpur-10, Dhaka Bangladesh
          </p>
          <p className="flex text-[#bbacca] items-center">
            <Icon className="text-xl" icon="ic:outline-phone-in-talk" />
            +8801234567891
          </p>
          <p className="text-[#bbacca]">
            The Football Coach's Den Ltd.
            <br />
            Providing reliable training since 2023
          </p>
        </aside>
        <nav>
          <header className="text-xl sm:text-2xl">Services</header>
          <ul>
            <li>
              <Link className="text-[#bbacca]" to="/">4 hour On-site Training</Link>
            </li>
            <li>
              <Link className="text-[#bbacca]" to="/">Personal Training</Link>
            </li>
            <li>
              <Link className="text-[#bbacca]" to="/">E-Learning</Link>
            </li>
            <li>
              <Link className="text-[#bbacca]" to="/">Bootcamp</Link>
            </li>
            <li>
              <Link className="text-[#bbacca]" to="/">Certificate</Link>
            </li>
          </ul>
        </nav>
        <nav>
          <header className="text-xl sm:text-2xl">Company</header>
          <ul>
            <li>
              <Link className="text-[#bbacca]" to="/">Home</Link>
            </li>
            <li>
              <Link className="text-[#bbacca]" to="/">About Us</Link>
            </li>
            <li>
              <Link className="text-[#bbacca]" to="/instructors">Instructors</Link>
            </li>
            <li>
              <Link className="text-[#bbacca]" to="/allClasses">Classes</Link>
            </li>
          </ul>
        </nav>
        <form>
          <header className="font-semibold text-xl sm:text-2xl">
            Newsletter
          </header>
          <fieldset className="form-control sm:w-80">
            <span className="text-[#bbacca] font-semibold mb-5">
              Enter your email address
            </span>
            <div className="relative">
              <input
                type="text"
                placeholder="username@site.com"
                className="input input-bordered w-full pr-16"
              />
              <Button
                className="btn absolute top-0 right-0 rounded-l-none"
                btnText="Subscribe"
              />
            </div>
          </fieldset>
        </form>
      </footer>

      {/* footer-bottom */}
      <div className="footer border-t border-[#44047f] py-4">
        <aside className="items-center grid-flow-col">
          <p className="text-[#bbacca]">Copyright © 2023 - All right reserved by Football Coach Den Ltd</p>
        </aside>
        <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          <a href="www.twitter.com/">
            <Icon className="text-2xl" icon="fa-brands:twitter" />
          </a>
          <a href="www.youtube.com">
            <Icon className="text-2xl" icon="fa-brands:youtube" />
          </a>
          <a href="www.facebook.com">
            <Icon className="text-2xl" icon="fa-brands:facebook-f" />
          </a>
        </nav>
      </div>
    </div>
  );
};

export default Footer;
