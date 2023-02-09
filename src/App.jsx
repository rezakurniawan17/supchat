import Navbar from "./components/Navbar";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import Chat from "./components/Chat";

import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

function App() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/login");
      } else {
        setUserData(user);
      }
    });
  }, []);
  return (
    <div className="App bg-blue-400 h-screen p-6 overflow-hidden antialiased">
      <div className="max-w-2xl rounded-xl mx-auto bg-white">
        <Navbar user={userData} />
        <Chat user={userData} />
      </div>
    </div>
  );
}

export default App;
