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
import { useMediaQuery } from '@mui/material';
const Profile = () => {
  const [user, setUser] = useState(null);
  const loggedInUser = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
  const { userId } = useParams();


  const setLoggedInUser = () => {
    setUser(loggedInUser);
  };

  const setSelectedUser = (userId, token) => {
    UsersService.getUser(userId, token)
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log("Could not set user for the page");
      })
  };

  const initalizeCurrentUser = () => {
    if (userId === loggedInUser._id) {
      setLoggedInUser();
    } else {
      setSelectedUser(userId, token);
    }
  }

  useEffect(() => {
    initalizeCurrentUser();
  }, []); //eslint-disable-line

  if (!user) {
    return null;
  }
  return (
    <>
      {user.firstName}
    </>
  );
}

export default Profile;