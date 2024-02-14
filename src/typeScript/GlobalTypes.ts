export interface RatingType {
  rate: number;
  count: number;
}
export interface EachProductType {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: RatingType;
}

export interface CartItemType extends EachProductType {
  quantity: number;
}
