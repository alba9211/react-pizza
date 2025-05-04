import React from "react";
import { useSelector, useDispatch } from "react-redux";
import increment from "../redux/slices/filterSlice";

export default function Categories({ value, onChangeCategory }) {
  const category = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "С курицей",
    "Острые",
    "Морепродукты",
  ];
  // console.log("Categories");
  return (
    <div className="categories">
      <ul>
        {category.map((name, index) => (
          <li
            key={name}
            className={value === index ? "active" : ""}
            onClick={() => onChangeCategory(index)}
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
