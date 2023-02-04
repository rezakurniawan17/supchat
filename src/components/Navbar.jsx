import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";

function Navbar({ user }) {
  const handleSignOut = async () => {
    await signOut(auth);
  };
  return (
    <nav className="flex justify-between items-center p-5">
      <div className="text-blue-500 text-2xl font-semibold">Supchat 🔥🔥</div>
      <button
        onClick={handleSignOut}
        className="bg-red-500 px-3 py-2 text-sm text-white rounded-lg"
      >
        {user?.uid ? "Logout" : ""}
      </button>
    </nav>
  );
}

export default Navbar;
