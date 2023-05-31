import styles from "./Section4.module.css";
import TypingEffect from "../../components/TypingEffect";
import React, { useState, useEffect, useRef } from "react";
function Section4() {
    const textRef = useRef();
    const [opacity, setOpacity] = useState(false);
    const [textArea,setTextArea] = useState(<></>)
    const fullText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.Pellentesque sollicitudin eros et mi venenatis,sit amet aliquamlibero porta. Pellentesque non risus nibh. Integer vulputate accumsan nunc ac pellentesque. Phasellus dignissim mollis dolor in commodo.\n\nUt consequat, nulla in ornare tempus, nulla sem mattis lacus, id interdum nisl nisi pretium nisl. Maecenas at lorem ut augue vestibulum bibendum. Duis imperdiet est quis ipsum convallis, at vulputate velit ornare. Quisque tempus odio est, at pulvinar magna aliquet non. Etiam mollis odio vel scelerisque tristique.\n\nProin malesuada tellus vitae lectus elementum, eget cursus erat iaculis. In lobortis, metus vitae viverra iaculis, sapien turpis tristique augue, sed maximus justo eros at tortor. Curabitur semper mattis diam egestas auctor. Aliquam vel posuere risus. Proin pulvinar ultrices purus, eget cursus lectus cursus vitae`; // Adjust the text to be typed
    useEffect(() => {
        if (textRef) {
            setOpacity(
                window.getComputedStyle(textRef.current).getPropertyValue("opacity")>0
            );
        }    
    },[textRef]);
   
    useEffect(()=>{
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((each) => {
                    const targetEle = each.target;
                    targetEle.classList.toggle(
                        styles["page4-show"],
                        each.isIntersecting
                    );
                    if(each.isIntersecting){
                        observer.unobserve(targetEle);
                    }
                });
            },
            { threshold: 0 }
        );
        observer.observe(textRef.current);
        return () => {
            if (observer) {
              observer.disconnect();
            }
          };
    },[textRef])
    
    const activateTypingEffect = ()=>{
        setTextArea(<TypingEffect
            opacity={1}
            textStyles={styles["page4-text"]}
            fullText={fullText}
        />)
    }
    console.log(opacity)
    return (
        <div className={styles["page4Container"]}>
            <div className={styles["page4-img-container"]}>
                <img src={require("../../images/homePage4/aboutUs.jpg")} alt="..." />
            </div>
            <div className={styles["page4-text-container"]} ref={textRef} onTransitionEnd={activateTypingEffect}>
                <h1 className={styles["page4-text-header"]}>About Us</h1>
                {textArea}
            </div>
        </div>
    );
}

export default Section4;
