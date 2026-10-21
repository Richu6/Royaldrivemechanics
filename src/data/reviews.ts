export interface ReviewExcerpt {
  id: string;
  quote: string;
  author: string;
  source: string;
}

export const reviewsData: ReviewExcerpt[] = [
  {
    id: "rev-1",
    quote: "Mirshad provided great service at the best price.",
    author: "Google review",
    source: "Google"
  },
  {
    id: "rev-2",
    quote: "Excellent service and reasonable rate!",
    author: "Google review",
    source: "Google"
  },
  {
    id: "rev-3",
    quote: "Great place to give your car.",
    author: "Google review",
    source: "Google"
  }
];
