import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
const Card = ({ icon, text, count, color, url, isDetail = true }) => {
  return (
    <div className="flex items-center overflow-hidden bg-white rounded-md shadow-lg dark:bg-sky-900">
      <div className="w-2 h-full" style={{ backgroundColor: color }}></div>
      <div className="flex flex-col items-start justify-start w-full p-4 ml-2">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg dark:bg-gray-800">
          {icon}
        </div>
        <h3 className="mt-2 text-sm font-normal text-gray-600 dark:text-gray-300">
          {text}
        </h3>
        <p className="mt-2 text-2xl font-semibold text-black dark:text-white">
          {count}
        </p>
        {isDetail && (
          <Link to={url} className="mt-2">
            <div className="flex items-center space-x-1">
              <p className="text-sm font-normal text-blue-700 dark:text-blue-300 hover:underline">
                More Info
              </p>
              <ChevronRight size={15} className="text-blue-700 dark:text-blue-300" />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Card;
