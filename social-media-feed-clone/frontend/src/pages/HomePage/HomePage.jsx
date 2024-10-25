import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/getUser';
import axios from 'axios';
import "./HomePage.css"
import Post from '../../components/Post/Post';

const HomePage = () => {
    const { user, setUser } = useContext(UserContext);
    const [allPosts, setAllPosts] = useState([]);
    const navigate = useNavigate();
    console.log(user)
    useEffect(() => {
        const fetchAllPosts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/posts/all', { withCredentials: true });
                setAllPosts(response.data.posts);
            } catch (error) {
                alert(error.message);
                console.log('Error : ' + error);
            }
        };
        fetchAllPosts();
    }, []);

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:5000/auth/logout', {
                method: 'GET',
                credentials: 'include',
            });

            const data = await response.json();
            if (response.ok) {
                setUser(null);
                console.log(data.message);
                navigate('/login');
            } else {
                console.error(data.message);
            }
        } catch (error) {
            throw new Error(error.message);
        }
    };

    const otherPosts = allPosts
        .filter((post) => post?.createdBy._id !== user?._id)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    console.log(otherPosts)
    return (
        <div className="home-page">
            <div className="posts-container">
                {otherPosts.map((post) => (
                    <Post post={post} user={user}/>
                ))}
            </div>
        </div>

    );
};

export default HomePage;
