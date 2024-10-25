import React, { useContext, useEffect, useState } from 'react'
import "./MyPosts.css"
import "../HomePage/HomePage.css"
import UserContext from '../../context/getUser';
import axios from 'axios';
// import Post from '../../components/Post/Post';
import MyPost from '../../components/MyPost/MyPost';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const { user } = useContext(UserContext)
    const [myPosts, setMyPosts] = useState([]);
    const navigate = useNavigate("")

    console.log(user);
    useEffect(() => {
        const getMyPosts = async () => {
            const response = await axios.get(`http://localhost:5000/posts/my-posts/${user._id}`)
            console.log(response.data)
            setMyPosts(response.data.posts)
        }
        getMyPosts()
    }, [])

    const deletePost = async(id) => {
        const response = await axios.delete(`http://localhost:5000/posts/${id}`)
        alert(response.data.message)
        window.location.reload()
        navigate("/")
    }
    console.log(myPosts)

    return (
        <div className="home-page">
            <div className="posts-container">
                {myPosts.map((post) => (
                    <MyPost post={post} user={user} deletePost={deletePost}/>
                ))}
            </div>
        </div>
    )
}

export default ProfilePage
