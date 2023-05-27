import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "contexts";
import { UsersService } from "services";
import { FlexBetweenComponent, ImageUserComponent } from "components";


const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const friends = useSelector((state) => state.user.friends);

    const { palette } = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    const isFriend = friends.find((friend) => friend._id === friendId);

    const patchFriend = async () => {
        const updatedFriendsList = await UsersService.addRemoveFriend(_id, friendId, token);
        dispatch(setFriends({ friends: updatedFriendsList }));
    };

    return (
        <FlexBetweenComponent>
            <FlexBetweenComponent gap="1rem">
                <ImageUserComponent image={userPicturePath} size="55px" />
                <Box
                    onClick={() => {
                        navigate(`/profile/${friendId}`);
                        navigate(0);
                    }}
                >
                    <Typography
                        color={main}
                        variant="h5"
                        fontWeight="500"
                        sx={{
                            "&:hover": palette.primary.light,
                            cursor: "pointer"
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography color={medium} fontSize="0.75rem">
                        {subtitle}
                    </Typography>
                </Box>
            </FlexBetweenComponent>
            {_id !== friendId && (
                <IconButton
                    onClick={() => {
                        patchFriend()
                        // navigate(0)
                    }}
                    sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
                >
                    {isFriend ? (
                        <PersonRemoveOutlined sx={{ color: primaryDark }} />
                    ) : (
                        <PersonAddOutlined sx={{ color: primaryDark }} />
                    )}
                </IconButton>
            )}
        </FlexBetweenComponent>
    )
}

export default Friend;