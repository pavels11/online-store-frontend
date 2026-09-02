interface ProductRatingProps {
  rating: number;
}

function ProductRating({ rating }: ProductRatingProps) {
  return <div aria-label={`Рейтинг товара: ${rating} из 5`}>★ {rating.toFixed(1)}</div>;
}

export default ProductRating;
