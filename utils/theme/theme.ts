const colors = {
  shadow: "#21262d",
};
const shadow = `1px solid ${colors.shadow}`;

export const styles = {
  shadow: {
    default: shadow,
  },
};

export const themeOptions = {
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          margin: "0.5rem 0",
        },
      },
    },
  },
};
