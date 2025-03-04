import React, { useState, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "@/slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const Navbar = ({ navLinks = [], brandName = "", brandLink = "/" }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  const defaultNavLinks = [
    { name: "SignIn", path: "/signin" },
    { name: "SignUp", path: "/signup" },
  ];

  const finalNavLinks = userInfo ? [] : navLinks.length > 0 ? navLinks : defaultNavLinks;

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      const currentLink = finalNavLinks.find((link) => location.pathname === link.path);
      if (currentLink) {
        setActiveLink(currentLink.name);
      } else {
        const currentSection = finalNavLinks.find((link) => {
          if (link.path.startsWith('#')) {
            const element = document.querySelector(link.path);
            if (element) {
              const rect = element.getBoundingClientRect();
              return rect.top <= 100 && rect.bottom >= 100;
            }
          }
          return false;
        });
        if (currentSection) {
          setActiveLink(currentSection.name);
        }
      }
    };
  
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [finalNavLinks, location.pathname]);

  const formatLinkName = (name) => {
    return name.split(/(?=[A-Z])/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/signin');
      setIsMobileMenuOpen(false);
    } catch (err) {
      console.error("Logout failed:", err?.data?.message || err.error);
    }
  };

  return (
    <Motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/10 dark:bg-black/20 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to={brandLink}
          className="text-2xl font-bold text-emerald-100 dark:text-emerald-300 hover:text-emerald-300 transition-colors duration-300"
        >
          {brandName || "MERN Auth"}
        </Link>

        <div className="hidden md:flex space-x-6 items-center">
          {userInfo ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-emerald-100 hover:text-emerald-300 transition-all duration-300 cursor-pointer bg-emerald-800/30 rounded-xl px-4 py-2"
                >
                  {userInfo.name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-emerald-200/20 dark:border-emerald-800/20 rounded-xl overflow-hidden">
                <DropdownMenuLabel className="text-emerald-100">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-emerald-200/20" />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="text-emerald-300 hover:text-emerald-100 transition-colors duration-300">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-emerald-300 hover:text-emerald-100 transition-colors duration-300 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            finalNavLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative px-4 py-2 transition-all duration-300 ${
                  activeLink === link.name
                    ? "text-emerald-300 bg-emerald-800/30 rounded-xl"
                    : "text-emerald-100 hover:text-emerald-300"
                }`}
              >
                {formatLinkName(link.name)}
              </Link>
            ))
          )}
        </div>

        <button
          className="md:hidden text-emerald-100 hover:text-emerald-300 transition-all duration-300 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <svg
            className={`w-6 h-6 transition-transform duration-300 ${isMobileMenuOpen ? "rotate-90" : "rotate-0"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <Motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white/10 dark:bg-black/20 backdrop-blur-xl z-40 flex flex-col items-center justify-center space-y-8 p-4 md:hidden"
          >
            <button
              className="absolute top-4 right-4 text-emerald-100 hover:text-emerald-300 transition-all duration-300 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {userInfo ? (
              <>
                <Motion.span
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl font-semibold text-emerald-100 dark:text-emerald-300"
                >
                  {userInfo.name}
                </Motion.span>
                <Motion.a
                  href="/profile"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl font-semibold text-emerald-300 hover:text-emerald-100 transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Profile
                </Motion.a>
                <Motion.button
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl font-semibold text-emerald-300 hover:text-emerald-100 transition-all duration-300"
                  onClick={handleLogout}
                >
                  Logout
                </Motion.button>
              </>
            ) : (
              finalNavLinks.map((link, index) => (
                <Motion.a
                  key={link.name}
                  href={link.path}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="text-2xl font-semibold text-emerald-300 hover:text-emerald-100 transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {formatLinkName(link.name)}
                </Motion.a>
              ))
            )}
          </Motion.div>
        )}
      </AnimatePresence>
    </Motion.nav>
  );
};

export default Navbar;
