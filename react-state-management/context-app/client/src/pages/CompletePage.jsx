import React, { useEffect, useContext, useState } from 'react';
import { OrderContext } from '../contexts/OrderContext';
import axios from 'axios';

const CompletePage = ({ setStep }) => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [orderData] = useContext(OrderContext);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    orderCompleted(orderData);
  }, [orderData]);

  const orderCompleted = async (orderData) => {
    try {
      const res = await axios.post('http://localhost:4000/order', orderData);
      setOrderHistory(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const orderTable = orderHistory.map((order) => (
    <tr key={order.orderNumber}>
      <td>{order.orderNumber}</td>
      <td>{order.price}</td>
    </tr>
  ));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>주문이 완료되었습니다!</h2>
      <h3>주문 내역</h3>
      <table style={{ margin: 'auto' }}>
        <tbody>
          <tr>
            <th>number</th>
            <th>price</th>
          </tr>
          {orderTable}
        </tbody>
      </table>
      <br />
      <button
        onClick={() => {
          setStep(0);
        }}
      >
        첫 페이지로
      </button>
    </div>
  );
};

export default CompletePage;
