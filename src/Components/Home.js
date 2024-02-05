import React, { useEffect } from "react";
import search from "../Assests/search.svg";
import arrow from "../Assests/arrow.svg";
import { Link,useNavigate } from "react-router-dom";
import "./Home.css";
import { useSelector, useDispatch } from "react-redux";
import { getDataFromServer } from "../redux/features/postSlice";

const truncateText = (text, maxLength) => {
  if (!text) return "";
  const lengthh = Math.min(text.length, maxLength);
  return text.length > lengthh ? text.substring(0, lengthh) + " " : text;
};

const Home = () => {
     const navigate=useNavigate();
  const dispatch = useDispatch();
  const { post, status, error } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getDataFromServer());
  }, [dispatch]);

  function handleBtn(id) {
    navigate(`/details/${id}`);
  }

  return (
    <div className="Home_container">
      <div className="social">
        <p>Social Media For Travellers</p>
      </div>
      <div className="search_input">
        <img src={search} alt="search" />
        <input type="search" placeholder="Search here..." />
      </div>

      <div className="post_container">
        {status === "loading" && <p>Loading...</p>}
        {status === "failed" && <p>Error: {error}</p>}
        {status === "succeeded" &&
          post.map((post) => (
            <div className="post_data" key={post.id}>
              <img
                src={`https://picsum.photos/200?random=${post.id}`}
                alt={`Post ${post.id}`}
              />
              <p>{truncateText(post.title, 20)}</p>
              <div className="post_data_para">
                <p>
                  {truncateText(post.body, 40)},{"  "}
                  <span >
                    <Link className="span" to={`/details/${post.id}`}>Read more...</Link>
                  </span>
                </p>
                <div>
                  <img
                    onClick={() => handleBtn(post.id)}
                    src={arrow}
                    alt="arrow"
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
