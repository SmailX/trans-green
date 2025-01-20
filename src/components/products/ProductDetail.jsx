import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import styles from "./ProductDetail.module.css";
import '@splidejs/react-splide/css';
import { useCart } from '../Cart/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("1");
  const [showAllParams, setShowAllParams] = useState([]);

  useEffect(() => {
    fetch("chargers.json")
      .then((response) => response.json())
      .then((data) => {
        console.log("Data fetched:", data);

        if (Array.isArray(data.Products)) {
          const foundProduct = data.Products.find((p) => p.id === id);
          setProduct(foundProduct);

          // Инициализируем showAllParams для всех вариаций
          if (foundProduct && foundProduct.variants) {
            setShowAllParams(new Array(foundProduct.variants.length).fill(false));
          }
        } else {
          console.error("Products not found or incorrect structure");
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleAddToCart = (variant) => {
    addToCart({
      ...variant,
      productId: id,
      price: product.price,
      imgs: variant.imgs
    });
  };

  const toggleShowAll = (index) => {
    setShowAllParams((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const tabs = product.variants ? Array.from(new Set(product.variants.map((v) => v.tab))) : [];

  const uniqueTabTypes = product.variants
    ? Array.from(new Set(product.variants.map((v) => `${v.tab}|${v.type}`))).map((pair) => {
        const [tab, type] = pair.split('|');
        return { tab, type };
      })
    : [];

  return (
    <section className={styles.container}>
      {tabs.length > 0 ? (
        <>
          <div className={styles.tabs}>
            {uniqueTabTypes.map(({ tab, type }) => (
              <button
                key={tab}
                className={`${styles.tabButton} ${activeTab === tab ? styles.active : ""}`}
                onClick={() => handleTabClick(tab)}
              >
                {type}
              </button>
            ))}
          </div>

          <div className={styles.tabContent}>
            {product.variants
              .filter((variant) => variant.tab === activeTab)
              .map((variant, index) => {
                const visibleParams = showAllParams[index]
                  ? Object.entries(variant.params)
                  : Object.entries(variant.params).slice(0, 5);

                return (
                  <div key={variant.id} className={styles.variantCard}>
                    <div className={styles.leftSection}>
                      <div>
                        <Splide aria-label="My Favorite Images">
                          {Object.entries(variant.imgs).map(([key, value]) => (
                            <SplideSlide key={key}>
                              <img src={value} alt="" />
                            </SplideSlide>
                          ))}
                        </Splide>
                      </div>
                      <div className={styles.specBlock}>
                        <table>
                          <tbody>
                            {visibleParams.map(([key, value]) => (
                              <tr key={key}>
                                <td>{key}</td>
                                <td>{value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {Object.entries(variant.params).length > 5 && (
                          <button 
                            className={styles.showMoreButton} 
                            onClick={() => toggleShowAll(index)}
                          >
                            {showAllParams[index] ? "Скрыть" : "Показать все"}
                          </button>
                        )}
                      </div>
                    </div>
                    <div className={styles.rightSection}>
                      <h2>{variant.name}</h2>
                      <p>{variant.description}</p>
                      <div className={styles.buyBlock}>
                        <p className={styles.price}><strong>{product.price}</strong> ₴</p>
                        <button
                          className={styles.buyButton}
                          onClick={() => handleAddToCart(variant)}
                        >
                          Добавить в корзину
                        </button>
                      </div>
                      <p dangerouslySetInnerHTML={{ __html: variant.feature }}></p>
                    </div>
                  </div>
                );
              })}
          </div>
        </>
      ) : (
        <p>No variants available for this product.</p>
      )}
    </section>
  );
}
