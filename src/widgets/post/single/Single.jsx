import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from '@mui/icons-material'
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useTheme
} from "@mui/material";
import {
  FlexBetweenComponent,
  FriendUserComponent,
  WidgetWrapperComponent
} from 'components';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPost } from 'contexts';
import { PostsService } from 'services';
import { API_URL } from 'utils/constants';


const Single = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {

  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [isComments, setIsComments] = useState(false);
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    const updatedPost = await PostsService.patchLikePost(loggedInUserId, postId, token);
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <WidgetWrapperComponent m="2rem 0">
      <FriendUserComponent
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`${API_URL}/assets/${picturePath}`}
        />
      )}
      <FlexBetweenComponent mt="0.25rem">
        <FlexBetweenComponent gap="1rem">

          <FlexBetweenComponent gap="0.3rem" >
            <IconButton onClick={patchLike} >
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetweenComponent>

          <FlexBetweenComponent>
            <IconButton onClick={() => setIsComments(!isComments)} >
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBetweenComponent>
        </FlexBetweenComponent>
        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetweenComponent>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem", pl: "1rem" }} >
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapperComponent>
  )
}

export default Single