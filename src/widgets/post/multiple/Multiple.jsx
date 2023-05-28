import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "contexts";
import { SinglePostWidget } from "widgets";
import { PostsService } from "services";

const Multiple = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const fetchPostsByUser = () => {
    PostsService.getUserPosts(userId, token)
      .then((userPosts) => {
        console.log("user posts fetched successfully");
        dispatch(setPosts({ posts: userPosts }));
      })
      .catch((err) => {
        dispatch(setPosts({ posts: [] }));
        console.log("Error ", err.message)
      });
  }
  const fetchPosts = () => {
    PostsService.getPosts(token)
      .then((res) => {
        if (res.ok) {
          console.log("post fetched successfully");
          dispatch(setPosts({ posts: res.data.posts }));

        } else {
          console.log("some went wrong");
        }
      })
      .catch((err) => {
        dispatch(setPosts({ posts: [] }));
        console.log("Error ", err.message)
      });


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