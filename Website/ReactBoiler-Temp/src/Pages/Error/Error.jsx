import { Helmet } from "react-helmet-async";
import { useContext } from "react";
import { NavLink } from "react-router-dom";


const Error = () => {


    return (
        <div>
            <Helmet>
                <title>Error</title>
                <meta name="description" content="Home" />
            </Helmet>
            <div className="flex flex-col h-screen justify-center items-center mt-20">
                <h1 className="text-3xl font-bold mt-[-10rem]">Error</h1>
                <NavLink className='hover:text-purple-600 hover:text-2xl'to={"/"}>Redirect to Home</NavLink>
            </div>
        </div>
    );
};

export default Error;