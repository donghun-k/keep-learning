import React from 'react';
import { getCart } from '../api/firebase';
import { useQuery } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';
import CartItem from '../components/CartItem';
import PriceCard from '../components/PriceCard';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { FaEquals } from 'react-icons/fa';
import Button from '../components/ui/Button';

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
    <section className="p-8 flex flex-col">
      <p className="text-2xl text-center font-bold pb-4 border-b border-gray-300">
        내 장바구니
      </p>
      {!hasProducts && <p>장바구니가 비어있습니다.</p>}
      {hasProducts && (
        <>
          <ul className="border-b border-gray-300 mb-8 p-4 px-8">
            {products.map((product) => (
              <CartItem key={product.id} product={product} uid={uid} />
            ))}
          </ul>
          <div className="flex justify-between items-center mb-6 px-2 md:p-8 lg:px-16">
            <PriceCard text="상품 총액" price={totalPrice} />
            <BsFillPlusCircleFill className="shrink-0" />
            <PriceCard text="배송비" price={SHIPPING} />
            <FaEquals className="shrink-0" />
            <PriceCard text="결제 예정 금액" price={totalPrice + SHIPPING} />
          </div>
          <Button text="주문하기" />
        </>
      )}
    </section>
  );
};

export default MyCart;
