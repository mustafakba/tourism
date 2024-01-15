import React, { useState, ChangeEvent, FocusEvent, MouseEvent } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";

interface PaymentFormProps {
  onButtonClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ onButtonClick }) => {
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt: FocusEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const handleNumberInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;

    // Sadece rakamları kabul et
    const numericValue = value.replace(/\D/g, "");

    // Maksimum uzunluğu kontrol et
    if (numericValue.length <= 16) {
      setState((prev) => ({ ...prev, [name]: numericValue }));
    }
  };

  return (
    <div>
      <Cards
        number={state.number}
        expiry={state.expiry}
        cvc={state.cvc}
        name={state.name}
        focused={state.focus as any}
      />
      <form
        className={"flex my-4 flex-col gap-y-3 ml-auto mr-auto max-w-[500x]"}
      >
        <div className={"form-item flex flex-col"}>
          <label htmlFor="number">Kart Numarası:</label>
          <input
            type="number"
            name="number"
            className={"border py-2 px-8"}
            placeholder="Card Number"
            value={state.number}
            onChange={handleNumberInputChange}
            onFocus={handleInputFocus}
            maxLength={12}
          />
        </div>
        <div className={"form-item flex flex-col"}>
          <label htmlFor="name">Card Owner Name</label>
          <input
            type="text"
            name="name"
            className={"border py-2 px-8"}
            placeholder="Name"
            value={state.name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
        </div>
        <div className={"grid grid-cols-2 gap-x-4"}>
          <div className={"flex flex-col"}>
            <label htmlFor="expiry">Expiry Time</label>
            <input
              type="text"
              name="expiry"
              className={"border py-2 px-8"}
              placeholder="MM/YY Expiry"
              value={state.expiry}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>
          <div className={"flex flex-col"}>
            <label htmlFor="cvc">CVC</label>
            <input
              type="number"
              name="cvc"
              className={"border py-2 px-8"}
              placeholder="CVC"
              value={state.cvc}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>
        </div>
      </form>
      <button
        onClick={onButtonClick}
        className={
          "flex w-full text-white py-2 justify-center items-center bg-primary-50 hover:bg-primary-200 duration-200 "
        }
      >
        Pay
      </button>
    </div>
  );
};

export default PaymentForm;
