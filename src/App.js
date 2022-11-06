import "./App.css";
import Axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [posts, setPosts] = useState([]);

  const getPage = async () => {
    let response = await Axios.get(
      `https://graph.instagram.com/me/media?fields=id,caption,media_url,username&access_token=${process.env.REACT_APP_KEY}`
    );

    if (response) {
      setPosts(response);
    } else {
      return;
    }
  };

  useEffect(() => {
    getPage();
  }, []);

  return (
    <>
      <h1 className="text-center pb-2">Justin's Posts</h1>
      <div className="App">
        {posts.data?.data?.map((item) => {
          return (
            <ul key={item.id}>
              <div className="card" style={{ width: "18rem" }}>
                <li>
                  <img src={item.media_url} alt={item.caption} />
                </li>
                <div className="card-body">
                  <p className="card-text">
                    <li>
                      <strong>{item.username}</strong> {item.caption}
                    </li>
                  </p>
                </div>
              </div>
            </ul>
          );
        })}
      </div>
    </>
  );
}

export default App;
