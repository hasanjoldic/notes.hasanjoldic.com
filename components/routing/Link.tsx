import NextLink from "next/link";

import styled from "@mui/material/styles/styled";

const StyledLink = styled("a")(({ theme }) => ({
  // position: "relative",
  // "&:after": {
  //   content: '""',
  //   position: "absolute",
  //   bottom: 0,
  //   left: 0,
  //   width: "100%",
  //   height: 1,
  //   transform: "scaleX(0)",
  //   // transformOrigin: "bottom right",
  //   // transition: "transform .15s ease-out",
  //   // backgroundColor: theme.palette.primary.main,
  //   backgroundColor: "#fff",
  // },
  // "&:hover:after": {
  //   transform: "scaleX(1)",
  //   // transformOrigin: "bottom left",
  // },
}));

interface Props
  extends React.PropsWithChildren,
    React.HTMLProps<HTMLAnchorElement> {
  href: string;
}

export const Link: React.FC<Props> = ({ children, href }) => {
  return (
    <NextLink href={href}>
      <StyledLink href={href}>{children}</StyledLink>
    </NextLink>
  );
};
