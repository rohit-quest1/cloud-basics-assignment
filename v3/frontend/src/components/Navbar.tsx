import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { role } = useSelector((state: any) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="text-white p-4  border-b-2 shadow-sm font-medium outfit-500">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex w-full justify-between items-center space-x-4">

          {role === 'admin' && (
            <>
              <Link to="/admin" className="text-[24px] outfit-700 text-[#F2360A] font-bold">
                backscript
              </Link>
              <div className="pr-8 text-black">
              <Link to="/admin/orders" className="hover:text-[#F2360A]">
                Orders
              </Link>
              </div>
             
            </>
          )}

          {role === 'user' && (
            <>
              <Link to="/dashboard" className="text-[24px] outfit-700 text-[#F2360A] font-bold">
                bakescript
              </Link>
              <div className="pr-8 space-x-8 text-black">
              <Link to="/orders" className="hover:text-[#F2360A]">
                My Orders
              </Link>
              <Link to="/profile" className="hover:text-[#F2360A]">
                Profile
              </Link>
              </div>
             
            </>

          )}

        </div>
        <button
          onClick={handleLogout}
          className="text-black hover:text-[#F2360A]"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}