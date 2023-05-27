import React, { useContext } from 'react';
import { useState } from 'react';
import { OrderContext } from '../contexts/OrderContext';

const SummaryPage = ({ setStep }) => {
  const [checked, setChecked] = useState(false);
  const [orderDetails] = useContext(OrderContext);

  const productArray = Array.from(orderDetails.products);
  const productList = productArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  const hasOptions = orderDetails.options.size > 0;
  let optonsDisplay = null;

  if (hasOptions) {
    const optionArray = Array.from(orderDetails.options.keys());
    const optionsList = optionArray.map((option) => (
      <li key={option}>{option}</li>
    ));
    optonsDisplay = (
      <>
        <h2>옵션: {orderDetails.totals.options}</h2>
        <ul>{optionsList}</ul>
      </>
    );
  }

  return (
    <div>
      <h1>주문 내역</h1>
      <h2>여행 상품: {orderDetails.totals.products} </h2>
      <ul>{productList}</ul>
      {optonsDisplay}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setStep(2);
        }}
      >
        <input
          type="checkbox"
          checked={checked}
          id="confirm-checkbox"
          onChange={(e) => setChecked(e.target.checked)}
        />
        <label htmlFor="confirm-checkbox">
          주문 내역을 확인하였으며, 결제에 동의합니다.
        </label>
        <br />
        <button disabled={!checked} type="submit">
          결제하기
        </button>
      </form>
    </div>
  );
};

export default SummaryPage;
