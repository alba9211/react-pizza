import React from "react";
import { useWhyDidYouUpdate } from "ahooks";

type CategoriesProps = {
  value: number;
  onChangeCategory: (index: number) => void;
};

const Categories: React.FC<CategoriesProps> = React.memo(
  ({ value, onChangeCategory }) => {
    useWhyDidYouUpdate("Categories", { value, onChangeCategory });

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
);

export default Categories;
