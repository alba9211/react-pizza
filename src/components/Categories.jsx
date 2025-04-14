import React from "react";

export default function Categories({ value, onChangeCategory }) {
  const category = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "С курицей",
    "Острые",
    "Морепродукты",
  ];

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
