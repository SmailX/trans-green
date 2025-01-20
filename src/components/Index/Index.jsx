import React from "react";
import styles from "./Index.module.css";

// imgs
import mainVideo from "../../assets/img/main/TG V1.mp4"
import carWithLogos from "../../assets/img/main/car_with_logos.png"
import type1 from "../../assets/img/socket/type_1.png"
import type2 from "../../assets/img/socket/type_2.png"
import gbt from "../../assets/img/socket/gbt.png"
import power from "../../assets/img/main/power.png"
import car from "../../assets/img/main/car.mp4"
import eLineLogo from "../../assets/img/main/e-line_logo.png"
import S1 from "../../../public/img/wall/S_station/S1-32/1.png"
import germanAward from "../../assets/img/main/07.jpg"
import armorLogo from "../../../public/img/armor/logo.png"
import armoMain from "../../assets/img/main/armor-main.png"
import iconSnow from "../../assets/img/main/weather_icon_snow.png"
import iconRain from "../../assets/img/main/weather_icon_rain.png"
import iconDust from "../../assets/img/main/weather_icon_dust.png"
import iconSun from "../../assets/img/main/weather_icon_sun.png"
import armorUsage from "../../assets/img/main/arm-Inst-_EU_-1.mp4"
import cover from "../../assets/img/main/foto 1.1.jpg"
import holderM from "../../../public/img/accesories/Holder_М/М1.UA 50х50.jpg"
import holderP from "../../../public/img/accesories/Holder_P/Р3 UA 50х50.jpg"




export default function Index() {
  return (
    <div>
      <div className={styles.mainVideo} style={{ zIndex: 0 }}>
        <video
          src={mainVideo}
          autoPlay
          loop
          muted
          height="auto"
          width="100%"
          playsInline
        ></video>
      </div>

      <div className={styles.introSection}>
        <div className={styles.description}>
          <p>
            Заряджає всі <br /> електромобілі <br /> в світі
          </p>
          <img
            className={styles.carWithLogos}
            src={carWithLogos}
            alt="Car with logos"
          />
          <div>
            <div className={styles.socketBox}>
                <img className={styles.socket} src={type2} alt="Type 2" />
              <p>IEC 62196-2 Type 2</p>
            </div>
            <div className={styles.socketBox}>
              <img className={styles.socket} src={type1} alt="Type 1" />
              <p>IEC 62196-2 /SAE-J1772-2009 Type 1</p>
            </div>
            <div className={styles.socketBox}>
              <img className={styles.socket} src={gbt} alt="Type GB/T" />
              <p>GB/T 20234.2 Type GB/T</p>
            </div>
          </div>
        </div>
        <div className={styles.powerBox}>
          <img src={power} alt="Power" />
          <p>
            ПОТУЖНІСТЬ: <br />
            Максимальна потужність зарядки в стандарті LEVEL-2 48(11,5kW) для США , <br />
            В MODE-2 3x32A(22kW) для EC та інших країн
          </p>
        </div>

        <video
          src={car}
          autoPlay
          loop
          muted
          height="auto"
          width="100%"
          playsInline
        ></video>
      </div>

      <div className={styles.eLineSection}>
        <div className={styles.subLogoBox}>
          <img className={styles.subLogo} src={eLineLogo} alt="E-line logo" />
        </div>
        <div className={styles.eLineDescription}>
          <img src={S1} alt="S station" />
          <h3>
            З 2015 року, Усі зарядні станції E-line укомплектовані обладнанням та кабелем
            світового лідера, німецької компанії Phoenix Contact. На всю продукцію надається
            гарантія 2 роки
          </h3>
        </div>
        <div className={styles.lowerImgBox}>
          <img src={germanAward} alt="Lower section" />
        </div>
      </div>

      <div className={styles.armorSection}>
        <div className={styles.subLogoBox}>
          <img className={styles.subLogo} src={armorLogo} alt="Armor logo" />
        </div>
        <div className={styles.armorDescription}>
          <div>
            <h3>ЗАХИСТИТЬ СВІЙ ПОРТ ТА ВИЛКУ EV ВІД БУДЬ-ЯКОЇ ПОГОДИ.</h3>
            <h3>
              Збільште термін служби вашої системи зарядки електромобіля за допомогою
              захисного чохла для зарядки Armor.
            </h3>
          </div>
          <img src={armoMain} alt="Armor main" />
        </div>
        <div className={styles.lowerImgBox}>
          <h3>НАВІЩО ВАМ ПОТРІБНА ЧОХОЛ EV-PLUG?</h3>
          <h3>
            Чохол EV-Plug Cover, як і Armor Charging, необхідна для захисту системи
            зарядки вашого електромобіля від пошкоджень, спричинених погодними умовами.
            Це захищає ваші інвестиції, забезпечує надійне заряджання та продовжує термін
            служби вашої зарядної системи незалежно від погодних умов.
          </h3>
          <div className={styles.iconsSection}></div>
        </div>
        <div className={styles.armorVideo}>
          <div className={styles.weatherBox}>
            <div>
              <img src={iconSnow} alt="Snow protection" />
              <h3>ЗАХИСТ ВІД СНІГУ</h3>
              <h3>
                Захисний чохол Armor Charging Protective Case запобігає таким проблемам, як
                проникнення снігу та прилипання до зарядного штекера та порту.
              </h3>
            </div>
            <div>
              <img src={iconRain} alt="Waterproof" />
              <h3>ВОДОНЕПРОНИКНИЙ</h3>
              <h3>
                90% всіх зарядних розеток не мають захисту від вологи.
              </h3>
            </div>
            <div>
              <img src={iconDust} alt="Dustproof" />
              <h3>ПРОТИПИЛОВИЙ</h3>
              <h3>
                Запобігаючи проникненню частинок піску на 97%, чохол Armor Charging зменшує
                ризики перегріву та потенційного пошкодження пластикових частин роз’єму.
              </h3>
            </div>
            <div>
              <img src={iconSun} alt="UV resistant" />
              <h3>УФ СТІЙКИЙ</h3>
              <h3>
                Зниження температури контактів під час зарядки допомагає захистити кабель
                від старіння та руйнування.
              </h3>
            </div>
          </div>
          <video
            src={armorUsage}
            autoPlay
            loop
            muted
            height="auto"
            width="100%"
            playsInline
          />
        </div>
        <div className={styles.materialText}>
          <img src={cover} alt="High quality fabric" />
          <div>
            <h3>Найвища якість</h3>
            <h3>ТКАНИНА DISCOVERY</h3>
            <h3>
            Після ретельного тестування понад 60 типів тканини ми вибрали найкращий за своїми властивостями текстиль ,який забезпечує надійний захист.
            Цей надзвичайний матеріал не тільки захищає від погодних умов, але й демонструє чудові властивості проти замерзання, вологи та сонця.
            Наш вибір гарантує, що ваш EV отримає гарантовано найкращий захист від стихії.
            </h3>
          </div>
        </div>
        <div className={styles.holdersSection}>
          <h3>
            Холдери, навіси та вся продукція Armor Charging виготовлена з кислотостійкої
            нержавіючої сталі, що гарантує використання продуктів армор на вулиці за будь-яких
            погодних умов
          </h3>
          <div>
            <img src={holderM} alt="Holder M" />
            <img src={holderP} alt="Holder P" />
          </div>
        </div>
      </div>
    </div>
  );
}
