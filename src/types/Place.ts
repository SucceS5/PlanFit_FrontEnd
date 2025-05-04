export interface Place {
  id: string;
  name: string;
  address: string;
  imageUrl: string;
  category: "음식점" | "카페" | "놀거리" | "명소";
}
