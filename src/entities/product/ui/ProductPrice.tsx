interface ProductPriceProps {
  price: number;
  discountPercentage: number;
}

function ProductPrice({ price, discountPercentage }: ProductPriceProps) {
  const discountedPrice = price * (1 - discountPercentage / 100);

  return (
    <div>
      <p>
        <strong>${discountedPrice.toFixed(2)}</strong>
      </p>

      {discountPercentage > 0 && (
        <p>
          <s>${price.toFixed(2)}</s> <span>-{discountPercentage.toFixed(0)}%</span>
        </p>
      )}
    </div>
  );
}

export default ProductPrice;
