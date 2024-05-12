import {Link} from 'react-router-dom';

interface NotFoundProps {
	showNavbar?: boolean;
}

const NotFound: React.FC<NotFoundProps> = ({showNavbar = true}) => {
	return (
		<div className="flex w-screen justify-center items-center h-screen flex-col pb-16">
			<h1 className="text-pink-800 font-semibold text-4xl pb-4">Page Not Found</h1>
			<Link to="/" className="text-blue-600 hover:text-blue-800 duration-100 hover:underline">
				Go back to home page
			</Link>
		</div>
	);
};

export default NotFound;
