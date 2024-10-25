import React, { useContext, useState } from 'react';
import './AddPost.css';
import axios from 'axios';
import UserContext from '../../context/getUser';
import { useNavigate } from 'react-router-dom';

const AddPost = () => {
    const { user } = useContext(UserContext);
    const [media, setMedia] = useState(null);
    const [caption, setCaption] = useState('');
    const navigate = useNavigate("")

    const addPost = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('media', media);
        formData.append('caption', caption);
        formData.append('createdBy', user._id);

        const response = await axios.post('http://localhost:5000/posts/create', formData, {
            withCredentials: true,
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        console.log(response.data);
        alert(response.data.message)
        navigate("/my-posts")
    };

    return (
        <div className="add-post-container">
            <form onSubmit={addPost} className="add-post-form">
                <h2>Create a Post</h2>
                <div className="form-group">
                    <label htmlFor="media">Upload Media</label>
                    <input
                        type="file"
                        id="media"
                        onChange={(e) => setMedia(e.target.files[0])}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="caption">Caption</label>
                    <textarea
                        id="caption"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        rows="4"
                        placeholder="Write a caption..."
                        required
                    />
                </div>
                <button type="submit" className="submit-btn" onClick={addPost}>
                    Post
                </button>
            </form>
        </div>
    );
};

export default AddPost;
