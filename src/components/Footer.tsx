function Footer() {
	return (
		<>
			<div
				className="w-screen h-auto pt-24 pb-4 px-14 justify-center flex flex-col items-center bg-slate-50 text-neutral-800
            "
			>
				<h1 className="text-2xl font-semibold">MOVIELIX</h1>

				<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique nulla sapiente veniam fuga qui.</p>

				{/* Links */}
				<ul className="flex gap-3 pt-2 text-blue-600 ">
					<a href="" className="hover:text-blue-900 font-semibold duration-150">
						<li>Home</li>
					</a>
					<a href="#aboutUs" className="hover:text-blue-900 font-semibold duration-150">
						<li>About Us</li>
					</a>
					<a href="" className="hover:text-blue-900 font-semibold duration-150">
						<li>Contact</li>
					</a>
					<a href="" className="hover:text-blue-900 font-semibold duration-150">
						<li>Support Us</li>
					</a>
				</ul>

				{/* Sosmed */}
				<div className="py-2">
					<a href="" className="hover:cursor-pointer hover:opacity-50 duration-100">
						<i className="fa-brands fa-youtube text-3xl px-1"></i>
					</a>
					<a href="" className="hover:cursor-pointer hover:opacity-50 duration-100">
						<i className="fa-brands fa-square-facebook text-3xl px-1"></i>
					</a>
					<a href="" className="hover:cursor-pointer hover:opacity-50 duration-100">
						<i className="fa-brands fa-square-instagram text-3xl px-1"></i>
					</a>
				</div>

				<p className="font-medium text-sm">&copy; 2020-2024 MOVIELIX.com, inc.</p>
			</div>
		</>
	);
}

export default Footer;
