import React, { useState, useEffect } from "react";

function TypingEffect({opacity,textStyles,fullText="abc"}) {
    const [text, setText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const typingSpeed = 7; // Adjust typing speed (in milliseconds)
    useEffect(() => {
        let timer = null;
        if(opacity !== 0){            
            timer = setTimeout(() => {
                if (currentIndex < fullText.length) {
                    setText((prevText) => prevText + fullText[currentIndex]);
                    setCurrentIndex((prevIndex) => prevIndex + 1);
                }
            }, typingSpeed);
        }
        return () => {
            clearTimeout(timer);
        };
    }, [currentIndex, fullText,opacity]);

    return (
        <p style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }} className={textStyles}>{text}</p>
    );
}

export default TypingEffect;