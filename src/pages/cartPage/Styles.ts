export const CartStyles = {
  minWidth: {
    minWidth: 650,
  },
  bolderText: {
    fontWeight: "bolder",
  },
  tableRow: { "&:last-child td, &:last-child th": { border: 0 } },
  cartImage: {
    width: "100px",
    aspectRatio: "1/1",
  },
  buttonContainer: {
    display: "flex",
    width: "100px",
    ml: "auto",
    justifyContent: "space-around",
    alignItems: "center",
  },
  destopView: { display: { xs: "none", md: "block" } },
  mobileView: { display: { xs: "block", md: "none" } },
};
