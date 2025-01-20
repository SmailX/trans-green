import React, { useState, useEffect, useReducer } from "react";
import Select from "react-select";
import { useCart } from './CartContext';
import styles from "./Cart.module.css";
import emailjs from "emailjs-com";
import CartIcon from "../../assets/img/icons/cart.png";
import "../../styles/customSelect.css";

const initialState = {
  areas: [],
  selectedArea: null,
  cities: [],
  selectedCity: null,
  warehouses: [],
  selectedWarehouse: null,
  name: "",
  phone: "",
  email: "",
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_AREAS':
      return { ...state, areas: action.payload };
    case 'SET_SELECTED_AREA':
      return { ...state, selectedArea: action.payload, cities: [], selectedCity: null };
    case 'SET_CITIES':
      return { ...state, cities: action.payload };
    case 'SET_SELECTED_CITY':
      return { ...state, selectedCity: action.payload, warehouses: [], selectedWarehouse: null };
    case 'SET_WAREHOUSES':
      return { ...state, warehouses: action.payload };
    case 'SET_SELECTED_WAREHOUSE':
      return { ...state, selectedWarehouse: action.payload };
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'SET_PHONE':
      return { ...state, phone: action.payload };
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    default:
      return state;
  }
}

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);

  const API_KEY = "your API key";

  useEffect(() => {
    if (isCheckoutOpen) {
      fetchAreas();
    }
  }, [isCheckoutOpen]);

  const fetchAreas = async () => {
    try {
      const response = await fetch('https://api.novaposhta.ua/v2.0/json/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiKey: API_KEY,
          modelName: 'Address',
          calledMethod: 'getAreas',
        }),
      });
      const data = await response.json();
      if (data.success) {
        const areas = data.data.map((area) => ({ value: area.Ref, label: area.Description }));
        dispatch({ type: 'SET_AREAS', payload: areas });
      } else {
        console.error('Error fetching areas:', data.errors);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const fetchCities = async (areaRef) => {
    try {
      const response = await fetch('https://api.novaposhta.ua/v2.0/json/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiKey: API_KEY,
          modelName: 'Address',
          calledMethod: 'getCities',
          methodProperties: { AreaRef: areaRef },
        }),
      });
      const data = await response.json();
      if (data.success) {
        const cities = data.data.map((city) => ({ value: city.Ref, label: city.Description }));
        dispatch({ type: 'SET_CITIES', payload: cities });
      } else {
        console.error('Error fetching cities:', data.errors);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const fetchWarehouses = async (cityRef) => {
    try {
      const response = await fetch('https://api.novaposhta.ua/v2.0/json/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiKey: API_KEY,
          modelName: 'Address',
          calledMethod: 'getWarehouses',
          methodProperties: { CityRef: cityRef },
        }),
      });
      const data = await response.json();
      if (data.success) {
        const warehouses = data.data.map((warehouse) => ({ value: warehouse.Ref, label: warehouse.Description }));
        dispatch({ type: 'SET_WAREHOUSES', payload: warehouses });
      } else {
        console.error('Error fetching warehouses:', data.errors);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  const sendEmail = () => {
    const templateParams = {
      name: state.name,
      phone: state.phone,
      email: state.email,
      area: state.selectedArea?.label,
      city: state.selectedCity?.label,
      warehouse: state.selectedWarehouse?.label,
      cartItems: cartItems.map(item => `${item.name} (x${item.quantity})`).join(', '),
    };

    emailjs.send(
      'your EmailJS service ID',
      'EmailJS template ID',
      templateParams,
      'EmailJS user ID'
    )
    .then((response) => {
      console.log('Email sent successfully:', response.status, response.text);
      alert('Замовлення успішно відправлено!');
    })
    .catch((error) => {
      console.error('Failed to send email:', error);
      alert('Сталася помилка при відправці замовлення.');
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      sendEmail();
    }
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9]{10,15}$/;

    if (!state.name) {
      alert("Будь ласка, введіть ваше ім'я.");
      return false;
    }
    if (!phoneRegex.test(state.phone)) {
      alert("Будь ласка, введіть дійсний номер телефону.");
      return false;
    }
    if (!emailRegex.test(state.email)) {
      alert("Будь ласка, введіть дійсний email.");
      return false;
    }
    if (!state.selectedArea) {
      alert("Будь ласка, виберіть область.");
      return false;
    }
    if (!state.selectedCity) {
      alert("Будь ласка, виберіть місто.");
      return false;
    }
    if (!state.selectedWarehouse) {
      alert("Будь ласка, виберіть відділення.");
      return false;
    }
    return true;
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity > 0) {
      updateQuantity(id, newQuantity);
    } else {
      alert("Кількість товару повинна бути більше нуля.");
    }
  };

  return (
    <div className={styles.cartContainer}>
      <h1>Кошик</h1>
      {cartItems.length === 0 ? (
        <div className={styles.emptyCart}>
          <img src={CartIcon} alt="cart" />
          <h1>Кошик порожній</h1>
        </div>
      ) : (
        <div>
          {cartItems.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.leftSection}>
                <img src={product.imgs?.img1} alt={product.name} className={styles.productImage} />
              </div>
              <div className={styles.rightSection}>
                <h2>{product.name}</h2>
                <p>Ціна: <strong>{product.price*product.quantity}</strong> ₴</p>
                <div className={styles.quantityControl}>
                  <button
                    className={styles.quantityButton}
                    onClick={() => handleQuantityChange(product.id, product.quantity - 1)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={product.quantity}
                    onChange={(e) =>
                      handleQuantityChange(product.id, parseInt(e.target.value, 10) || 0)
                    }
                    className={styles.quantityInput}
                  />
                  <button
                    className={styles.quantityButton}
                    onClick={() => handleQuantityChange(product.id, product.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  className={styles.removeButton}
                  onClick={() => removeFromCart(product.id)}
                >
                  Видалити
                </button>
              </div>
            </div>
          ))}
          <button className={styles.checkoutButton} onClick={() => setIsCheckoutOpen(true)}>
            Оформити замовлення
          </button>

          {isCheckoutOpen && (
            <div className={styles.modal}>
              <div className={styles.modalContent}>
                <h2>Оформлення замовлення</h2>
                <form onSubmit={handleSubmit}>
                  <div className={styles.formGroup}>
                    <label>Ім'я:</label>
                    <input
                      type="text"
                      placeholder="Введіть ваше ім'я"
                      value={state.name}
                      onChange={(e) => dispatch({ type: 'SET_NAME', payload: e.target.value })}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Телефон:</label>
                    <input
                      type="tel"
                      placeholder="Введіть ваш номер телефону"
                      value={state.phone}
                      onChange={(e) => dispatch({ type: 'SET_PHONE', payload: e.target.value })}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Email:</label>
                    <input
                      type="email"
                      placeholder="Введіть ваш email"
                      value={state.email}
                      onChange={(e) => dispatch({ type: 'SET_EMAIL', payload: e.target.value })}
                      required
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Область:</label>
                    <Select
                      options={state.areas}
                      onChange={(selectedOption) => {
                        dispatch({ type: 'SET_SELECTED_AREA', payload: selectedOption });
                        fetchCities(selectedOption.value);
                      }}
                      value={state.selectedArea}
                      placeholder="Виберіть область"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Місто:</label>
                    <Select
                      options={state.cities}
                      onChange={(selectedOption) => {
                        dispatch({ type: 'SET_SELECTED_CITY', payload: selectedOption });
                        fetchWarehouses(selectedOption.value);
                      }}
                      value={state.selectedCity}
                      placeholder="Виберіть місто"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label>Відділення:</label>
                    <Select
                      options={state.warehouses}
                      onChange={(selectedOption) => dispatch({ type: 'SET_SELECTED_WAREHOUSE', payload: selectedOption })}
                      value={state.selectedWarehouse}
                      placeholder="Виберіть відділення"
                    />
                  </div>
                  <div className={styles.buttonBlock}>
                    <button type="button" className={styles.closeButton} onClick={() => setIsCheckoutOpen(false)}>
                      Скасувати
                    </button>
                    <button type="submit" className={styles.submitButton}>
                      Підтвердити
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
