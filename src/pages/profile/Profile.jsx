import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { UsersService } from 'services';
import { useParams } from 'react-router-dom';
import {
  HeaderWidget,
  FriendListWidget,
  MultiplePostWidget,
  CreatePostWidget,
  ProfileWidget
} from 'widgets';
import { useMediaQuery, Box } from '@mui/material';

const Profile = () => {
  const [user, setUser] = useState(null);
  const loggedInUser = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const { userId } = useParams();


  // const setLoggedInUser = () => {
  //   setUser(loggedInUser);
  // };

  const setSelectedUser = (userId, token) => {
    UsersService.getUser(userId, token)
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log("Could not set user for the page");
      })
  };

  // const initalizeCurrentUser = () => {
  //   if (userId === loggedInUser._id) {
  //     setLoggedInUser();
  //   } else {
  //     setSelectedUser(userId, token);
  //   }
  // }

  useEffect(() => {
    // initalizeCurrentUser();
    setSelectedUser(userId, token);
  }, []); //eslint-disable-line

  if (!user) {
    return null;
  }
  return (
    <Box>
      <HeaderWidget />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <ProfileWidget userId={userId} />
          <Box m="2rem 0" />
          <FriendListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}>
          <CreatePostWidget />
          <Box m="2rem 0" />
          <MultiplePostWidget userId={user._id} isProfile />
        </Box>
        {
          isNonMobileScreens && (<Box flexBasis="26%">
            <Box m="2rem 0"></Box>
          </Box>)
        }
      </Box>
    </Box>
  );
}

export default Profile;