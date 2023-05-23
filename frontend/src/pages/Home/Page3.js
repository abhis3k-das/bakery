import { useEffect, useRef, useState ,useMemo} from "react";
import styles from "./Page3.module.css";
import styled from "styled-components";
// import imgg from '../../images/homePage3/cookieA.webp'

const CarouselItem = styled.section`
   box-sizing: border-box;
   flex-shrink: 0;
   flex-basis: calc(100% / 4);
   margin: ${(props) => (props.length < 4 ? "1.5% 0" : "1.5%")};
   position:relative;
   box-shadow:  100px 300px 1000px rgba(255, 255, 255, 0);
`;

function Page3() {

   const data = useMemo(()=>({
      pastry: ["A", "B", "C"],
      pancakes: ["D", "E", "F"],
      cookies: ["L", "M", "N", "O", "W"],
      cakes: ["P", "Q", "R", "S", "T", "V"],
   }),[]);
   const carouselRef = useRef(null);
   const sliderRef = useRef(null);
   const page3Observer = useRef();
   const page3header = useRef();
   const [product, setProduct] = useState("pastry");
   var dir = 0;

   useEffect(() => {
      const observer = new IntersectionObserver(
         (entries) => {
            entries.forEach((each) => {
               each.target.classList.toggle(styles["page3-show"],each.isIntersecting);
            });
         },
         { threshold: 0 }
      );
      observer.observe(page3Observer.current);
      observer.observe(page3header.current);
   },[]);
   useEffect(() => {
      const length = data[product].length;
      const slider = sliderRef.current;
      if (length >= 4) {
         slider.style.marginLeft = `${(-100 / 4) * 2}%`;
         slider.style.marginRight = `${(100 / 4) * 2}%`;
      } else {
         slider.style.marginLeft = `0`;
         slider.style.marginRight = `0`;
         slider.style.justifyContent = "space-between";
      }
   }, [product, data]);

   const nextHandler = (event) => {
      const slider = sliderRef.current;

      if (dir === -1) {
         slider.prepend(slider.lastElementChild);
      }
      dir = 1;
      const carousel = carouselRef.current;
      carousel.style.justifyContent = "flex-start";
      slider.style.transform = "translate(-28%)";
      // why 28% ?
      // Check in Page3.module.css the flex-basis for each section is 100%/4
      // i.e each will take  25%
      // And also each have a margin of 1.5% on left and right i.e 3%
      // So total movement should be 25%+3% = 28%
   };

   const prevHandler = (event) => {
      const slider = sliderRef.current;
      if (dir === 1) {
         slider.appendChild(slider.firstElementChild);
      }
      dir = -1;
      const carousel = carouselRef.current;
      carousel.style.justifyContent = "flex-end";
      slider.style.transform = "translate(28%)";
      // why 28% ?
      // Check in Page3.module.css the flex-basis for each section is 100%/4
      // i.e each will take  25%
      // And also each have a margin of 1.5% on left and right i.e 3%
      // So total movement should be 25%+3% = 28%
   };

   const shiftChild = () => {
      const slider = sliderRef.current;
      if (dir === 1) {
         slider.appendChild(slider.firstElementChild);
      } else if (dir === -1) {
         slider.prepend(slider.lastElementChild);
      }
      slider.style.transition = "none";
      slider.style.transform = "translate(0)";
      setTimeout(function () {
         slider.style.transition = "all 0.5s";
      });
   };

   const switchItemHandler = (type) => {
      setProduct(type);
   };

   const addToCartHandler = () => {};


   return (
      <>
         <div ref={page3Observer} className={styles["page3Container"]}>
            <div className={styles["page3-shadow"]}>
               <div ref={page3header} className={styles['page3-header']}>
                  <h1>
                     Check All <br />
                     Fresh Products
                  </h1>
                  <div className={styles["page3-items"]}>
                     <span onClick={switchItemHandler.bind(this, "pastry")} className={[ product === "pastry" ? styles["page3-activeItem"] : "",styles["page3-item"] ].join(" ")} > Pastry </span>
                     <span onClick={switchItemHandler.bind(this, "pancakes")} className={[ product === "pancakes" ? styles["page3-activeItem"] : "",styles["page3-item"] ].join(" ")} > Pancakes </span>
                     <span onClick={switchItemHandler.bind(this, "cookies")} className={[ product === "cookies" ? styles["page3-activeItem"] : "", styles["page3-item"]].join(" ")} > Cookies </span>
                     <span onClick={switchItemHandler.bind(this, "cakes")} className={[ product === "cakes" ? styles["page3-activeItem"] : "", styles["page3-item"]].join(" ")} > {" "} Cakes{" "} </span>
                  </div>
               </div>
            </div>
            <div className={styles["page3-carouselContainer"]}>
               <div className={styles["page3-carousel"]} ref={carouselRef}>
                  <div
                     ref={sliderRef}
                     className={styles["page3-slider"]}
                     onTransitionEnd={shiftChild}
                  >
                     {data[product].map((each, index) => {
                           let imgg = require('../../images/homePage3/cookieE.jpg');
                        return (
                           <CarouselItem
                              key={each + "-" + index}
                              length={data[product].length}
                           >
                              <img src={imgg} className={styles['page3-img']} alt="..."/>
                              <div className={styles['page3-overlay']}></div>
                              <div className={styles['page3-itemName']}>
                                 <p>Cookie</p>
                              </div>
                              <button
                                 className={styles["page3-btn"]}
                                 onClick={addToCartHandler}
                              >
                                 +
                              </button>
                           </CarouselItem>
                        );
                     })}
                  </div>
               </div>
               {data[product].length >= 4 && (
                     <div className={styles["page3-carouselControl"]}>
                        <span
                           className={[styles["arrow"], styles["prev"]].join(
                              " "
                           )}
                           onClick={prevHandler}
                        ></span>
                        <span
                           className={[styles["arrow"], styles["next"]].join(
                              " "
                           )}
                           onClick={nextHandler}
                        ></span>
                     </div>
                  )}
            </div>
         </div>
      </>
   );
}

export default Page3;

