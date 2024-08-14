import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import { useParams, useNavigate } from 'react-router-dom';
import service from '../Appwrite/mainConfig';

function EditPost() {
    const [post, setPost] = useState(null); 
    const navigate = useNavigate();
    const { slug } = useParams();

    useEffect(() => {
        if (slug) {
            service.getPost(slug).then((fetchedPost) => {
                if (fetchedPost) {
                    setPost(fetchedPost); // Set the single post
                }
            });
        } else {
            navigate(`/`);
        }
    }, [slug, navigate]);

    return post ? ( // Check for single post
        <div className='w-full py-8'>
            <Container>
                <PostCard post={post} />
            </Container>
        </div>
    ) : null;
}

export default EditPost;
