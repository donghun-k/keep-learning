import React from 'react';
import { getCart } from '../api/firebase';
import { useQuery } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import CartItem from '../components/CartItem';
import PriceCard from '../components/PriceCard';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { FaEquals } from 'react-icons/fa';

const SHIPPING = 3000;
const MyCart = () => {
  const { uid } = useAuthContext();
  const { isLoading, data: products } = useQuery(['carts'], () => getCart(uid));

  if (isLoading) return <p>Loading...</p>;

  const hasProducts = products && products.length > 0;
  const totalPrice =
    products &&
    products.reduce((acc, cur) => acc + parseInt(cur.price) * cur.quantity, 0);
  return (
    <section>
      <p>내 장바구니</p>
      {!hasProducts && <p>장바구니가 비어있습니다.</p>}
      {hasProducts && (
        <>
          <ul>
            {products.map((product) => (
              <CartItem key={product.id} product={product} uid={uid} />
            ))}
          </ul>
          <div>
            <PriceCard text="상품 총액" price={totalPrice} />
            <BsFillPlusCircleFill />
            <PriceCard text="배송비" price={SHIPPING} />
            <FaEquals />
            <PriceCard text="결제 예정 금액" price={totalPrice + SHIPPING} />
          </div>
        </>
      )}
    </section>
  );
};

export default MyCart;
