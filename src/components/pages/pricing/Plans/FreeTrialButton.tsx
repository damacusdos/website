import PurpleBgButton from "components/buttons/PurpleBg";
import DarkGradientBg from "components/buttons/DarkGradientBg";
import WhiteBgSimple from "components/buttons/WhiteBgSimple";

interface FreeTrialButtonProps {
  buttonType: string;
  children: React.ReactNode;
  height: string;
  width: string;
  link: string;
  [x: string]: any;
}

const FreeTrialButton = ({
  buttonType,
  children,
  height,
  width,
  link,
  ...other
}: FreeTrialButtonProps) => {
  if (buttonType === "WhiteBgSimple") {
    return (
      <WhiteBgSimple
        height={height}
        width={width}
        link="mailto:sales@courier.com"
        {...other}
      >
        {children}
      </WhiteBgSimple>
    );
  } else if (buttonType === "DarkGradientBg") {
    return (
      <DarkGradientBg height={height} width={width} link={link} {...other}>
        {children}
      </DarkGradientBg>
    );
  } else {
    return (
      <PurpleBgButton height={height} width={width} link={link} {...other}>
        {children}
      </PurpleBgButton>
    );
  }
};

export default FreeTrialButton;
