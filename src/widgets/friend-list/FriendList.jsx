import { Box, Typography, useTheme } from '@mui/material';
import {
  FriendUserComponent,
  WidgetWrapperComponent
} from 'components';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { setFriends } from 'contexts';
import { UsersService } from 'services';

const FriendList = ({ userId }) => {
  const [friends, setFriends] = useState([]);
  const { palette } = useTheme();

  const token = useSelector((state) => state.token);
  const loggedUser = useSelector((state) => state.user);


  const setSelectedUserFriends = (userId, token) => {
    UsersService.getUserFriends(userId, token)
      .then((res) => {
        console.log(res);
        setFriends(res);
      })
      .catch((err) => { console.error(err); });
  };


  useEffect(() => {
    // initializeFriendList();
    setSelectedUserFriends(userId, token);
  }, [loggedUser]); // eslint-disable-line


  return (
    <WidgetWrapperComponent>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Followings ({friends.length})
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem" >
        {!friends.length ? (
          <Box>No Friends Yet</Box>
        ) : (
          friends.map((friend, i) => (
            <FriendUserComponent
              key={`${friend._id} ${i}`}
              friendId={friend._id}
              name={`${friend.firstName} ${friend.lastName}`}
              subtitle={friend.occupation}
              userPicturePath={friend.picturePath}
            />
          ))
        )}
      </Box>
    </WidgetWrapperComponent>
  )
}

export default FriendList