import React, { useEffect } from 'react';
import search from "../Assests/search.svg";
import './Home.css';
import { useSelector, useDispatch } from 'react-redux';
import { getDataFromServer } from '../redux/features/postSlice';

const Home = () => {
  const dispatch = useDispatch();
  const { post, status, error } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getDataFromServer());
  }, [dispatch]);

  return (
    <div className='Home_container'>
      <div className='social'>
        <p>Social Media For Travellers</p>
      </div>
      <div className='search_input'>
        <img src={search} alt='search' />
        <input type='search' placeholder='Search here...' />
      </div>

      <div className='post_container'>
            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p>Error: {error}</p>}
            {status === 'succeeded' &&
                post.map((post) => (
                <div className='post_data' key={post.id}>
                    <img src={`https://picsum.photos/200?random=${post.id}`} alt={`Post ${post.id}`} />
                    <div className='post_data_para'>
                        <p>{post.title}</p>
                        <p>{post.body}</p>
                    </div>
                </div>
            ))}
      </div>
    </div>
  );
};

export default Home;
