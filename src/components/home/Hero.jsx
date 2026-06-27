import heroImage from "../../assets/heroImage.png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-12 min-h-[70vh] py-8 md:py-0 px-6">
      {/* Soft background blobs */}
      <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full opacity-10 bg-orange-300 pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-56 h-56 rounded-full opacity-10 bg-orange-200 pointer-events-none" />

      {/* Left Side: Content */}
      <div className="flex-1 space-y-5 text-center md:text-left relative z-10">
        <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 leading-tight">
          Discover Your Next{" "}
          <span className="text-orange-500 relative inline-block">
            Great Book
            <svg
              className="absolute -bottom-1 left-0 w-full"
              viewBox="0 0 200 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <path
                d="M0 6 Q50 1 100 5 Q150 9 200 4"
                stroke="#f97316"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                opacity="0.5"
              />
            </svg>
          </span>
        </h1>
        <p className="text-gray-500 text-base sm:text-lg max-w-lg mx-auto md:mx-0 leading-relaxed">
          Explore a curated collection of powerful books across different genres
          and immerse yourself in stories that stay with you.
        </p>
        <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
          <Link
            to="/books"
            className="bg-orange-500 text-white px-7 py-3 rounded-xl font-semibold hover:bg-orange-600 transition-all cursor-pointer shadow-md shadow-orange-200"
          >
            Order Now
          </Link>
        </div>
      </div>

      <div className="flex-1 flex justify-center md:justify-end relative z-10">
        <div className="relative w-70 h-70 lg:w-100 lg:h-100">
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full rounded-full overflow-hidden shadow-md"
            style={{ background: "linear-gradient(145deg, #fed7aa, #fdba74)" }}
          >
            <img
              src={heroImage}
              alt=""
              aria-hidden="true"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-auto object-cover object-bottom"
            />
          </div>

          {/* Decorative dots */}
          <div className="absolute top-4 -right-3 w-3 h-3 rounded-full bg-orange-400 opacity-40" />
          <div className="absolute top-12 -right-6 w-2 h-2 rounded-full bg-orange-400 opacity-30" />
          <div className="absolute bottom-6 -left-4 w-4 h-4 rounded-full bg-orange-300 opacity-25" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
