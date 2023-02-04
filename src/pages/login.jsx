import { FcGoogle } from "react-icons/fc";
import { auth } from "../../firebase/config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        if (result.user) {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div className=" h-screen w-full bg-blue-400 py-32">
      <div className="flex flex-col items-center justify-center">
        <span className="text-white my-5 block text-center">
          <p className="font-bold text-3xl">Welcome to Supchat</p>
          <p className="text-gray-100 mt-2">
            Please login use <span className="font-bold">Google Account</span>{" "}
            to enter chat room
          </p>
        </span>
        <button onClick={handleLogin}>
          <span className="flex text-gray-600 items-center hover:ring-2 hover:ring-blue-500 focus:ring-blue-500 rounded-lg bg-white px-5 py-3">
            <FcGoogle className="text-xl mr-2" />
            Sign In with Google
          </span>
        </button>
      </div>
    </div>
  );
}

export default Login;
