import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../Cart/CartContext'; // Импортируем useCart
import styles from './Header.module.css';
import Logo from '../../assets/img/logo_png.PNG';
import smallLogo from '../../assets/img/logo.png';

export default function Header() {
  const { cartItems } = useCart(); // Получаем список товаров в корзине

return (
    <header>
    <div className={styles.wraper}>
        <div className={styles.logoSection}>
        <Link to="/Index">
            <img className={styles.logoLink} src={Logo} alt="logo" />
            <img className={styles.smallLogoLink} src={smallLogo} alt="smallLogo" />
        </Link>
        </div>
        <nav className={styles.menu}>
        <ul>
            <li id="products"><Link to="/Shop">Товари</Link></li>
            <li id="chargeHelp"><Link to="/SelectionOfCharging">Підібрати пристрій</Link></li>
            <li>
            <Link to="/Cart" className={styles.cartLink}>
                Кошик
                {cartItems.length > 0 && (
                <span className={styles.cartCount}>
                    <p>{cartItems.length}</p>
                </span>
                )}
            </Link>
            </li>
        </ul>
        </nav>
    </div>
    </header>
);
}
