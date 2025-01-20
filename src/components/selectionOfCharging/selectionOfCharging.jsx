import styles from "./selectionOfCharging.module.css";
import React, { useState, useEffect } from "react";
import "../../styles/customSelect.css"
import Select from "react-select";
import { Link } from "react-router-dom";

import carData from "../../../public/UpdatedCarDataBase.json";
import chargerData from "../../../public/chargers.json";

export default function SelectionOfCharging() {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [filteredCars, setFilteredCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [availableChargers, setAvailableChargers] = useState([]);

  useEffect(() => {
    alert("Якщо ви помітили помилку, або ваше авто відсутнє, просимо написати нам про це на пошту або у месенджери");
  }, []);

  // Уникальные регионы
  const regionOptions = [
    ...new Set(carData.electric_cars.map((car) => car.country || "Unknown")),
  ].map((region) => ({ value: region, label: region }));

  // Фильтрация автомобилей по выбранному региону
  const handleRegionSelection = (selectedOption) => {
    setSelectedRegion(selectedOption);
    setFilteredCars(
      carData.electric_cars.filter((car) => car.country === selectedOption.value)
    );
    setSelectedCar(null); // Очистка выбора автомобиля
    setAvailableChargers([]);
  };

  // Список автомобилей для выбранного региона
  const carOptions = filteredCars.map((car) => ({
    value: car.name,
    label: car.name,
  }));

  const handleCarSelection = (selectedOption) => {
    const carName = selectedOption ? selectedOption.value : "";

    setSelectedCar(null);
    setAvailableChargers([]);

    const car = carData.electric_cars.find((c) => c.name === carName);

    if (car) {
      const carPower = parseFloat(
        (car.power_consumption || "").replace(/[^0-9.,]/g, "").replace(",", ".")
      );

      const matchingChargers = chargerData.Products.filter((product) =>
        product.variants.some((variant) => {
          const chargerPower = parseFloat(
            (variant.power || product.power || "").replace(/[^0-9.,]/g, "").replace(",", ".")
          );
          return chargerPower <= carPower;
        })
      );

      setSelectedCar(car);
      setAvailableChargers(matchingChargers);
    }
  };

  return (
    <div className={styles.relevantChargers}>
      <h1>Выбор зарядного устройства</h1>

      <div className={styles.selectorsBlock}>
      <div className={styles.formGroup}>
          <label>Выберите регион:</label>
          <Select
            options={regionOptions}
            onChange={handleRegionSelection}
            value={selectedRegion}
            placeholder="Выберите регион"
            className="custom-select"
            classNamePrefix="custom-select"
          />
        </div>

        {selectedRegion && (
          <div className={styles.formGroup}>
            <label>Выберите автомобиль:</label>
            <Select
              options={carOptions}
              onChange={handleCarSelection}
              value={carOptions.find((option) => option.value === selectedCar?.name) || null}
              placeholder="Выберите автомобиль"
              className="custom-select"
              classNamePrefix="custom-select"
            />
          </div>
        )}
      </div>


      {/* Список зарядных устройств */}
      {availableChargers.length > 0 ? (
        <div>
          <h2>Подходящие зарядные устройства:</h2>
          <ul className={styles.productCardBlock}>
            {availableChargers.map((product) => (
              <div key={product.id} className={styles.productCard}>
              <li>
                <Link to={`/${product.id}`}>
                  <img src={product.image} alt={product.name} />
                </Link>
                <h3>{product.name}</h3>
                <p>Категория: {product.category}</p>
                <p>Мощность: {product.power} кВт</p>
                <p>Цена: {product.price} ₴</p>
              </li>
              </div>
            ))}
          </ul>
        </div>
      ) : selectedCar ? (
        <p>Нет подходящих зарядных устройств для выбранного автомобиля.</p>
      ) : null}
    </div>
  );
}