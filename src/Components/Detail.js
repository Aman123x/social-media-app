import React,{useState,useEffect} from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import "./Detail.css"
import { getDataFromServer } from "../redux/features/postSlice";
import share from "../Assests/share.svg"
import heart from "../Assests/heart.svg"
import arrow from "../Assests/arrow.svg";
import redHeart from "../Assests/red-heart-icon.svg";

const truncateText = (text, maxLength) => {
  if (!text) return "";
  const lengthh = Math.min(text.length, maxLength);
  return text.length > lengthh ? text.substring(0, lengthh) + " " : text;
};


const Detail = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let {id}=useParams();
  const { post} = useSelector((state) => state.post);

  const [data, setData] = useState({});
  const [moreData,setMoreData]=useState([]);
  const [detail,setDetail]=useState(true);
  const [user,setUser]=useState(false);
  const [heartImg,setHeartImg]=useState(false);

  function handleImage(){
    setHeartImg(!heartImg);
  }


 
  // Fetch data only once when the component mounts
  useEffect(() => {
    dispatch(getDataFromServer())
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

  }, [dispatch]); 

  
  useEffect(() => {
    const postData = post.find((item) => item.id === parseInt(id, 10));
    if (postData) {
      setData(postData);
    }

  }, [id, post]);

  // console.log('Data:', data);

  useEffect(() => {
    const filteredPosts = post.filter((item) => item.id !== parseInt(id, 10));
    setMoreData(filteredPosts);
  }, [id, post]);


  // console.log(moreData);

  const activeBtnClass = 'activeBtn'; 
  const inactiveBtnClass = 'inactiveBtn';

  function handleDetails(){
    setDetail(true);
    setUser(false);
  }

  function handleUser(){
    setDetail(false);
    setUser(true);
  }

  function handleBtn(postId){
    setHeartImg(false);
    navigate(`/details/${postId}`);
  }

  return (
    <div className='post_detail_container'>
      <h1>Post Number #{id}</h1>
      <div className='post_detail_parent'>
        {
          data &&
          <>
            <div className='post_detail' style={{ backgroundImage: `url(https://picsum.photos/200?random=${id})` }}>
              <p><strong>{data.title}</strong></p>
              <div>
                <img src={share} alt='share'/>
                { 
                  heartImg===false ?
                  <img onClick={handleImage} src={heart} alt='heart'/>:
                  <img onClick={handleImage} src={redHeart} alt='heart'/>
                }
              </div>
            </div>
          <div className='post_detail_2'>
            <div>
              <button className={detail ? activeBtnClass : inactiveBtnClass} onClick={handleDetails}>Details</button>
              <button className={user ? activeBtnClass : inactiveBtnClass} onClick={handleUser}>User Info</button>
            </div>
            <div>
              { detail===true ?
                <p>{data.body}</p>:
                <p>Post was posted by user {data.userId}</p>
              }
            </div>
          </div>
          </>
        }
      </div>

      <h1>More Posts</h1>
      <div className="post_container">
        {
            moreData.map((post) => (
              <div className="post_data" key={post.id}>
                <img
                  src={`https://picsum.photos/200?random=${post.id}`}
                  alt={`Post ${post.id}`}
                />
                <p>{truncateText(post.title, 20)}</p>
                <div className="post_data_para">
                  <p>
                    {truncateText(post.body, 40)},{"  "}
                    <span className='read_more'>Read more...</span>
                  </p>
                  <div>
                    <img onClick={()=>handleBtn(post.id)} src={arrow} alt="arrow" />
                  </div>
                </div>
              </div>
            ))
        }
      </div>
    </div>
  )
}

export default Detail