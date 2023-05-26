import {
    EditOutlined,
    DeleteOutlined,
    AttachFileOutlined,
    GifBoxOutlined,
    ImageOutlined,
    MicOutlined,
    MoreHorizOutlined
} from "@mui/icons-material";
import {
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
    useMediaQuery
} from "@mui/material";
import {
    FlexBetweenComponent,
    UserImageComponent,
    WidgetWrapperComponent
} from "components";
import Dropzone from "react-dropzone";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "contexts";
import { PostsService } from "services";

const Create = ({ picturePath }) => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [post, setPost] = useState("");
    const { palette } = useTheme();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const mediumMain = palette.neutral.mediumMain;
    const medium = palette.neutral.medium;

    const handlePost = async () => {
        const formData = new FormData();

        formData.append("userId", _id);
        formData.append("description", post);
        if (image) {
            formData.append("picture", image);
            formData.append("picturePath", image.name);
        }

        const posts = await PostsService.createPost(formData, token);
        dispatch(setPosts({ posts }));
        setIsImage(null);
        setPost("");
    }
    return (
        <WidgetWrapperComponent>
            <FlexBetweenComponent gap="1.5rem">
                <UserImageComponent image={picturePath} />
                <InputBase
                    placeholder="What is on your mind...?"
                    onChange={(e) => setPost(e.target.value)}
                    value={post}
                    sx={{
                        width: "100%",
                        backgroundColor: palette.neutral.light,
                        borderRadius: "2rem",
                        padding: "1rem 2rem",
                    }}
                />
            </FlexBetweenComponent>
            {isImage && (
                <Box
                    border={`1px solid ${medium}`}
                    borderRadius="5px"
                    mt="1rem"
                    p="1rem">
                    <Dropzone
                        acceptedFiles=".jpg,.jpeg,.png"
                        multiple={false}
                        onDrop={(acceptedFiles) => {
                            setImage(acceptedFiles[0])
                        }}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <FlexBetweenComponent>
                                <Box
                                    {...getRootProps()}
                                    border={`2px dashed ${palette.primary.main}`}
                                    p="1rem"
                                    width="100%"
                                    sx={{ "&:hover": { cursor: "pointer" } }}
                                >
                                    <input {...getInputProps()} />
                                    {!image ? (
                                        <p>Click here to add a image</p>
                                    ) : (
                                        <FlexBetweenComponent>
                                            <Typography>
                                                {image.name}
                                            </Typography>
                                            <EditOutlined />
                                        </FlexBetweenComponent>
                                    )
                                    }

                                </Box>
                                <IconButton
                                    onClick={() => setIsImage(null)}
                                    sx={{ width: "15%" }}
                                >
                                    <DeleteOutlined />
                                </IconButton>
                            </FlexBetweenComponent>
                        )}
                    </Dropzone>
                </Box>
            )}

            <Divider sx={{ margin: "1.25rem 0" }} />

            <FlexBetweenComponent>
                <FlexBetweenComponent gap="0.25rem" onClick={() => setIsImage(!isImage)}>
                    <ImageOutlined sx={{ color: mediumMain }} />
                    <Typography sx={{ "&:hover": { cursor: "pointer", color: medium } }} >
                        Image
                    </Typography>
                </FlexBetweenComponent>
                {isNonMobileScreens ? (
                    <>
                        <FlexBetweenComponent gap="0.25rem">
                            <GifBoxOutlined sx={{ color: medium }} />
                            <Typography color={mediumMain}>Clip</Typography>
                        </FlexBetweenComponent>

                        <FlexBetweenComponent gap="0.25rem">
                            <AttachFileOutlined sx={{ color: medium }} />
                            <Typography color={mediumMain}>Attachment</Typography>
                        </FlexBetweenComponent>

                        <FlexBetweenComponent gap="0.25rem">
                            <MicOutlined sx={{ color: medium }} />
                            <Typography color={mediumMain}>Audio</Typography>
                        </FlexBetweenComponent>

                    </>
                ) : (
                    <FlexBetweenComponent gap="0.25rem" >
                        <MoreHorizOutlined sx={{ color: mediumMain }} />
                    </FlexBetweenComponent>
                )}

                <Button
                    disabled={!post}
                    onClick={handlePost}
                    sx={{
                        color: palette.background.alt,
                        backgroundColor: palette.primary.main,
                        borderRadius: "3rem",
                        fontWeight: "500",
                    }}
                >
                    POST
                </Button>
            </FlexBetweenComponent>
        </WidgetWrapperComponent>
    )
}

export default Create;