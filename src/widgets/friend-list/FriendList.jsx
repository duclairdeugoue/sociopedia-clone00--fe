import { Box, Typography, useTheme } from '@mui/material';
import {
  FlexBetweenComponent,
  FriendUserComponent,
  WidgetWrapperComponent
} from 'components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFriends } from 'contexts';
import { UsersService } from 'services';

const FriendList = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);

  // console.log(listOfFriendIds);
  const fetchUserFriends = async () => {
    await UsersService.getUserFriends(userId, token)
      .then((res) => {
        dispatch(setFriends({ friends: res }));
      })
      .catch((err) => { console.error(err); });
  }

  useEffect(() => {
    fetchUserFriends();
  }, []); // eslint-disable-line

  return (
    <WidgetWrapperComponent>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem" >
        {!friends ? (
          <Box>No Friends Yet</Box>
        ) : (
          friends.map((friend) => (
            <FriendUserComponent
              key={friend._id}
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