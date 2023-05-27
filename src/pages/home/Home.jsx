import { Box, useMediaQuery } from "@mui/material";
import { HeaderWidget, ProfileWidget, CreatePostWidget, MultiplePostWidget } from "widgets";
import { useSelector } from "react-redux";

const Home = () => {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const { _id, picturePath } = useSelector((state) => state.user);
    return (
        <Box>
            <HeaderWidget />
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="0.5rem"
                justifyContent="space-between">
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    <ProfileWidget userId={_id} picturePath={picturePath} />
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}>
                    <CreatePostWidget picturePath={picturePath} />
                    <MultiplePostWidget userId={_id} />
                </Box>
                {
                    isNonMobileScreens && (<Box flexBasis="26%"></Box>)
                }
            </Box>
        </Box>
    )
}

export default Home;
