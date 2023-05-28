import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined
} from "@mui/icons-material";
import {
  Box,
  Typography,
  Divider,
  useTheme
} from "@mui/material";
import {
  ImageUserComponent,
  FlexBetweenComponent,
  WidgetWrapperComponent
} from 'components';
// import { UsersService } from "services";
import linkedln from "assets/icons/linkedin.png";
import twitter from "assets/icons/twitter.png";
import { UsersService } from "services";

const Profile = ({ userId }) => {
  let [user, setUser] = useState(null);

  const token = useSelector((state) => state.token);
  const loggedInUser = useSelector((state) => state.user);

  const { palette } = useTheme(null);
  const dark = palette.neutral.medium;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  const navigate = useNavigate();

  const setSelectedUserData = async (userId, token) => {
    await UsersService.getUser(userId, token)
      .then((res) => {
        console.log(res.data.user);
        setUser(res.data.user);
      })
      .catch((err) => {
        setUser(null);
        console.log("Couldn't set user data: " + err.message);
      })
  }

  const setLoggedInUserData = () => {
    setUser(loggedInUser);
  };

  const initializeCurrentUser = () => {
    if (loggedInUser._id === userId) {
      setLoggedInUserData();
    } else {
      setSelectedUserData(userId, token);
    }
  };

  useEffect(() => {
    initializeCurrentUser();
  }, [loggedInUser]); // eslint-disable-line

  if (!user) {
    return null;
  }

  const {
    firstName,
    lastName,
    picturePath,
    location,
    occupation,
    viewedProfile,
    impressions,
    friends,
  } = user;


  return (
    <WidgetWrapperComponent>
      {/* FIRST ROW */}
      <FlexBetweenComponent
        gap="0.5rem"
        pb="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}>
        <FlexBetweenComponent gap="1rem">
          <ImageUserComponent image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer"
                }
              }}>
              {firstName} {lastName}
            </Typography>
            <Typography color={medium}>{friends.length} Friends</Typography>
          </Box>
        </FlexBetweenComponent>
        <ManageAccountsOutlined />
      </FlexBetweenComponent>
      <Divider />

      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box
          display="flex"
          alignItems="center"
          gap="1rem"
          mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium} >{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={main}>{occupation}</Typography>
        </Box>
      </Box>

      {/* THIRD ROW */}
      <Box p="1rem 0">
        <FlexBetweenComponent mb="0.5rem">
          <Typography color={medium}>Who viewed your profile</Typography>
          <Typography color={main} fontWeight="500">{viewedProfile}</Typography>
        </FlexBetweenComponent>

        <FlexBetweenComponent mb="0.5rem">
          <Typography color={medium}>Impressions of your post</Typography>
          <Typography color={main} fontWeight="500">{impressions}</Typography>
        </FlexBetweenComponent>
      </Box>

      {/* FOURTH ROW */}
      <Box p="1rem 0" >
        <Typography fontSize="1rem" color={main} fontWeight="500" mb="1rem" >
          Social Profiles
        </Typography>

        <FlexBetweenComponent gap="1rem" mb="0.5rem">
          <FlexBetweenComponent gap="1rem">
            <img src={twitter} alt="twitter" />
            <Box>
              <Typography
                color={main}
                fontWeight="500">
                Twitter
              </Typography>
              <Typography color={medium}>Social Network</Typography>
            </Box>
          </FlexBetweenComponent>
          <EditOutlined sx={{ color: main }} />
        </FlexBetweenComponent>

        <FlexBetweenComponent gap="1rem">
          <FlexBetweenComponent gap="1rem">
            <img src={linkedln} alt="linkedin" />
            <Box>
              <Typography
                color={main}
                fontWeight="500">
                Linkedin
              </Typography>
              <Typography color={medium}>Network Platform</Typography>
            </Box>
          </FlexBetweenComponent>
          <EditOutlined sx={{ color: main }} />
        </FlexBetweenComponent>
      </Box>
    </WidgetWrapperComponent>
  )

};

export default Profile;
