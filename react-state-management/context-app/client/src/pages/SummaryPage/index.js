import React from 'react';
import { useState } from 'react';

const SummaryPage = () => {
  const [checked, setChecked] = useState(false);
  return (
    <div>
      <form>
        <input
          type="checkbox"
          checked={checked}
          id="confirm-checkbox"
          onClick={(e) => setChecked(e.target.checked)}
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
