export const EachProductCardStyles = {
  description: {
    height: "40px",
    overflow: "hidden",
    width: "270px",
    position: "relative",
    "::after": {
      content: `"..."`,
      position: "absolute",
      right: 0,
      bottom: 0,
    },
  },
  titleText: {
    height: "60px",
    overflow: "hidden",
    position: "relative",
  },
  bolderText: {
    fontWeight: "bolder",
  },
  maxWidth: {
    maxWidth: 345,
  },
};
