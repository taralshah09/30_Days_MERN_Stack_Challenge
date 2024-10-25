import React, { useRef, useState } from 'react';
import axios from 'axios';

const Post = ({ post, user }) => {
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState(post.comments);
    const commentInputRef = useRef(null);
    const [likes, setLikes] = useState(post?.likes);
    const [likedBy, setLikedBy] = useState(post.likedBy || null); // Set initial likedBy state
    const [showAllComments, setShowAllComments] = useState(false);

    const addComment = async () => {
        const { data } = await axios.post(
            `http://localhost:5000/posts/${post?._id}/comments`,
            { content: commentText, createdBy: user?._id },
            { withCredentials: true }
        );
        console.log(data);
        window.location.reload();
    };

    const toggleComments = () => {
        setShowAllComments(!showAllComments);
    };

    const scrollToCommentInput = () => {
        commentInputRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const sortedComments = [...comments].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    const addLike = async () => {
        const { data } = await axios.post(
            `http://localhost:5000/posts/${post._id}/likes`,
            { createdBy: user._id },
            { withCredentials: true }
        );
        console.log(data);
        setLikedBy(user.name); // Set likedBy state to the current user's name
        setLikes((prevLikes) => prevLikes + 1);
    };

    return (
        <div key={post._id} className="post">
            <div className="post-header">
                <img src={post?.createdBy.profilePicture || '/default-avatar.jpg'} alt="Profile" className="profile-img" />
                <span className="profile-name">{post?.createdBy.name}</span>
            </div>

            <div className="post-image-container">
                <img src={post?.media?.url || '/default-post.jpg'} alt="Post" className="post-image" />
            </div>

            <div className="post-actions">
                <button className="action-btn" onClick={addLike}>
                    <i className="fa-regular fa-heart icon"></i>
                </button>
                {likedBy && <p className="liked-by">Liked by {likedBy}</p>}
                <button className="action-btn" onClick={scrollToCommentInput}>
                    <i className="fa-regular fa-comment icon"></i>
                </button>
            </div>

            <p className="post-caption">
                <span className="bold-text">{post?.createdBy?.name}</span> {post?.caption}
            </p>

            <div className="comments-box">
                {sortedComments.length > 2 && (
                    <p className="view-all-comments" onClick={toggleComments}>
                        {showAllComments ? "View less" : `View all ${sortedComments.length} comments`}
                    </p>
                )}

                {(showAllComments ? sortedComments : sortedComments.slice(0, 2)).map((comment, index) => (
                    <div key={index} className="comment">
                        <img
                            src={comment?.createdBy?.profilePicture}
                            alt={`${comment?.createdBy?.name}'s profile picture`}
                            className="comment-author-picture"
                        />
                        <p>
                            <span className="comment-author">{comment?.createdBy?.name}</span> {comment?.content}
                        </p>
                    </div>
                ))}

                {sortedComments.length === 0 && <p className="no-comments">No comments yet</p>}
            </div>

            <div className="add-comment" ref={commentInputRef}>
                <input
                    type="text"
                    className="comment-input"
                    placeholder="Add a comment..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    required
                />
                <button className="post-comment-btn" onClick={addComment}>Post</button>
            </div>
        </div>
    );
};

export default Post;
