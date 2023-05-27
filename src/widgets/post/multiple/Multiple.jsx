import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "contexts";
import { SinglePostWidget } from "widgets";
import { PostsService } from "services";

const Multiple = ({ userId, isProfile = false }) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);

    const fetchPostsByUser = async () => {
        const data = await PostsService.getUserPosts(userId, token);
        dispatch(setPosts({ posts: data }));
    }
    const fetchPosts = async () => {
        const data = await PostsService.getPosts(token);
        dispatch(setPosts({ posts: data }));
    }

    useEffect(() => {
        if (isProfile) {
            fetchPostsByUser();
        } else {
            fetchPosts();
        }
    }, []); // eslint-disable-line  react-hooks/exhaustive-deps

    return (
        <>
            {posts.map(({
                _id,
                userId,
                firstName,
                lastName,
                description,
                location,
                picturePath,
                userPicturePath,
                likes,
                comments
            }) => (
                <SinglePostWidget
                    key={_id}
                    postId={_id}
                    postUserId={userId}
                    name={`${firstName} ${lastName}`}
                    description={description}
                    location={location}
                    picturePath={picturePath}
                    userPicturePath={userPicturePath}
                    likes={likes}
                    comments={comments}
                />
            ))}
        </>
    );
}

export default Multiple