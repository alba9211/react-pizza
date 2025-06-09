import React from "react";
import ContentLoader from "react-content-loader";

const SkeletonFullPizza: React.FC = () => (
  <ContentLoader
    className="container"
    speed={2}
    width={1200}
    height={460}
    viewBox="0 0 1200 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    {/* Изображение пиццы (круг) */}
    <circle cx="230" cy="230" r="200" />

    {/* Название пиццы */}
    <rect x="650" y="50" rx="5" ry="5" width="300" height="30" />

    {/* Описание состава */}
    <rect x="650" y="110" rx="5" ry="5" width="400" height="50" />

    {/* Селектор теста (тонкое/традиционное) */}
    <rect x="650" y="190" rx="5" ry="5" width="400" height="70" />
    {/* <rect x="750" y="220" rx="5" ry="5" width="120" height="30" /> */}

    {/* Цена */}
    <rect x="650" y="302" rx="5" ry="5" width="100" height="35" />

    {/* Кнопка "Добавить" */}
    <rect x="900" y="300" rx="20" ry="20" width="150" height="45" />
  </ContentLoader>
);

export default SkeletonFullPizza;
