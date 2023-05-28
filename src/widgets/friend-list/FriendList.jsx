import { Box, Typography, useTheme } from '@mui/material';
import {
  FlexBetweenComponent,
  FriendUserComponent,
  WidgetWrapperComponent
} from 'components';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFriends } from 'contexts';
import { UsersService } from 'services';

const FriendList = ({ userId }) => {
  const [friends, setFriends] = useState([]);
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const token = useSelector((state) => state.token);
  const loggedUser = useSelector((state) => state.user);

  const setLoggedUserFriends = () => {
    setFriends(loggedUser.friends);

    // UsersService.getUserFriends(userId, token)
    // .then((res) => {
    //   dispatch(setFriends(() => ({ ...friends, friends: res })));
    //   setFriendsLocalState(loggedUser.friends);
    // })
    // .catch((err) => { console.error(err); });
  };

  const setSelectedUserFriends = (userId, token) => {
    UsersService.getUserFriends(userId, token)
      .then((res) => {
        setFriends(res);
      })
      .catch((err) => { console.error(err); });
  };
  // console.log(listOfFriendIds);
  // const fetchUserFriends = async () => {
  //   await UsersService.getUserFriends(userId, token)
  //     .then((res) => {
  //       dispatch(setFriends({ friends: res }));
  //     })
  //     .catch((err) => { console.error(err); });
  // }

  const initializeFriendList = () => {
    if (loggedUser._id === userId) {
      setLoggedUserFriends();
    } else {
      setSelectedUserFriends(userId, token);
    }
  }


  useEffect(() => {
    initializeFriendList();
  }, [loggedUser]); // eslint-disable-line


  return (
    <WidgetWrapperComponent>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        {loggedUser._id === userId ? (
          `Following `
        ) : (
          `Followers `
        )}
        ({friends.length})
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