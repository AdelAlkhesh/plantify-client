import { createContext, useState } from "react";

const UserContext = createContext();

function UserProviderWrapper(props) {
  const [user, setUser] = useState(null);
  const [plantFamily, setPlantFamily] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser, plantFamily, setPlantFamily, blogs, setBlogs, error, setError }}>
      {props.children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProviderWrapper };
