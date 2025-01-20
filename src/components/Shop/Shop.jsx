import React, { useState, useEffect } from 'react';
import styles from './Shop.module.css';
import { Link } from 'react-router-dom';
import filter from '../../assets/img/icons/filter.png';
import { style } from '@splidejs/splide/src/js/utils';

export default function Shop() {
  const [productsData, setProductsData] = useState([]);
  const [error, setError] = useState(null);
  const [sortCriteria, setSortCriteria] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedPowers, setSelectedPowers] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  useEffect(() => {
    fetch('chargers.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP помилка! статус: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setProductsData(data.Products);
      })
      .catch(error => setError(error.message));
  }, []);

  const openFilter = () => {
    setIsFilterVisible(true);
  };

  const closeFilter = () => {
    setIsFilterVisible(false);
  };

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible); // Перемикання видимості фільтра
  };

  const handleSortChange = (event) => {
    setSortCriteria(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handlePowerChange = (event) => {
    const value = event.target.value;
    setSelectedPowers(prevSelectedPowers =>
      prevSelectedPowers.includes(value)
        ? prevSelectedPowers.filter(power => power !== value)
        : [...prevSelectedPowers, value]
    );
  };

  const handleCategoryChange = (event) => {
    const value = event.target.value;
    setSelectedCategories(prevSelectedCategories =>
      prevSelectedCategories.includes(value)
        ? prevSelectedCategories.filter(category => category !== value)
        : [...prevSelectedCategories, value]
    );
  };

  const filterAndSortProducts = (products) => {
    let filteredProducts = products;

    if (selectedPowers.length > 0) {
      filteredProducts = filteredProducts.filter(product => selectedPowers.includes(product.power));
    }

    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter(product => selectedCategories.includes(product.category));
    }

    const sortedProducts = [...filteredProducts];
    sortedProducts.sort((a, b) => {
      let comparison = 0;
      switch (sortCriteria) {
        case 'power':
          comparison = parseFloat(a.power) - parseFloat(b.power);
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
        case 'price':
          comparison = a.price - b.price;
          break;
        default:
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return sortedProducts;
  };

  const uniquePowers = [...new Set(productsData.map(product => product.power))].filter(Boolean);
  const uniqueCategories = [...new Set(productsData.map(product => product.category))];

  return (
    <div className={styles.productSection}>
      <div className={`${styles.filterSection} ${isFilterVisible ? styles.show : ''}`}>
        <div className={styles.sortingBlock}>
          <label> <strong> Фільтр за потужністю: </strong></label>
          {uniquePowers.map(power => (
            <div key={power} className={styles.checkboxWrapper13}>
              <input type="checkbox"
                id={`power-${power}`}
                value={power}
                checked={selectedPowers.includes(power)}
                onChange={handlePowerChange} />
              <label htmlFor={`power-${power}`}>{power} кВт</label>
            </div>
          ))}
        </div>

        <div className={styles.sortingBlock}>
          <label> <strong> Фільтр за категорією: </strong></label>
          {uniqueCategories.map(category => (
            <div key={category} className={styles.checkboxWrapper13}>
              <input type="checkbox"
                id={`category-${category}`}
                value={category}
                checked={selectedCategories.includes(category)}
                onChange={handleCategoryChange}
              />
              <label htmlFor={`category-${category}`}>{category}</label>
            </div>
          ))}
        </div>

        <div className={styles.sortingBlockFlex}>
          <label htmlFor="sort"> <strong> Сортувати за: </strong> </label>
          <select id="sort" value={sortCriteria} onChange={handleSortChange}>
            <option value="">Виберіть</option>
            <option value="power">Потужність</option>
            <option value="price">Ціна</option>
          </select>
        </div>

        <div className={styles.sortingBlockFlex}>
          <label htmlFor="sortOrder"> <strong> Порядок сортування: </strong></label>
          <select id="sortOrder" value={sortOrder} onChange={handleSortOrderChange}>
            <option value="asc">За зростанням</option>
            <option value="desc">За спаданням</option>
          </select>
        </div>
      </div>

      <div className={styles.productsBlock}>
        <div>
          <h1>Продукти</h1>
        </div>
        <button
          className={styles.filterOpenButton}
          onClick={openFilter}
          style={{ display: isFilterVisible ? 'none' : '' }} // Приховати кнопку, коли фільтр видимий
        >
          <a><img src={filter} alt="" />Фільтри</a>
        </button>
        <button
          className={`${styles.filterCloseButton} ${isFilterVisible ? styles.show : ''}`}
          onClick={closeFilter}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
            <path d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z" fill="#0F0F0F"/>
          </svg>
        </button>
        <div>
          {error && <p>Помилка при завантаженні даних: {error}</p>}
          <ul className={styles.productCardBlock}>
            {filterAndSortProducts(productsData).map(product => (
              <div key={product.id} className={styles.productCard}>
                <li>
                  <Link to={`/${product.id}`}>
                  <img src={product.image} alt={product.name} />
                  </Link>
                  <h2>{product.name}</h2>
                  <p>Ціна: {product.price} ₴</p>
                  {product.power && <p>Потужність: {product.power} кВт</p>}
                  <p style={{display: 'none'}}>Категорія: {product.category}</p>
                </li>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}