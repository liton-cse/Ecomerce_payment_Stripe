import SpecialProductCard from "./SpecialProductCard.js";
import { useSelector, useDispatch } from "react-redux";
import type { SubscriptionProduct } from "../../type/SepcialProduct/spacialProduct.type.js";
import { useEffect, useState } from "react";
import { fetchSubscriptions } from "../../redux/feature/Special_Product/subscriptionSlice.js";
import type { AppDispatch, RootState } from "../../redux/app/store.js";
const ProductGrid = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [subscriptionsProduct, setSubscriptionsProduct] = useState<
    SubscriptionProduct[]
  >([]);
  const { subscriptions } = useSelector((state: RootState) => state.subscribe);

  useEffect(() => {
    dispatch(fetchSubscriptions());
  }, [dispatch]);

  useEffect(() => {
    setSubscriptionsProduct(subscriptions);
  });
  return (
    <div className="container mx-auto px-4 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {subscriptionsProduct.map((product) => (
          <SpecialProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
