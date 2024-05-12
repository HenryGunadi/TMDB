import { useNavigate } from "react-router-dom";

const Back: React.FC = () => {
  const navigate = useNavigate();

  const toHome = (): void => {
    navigate("/");
  };

  return (
    <div className="flex items-center pb-4 w-fit text-blue-600 hover:text-blue-900 hover:underline transition-all duration-300">
      <i className="fa-solid fa-chevron-left text-sm pr-1"></i>

      <a
        href=""
        onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
          e.preventDefault();
          toHome();
        }}
      >
        Home
      </a>
    </div>
  );
};

export default Back;
