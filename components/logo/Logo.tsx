import NextImage from "next/image";
import Link from "next/link";

import useTheme from "@mui/material/styles/useTheme";

interface Props {
  variant?: "img" | "link";
}

export const Logo: React.FC<Props> = ({ variant = "img" }) => {
  const theme = useTheme();

  const src = theme.palette.mode === "light" ? "/logo.png" : "/logo-white.png";

  const img = <NextImage src={src} width={50} height={50} />;

  if (variant === "img") {
    return img;
  }

  return (
    <Link href="/">
      <a>{img}</a>
    </Link>
  );
};
