import React, { useEffect } from "react";
import { shortList } from "./data";
import { list } from "./data";
import { longList } from "./data";
import { useState } from "react";
import { FaQuoteRight } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
const Carousel = () => {
  const [currentList, setList] = useState(list);
  const [currentPerson, setPerson] = useState(0);
  const [autoSlide, setAutoSlide] = useState(true);
  const { id, image, name, title, quote } = currentList[currentPerson];

  useEffect(() => {
    let intervalID;
    if (autoSlide) {
      intervalID = setInterval(() => {
        setPerson((prev) => {
          if (prev + 1 >= currentList.length) {
            console.log("reached");
            return 0;
          }
          return prev + 1;
        });
      }, 2000);
    }
    return () => {
      clearInterval(intervalID);
    };
  }, [autoSlide]);


  const onNextClick = () => {
    setAutoSlide(false);
    setPerson((prev) => {
      if (prev + 1 >= currentList.length) {
        return 0;
      }
      return prev + 1;
    });
    // Start timer for resuming autoslide after a delay
    setTimeout(() => {
      setAutoSlide(true); // Resume autoslide
    }, 5000); // 5000 milliseconds = 5 seconds
  };

  const onPreviousClick = () => {
    setAutoSlide(false);
    setPerson((prev) => {
      if (prev - 1 === -1) {
        console.log("reached");
        return currentList.length - 1;
      }
      return prev - 1;
    });
  };

  return (
    <div className="slider-container">
      {currentList.map((person, index) => {
        return (
          <div
            key={person.id}
            className="slide"
            style={{
              transform: `translateX(${(index - currentPerson) * 100}%)`,
            }}
          >
            <img src={image} className="person-img"></img>
            <h5 className="name">{name}</h5>
            <p className="title">{title}</p>
            <p className="text">{quote}</p>
          </div>
        );
      })}
      <button type="button" className="prev" onClick={onPreviousClick}>
        <FiChevronLeft />
      </button>
      <button type="button" className="next" onClick={onNextClick}>
        <FiChevronRight />
      </button>
    </div>
  );
};

export default Carousel;
