import { useSelector } from "react-redux";
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
  UserImage,
  FlexBetween,
  WidgetWrapper
} from 'components/molecules';


const HomeCardUserProfile = ({ userId, picturePath }) => {
  const [user, setUser] = useState(null);
  const { palette } = useTheme(null);
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
}

export default HomeCardUserProfile;
