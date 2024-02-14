import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EachProductType } from "../../typeScript/GlobalTypes";

interface InitialStateType {
  apiStatus: "INITIAL" | "SUCCESS" | "PENDING" | "REJECTED";
  products: EachProductType[];
}

const initialState: InitialStateType = {
  apiStatus: "INITIAL",
  products: [],
};

export const gettingProducts = createAsyncThunk(
  "fetchingproducts",
  async () => {
    console.log("entered");
    const allProductsUrl = "https://fakestoreapi.com/products";
    const response = await fetch(allProductsUrl);
    return await response.json();
  }
);

const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(gettingProducts.pending, (state) => {
      state.apiStatus = "PENDING";
    });
    builder.addCase(
      gettingProducts.fulfilled,
      (state, action: PayloadAction<EachProductType[]>) => {
        state.apiStatus = "SUCCESS";
        state.products = action.payload;
        console.log(action.payload);
      }
    );
    builder.addCase(gettingProducts.rejected, (state) => {
      state.apiStatus = "REJECTED";
    });
  },
});

export default ProductSlice.reducer;
