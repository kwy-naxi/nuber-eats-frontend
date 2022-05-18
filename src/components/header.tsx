import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import nuberLogo from "../images/logo.png";

export const Header: React.FC = () => {
  const { data } = useMe();

  return (
    <>
      {!data?.me.verified && (
        <div className="bg-red-500 py-7 px-5 text-center text-xsm text-white">
          <span>Please verify your email</span>
        </div>
      )}
      <header className="py-4">
        <div className="w-full px-5 xl:px-0 max-w-screen-xl mx-auto flex justify-between items-center">
          <img src={nuberLogo} className="w-24" alt="nuber eats"></img>
          <span className="text-xs">
            <Link to="/edit-profile">
              <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
            </Link>
          </span>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

// const Header = () => {
//   const me = useMe();

//   return (
//     <div className="border-red fixed top-0 left-0 w-full bg-black h-28">
//       {me?.emailVerified === false && <h1 className="text-white">이메일을 인증해주세요.</h1>}
//       <div className="content m-auto text-white flex justify-between items-center">
//         <Link to="/">
//           <DarkLogo />
//         </Link>
//         <Link to={`/users/profile`}>
//           <FontAwesomeIcon icon={faUserLarge} className="text-2xl" />
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Header;
