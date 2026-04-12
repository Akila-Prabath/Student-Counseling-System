import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer id="contact" className="bg-stone-300 text-gray-800 pt-16 pb-6 px-6 md:px-20">

      {/* TOP SECTION */}
      <div className="grid md:grid-cols-4 gap-10">

        {/* LOGO + DESCRIPTION */}
        <div>
          <h2 className="text-2xl font-bold text-black mb-4">
            MindCare
          </h2>

          <p className="text-sm leading-relaxed">
            At MindCare, we understand that life’s challenges can feel overwhelming. 
            Our team provides compassionate support and expert care to help you 
            achieve better mental well-being.
          </p>
        </div>

        {/* COMPANY */}
        <div>
          <h3 className="font-semibold text-lg mb-4 text-black">Our Services</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-orange-600 cursor-pointer"> <span onClick={() => navigate("/individual-therapy")}> Individual Therapy </ span> </li>
            <li className="hover:text-orange-600 cursor-pointer"> <span onClick={() => navigate("/couples-counseling")}> Couples Counseling </ span> </li>
            <li className="hover:text-orange-600 cursor-pointer"> <span onClick={() => navigate("/resources")}> Mental Resources </ span> </li>
            <li className="hover:text-orange-600 cursor-pointer"> <span onClick={() => navigate("/stress-management")}> Stress Management </ span> </li>
            <li className="hover:text-orange-600 cursor-pointer"> <span onClick={() => navigate("/depression-therapy")}> Depression Therapy </ span> </li>
            <li className="hover:text-orange-600 cursor-pointer"> <span onClick={() => navigate("/anonymous-support")}> Anonymous Support </ span> </li>
          </ul>
        </div>

        {/* SERVICES */}
        <div>
          <h3 className="font-semibold text-lg mb-4 text-black">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-orange-600 cursor-pointer"> <span onClick={() => navigate("/")}> Home </ span></li>
            <li className="hover:text-orange-600 cursor-pointer">Services</li>
            <li className="hover:text-orange-600 cursor-pointer"> <span onClick={() => navigate("/AboutUs")}> About Us </ span></li>
            <li className="hover:text-orange-600 cursor-pointer"> <span onClick={() => navigate("/Contact")}> Contact Us </ span></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-semibold text-lg mb-4 text-black">Contact</h3>

          <div className="flex items-start gap-2 mb-3">
            <FaLocationDot className="text-black hover:text-orange-600 mt-1" />
            <p className="text-sm">10 S Main St, Kurunegala, Sri Lanka</p>
          </div>

          <div className="flex items-start gap-2 mb-4">
            <MdEmail className="text-black hover:text-orange-600 mt-1" />
            <p className="text-sm">contact@mindcare.com</p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 mt-2 text-lg">
            <FaFacebookF className="cursor-pointer hover:text-orange-600" />
            <FaTwitter className="cursor-pointer hover:text-orange-600" />
            <FaInstagram className="cursor-pointer hover:text-orange-600" />
            <FaYoutube className="cursor-pointer hover:text-orange-600" />
          </div>
        </div>

      </div>

      {/* DIVIDER */}
      <div className="border-t mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">

        <p>© 2026 MindCare. All rights reserved.</p>

        <div className="flex gap-6 mt-4 md:mt-0">
          <span className="hover:text-orange-600 cursor-pointer">Terms & Conditions</span>
          <span className="hover:text-orange-600 cursor-pointer">Privacy Policy</span>
        </div>

      </div>

    </footer>
  );
}

export default Footer;