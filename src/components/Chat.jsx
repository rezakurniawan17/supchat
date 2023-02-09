import {
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import { useEffect, useState, useRef } from "react";

function Chat({ user }) {
  // define state
  const [text, setText] = useState("");
  const [allMessage, setAllMessage] = useState([]);
  const messageEndRef = useRef(null);
  // define collection ref
  const dbRef = collection(db, "message");

  const addDocToFirebase = async (e) => {
    e.preventDefault();
    try {
      if (text.length > 0) {
        await addDoc(dbRef, {
          message: text,
          createdAt: serverTimestamp(),
          uid: user.uid,
          photoUrl: user.photoURL,
          name: user.displayName,
        });
        setText("");
        messageEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const q = query(collection(db, "message"), orderBy("createdAt"));
    onSnapshot(q, (querySnapshot) => {
      setAllMessage(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
  }, []);
  return (
    <div className="p-5">
      <div className="h-[600px] w-full">
        <div className="h-5/6 p-4 bg-gray-800 w-full overflow-y-scroll">
          <ul className="flex space-y-4  flex-col overflow-y-auto">
            {allMessage?.map((message) => {
              return (
                <li
                  ref={messageEndRef}
                  key={message.id}
                  className={`items-start flex ${
                    user.uid === message.uid ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`p-4 rounded-xl max-w-md ${
                      user.uid === message.uid ? "bg-blue-400" : "bg-white"
                    }  flex-col flex space-y-2`}
                  >
                    <span
                      className={`inline-flex font-semibold ${
                        user.uid === message.uid ? "text-white" : "text-black"
                      }  space-x-2 items-center`}
                    >
                      <img
                        className={`w-6 h-6 rounded-full ring-2 ${
                          user.uid === message.uid
                            ? "ring-white"
                            : "ring-blue-500"
                        }`}
                        src={message.photoUrl}
                        alt={`${message.name} - avatar`}
                      />
                      <p>{message.name}</p>
                    </span>
                    <span
                      className={`text-white ${
                        user.uid === message.uid ? "text-white" : "text-black"
                      }`}
                    >
                      {message.message}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="bg-gray-800 p-4">
          <form onSubmit={addDocToFirebase}>
            <input
              className="focus:ring-blue-500 active:ring-blue-500 focus:border-blue-500 w-full py-3 px-3 rounded-lg"
              placeholder="say something nice"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;
