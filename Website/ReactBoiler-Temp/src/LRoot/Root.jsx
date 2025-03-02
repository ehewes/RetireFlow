import { Outlet } from "react-router-dom";
import Footer from '../Shared/Footer/Footer';
import Header from '../Shared/Navbar/Header';

const Root = () => {

  return (
    <div className="bg-gray-50">
      <div className="w-full h-full absolute inset-0 flex flex-col bg-black">
        <Header></Header>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Root;