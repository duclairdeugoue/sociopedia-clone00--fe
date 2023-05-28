import { Typography, useTheme } from "@mui/material";
import { FlexBetweenComponent, WidgetWrapperComponent } from "components";
import { API_URL } from "utils/constants";


const Advert = () => {
    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    return (
        <WidgetWrapperComponent>
            <FlexBetweenComponent>
                <Typography color={dark} variant="h5" fontWeight="500">
                    Sponsored
                </Typography>
                <Typography color={medium} >Create Ad</Typography>
            </FlexBetweenComponent>
            <img
                width="100%"
                height="auto"
                alt="advert"
                src={`${API_URL}/assets/info4.jpeg`}
                stype={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
            />
            <Typography color={main} >MikaCosmetics</Typography>
            <Typography color={medium} >mikacosmetics.com</Typography>
            <Typography>
                Your pathway to stunning and immaculate beaty and made sure your skin is exfoliating skin and shining like a light.
            </Typography>
        </WidgetWrapperComponent>
    )
}

export default Advert;