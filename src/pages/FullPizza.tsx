import axios from "axios";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  addItem,
  CartItem,
  selectCartItemById,
} from "../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import SkeletonFullPizza from "./SkeletonFullPizza";

// type PizzaBlockProps = {
//   // id: string;
//   // title: string;
//   // price: number;
//   // imageUrl: string;
//   // sizes: number[];
//   types: number[];
// };

const FullPizza: React.FC = () => {
  // const { pizza } = useSelector((state) => state.fullPizza);

  const dispatch = useDispatch();
  const [pizza, setPizza] = React.useState<{
    id: string;
    imageUrl: string;
    title: string;
    price: number;
    types: number[];
    sizes: number[];
    ingredients: string;
  }>();
  const [activeType, setActiveType] = React.useState(0);
  const [activeSizes, setActiveSizes] = React.useState(0);

  const typeNames = ["тонкое", "традиционное"];

  console.log(pizza);
  const { id } = useParams();
  const navigate = useNavigate();
  const cartItem = useSelector(selectCartItemById(id || ""));
  const addedCount = cartItem ? cartItem.count : 0;

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://67dae01535c87309f52e6ed5.mockapi.io/pizza/` + id
        );
        // dispatch(setPizza(data));
        setPizza(data);
      } catch (error) {
        alert("Ошибка загрузки данных");
        navigate("/");
      }
    }

    fetchPizza();
  }, [id, navigate]);

  if (!pizza) {
    return <SkeletonFullPizza />;
  }
  const onClickCart = () => {
    const item: CartItem = {
      id: pizza.id,
      price: pizza.price,
      title: pizza.title,
      imageUrl: pizza.imageUrl,
      type: typeNames[activeType],
      size: pizza.sizes[activeSizes],
      count: 0,
    };
    dispatch(addItem(item));
  };

  return (
    <div className="container">
      <div className="content__full__items">
        <img
          className="pizza-block__full__image"
          src={pizza.imageUrl}
          alt={pizza.title}
        />
        <div className="pizza-block__full">
          <h2 className="pizza-block__full__title">{pizza.title}</h2>
          <h2 className="pizza-block__ingredients">{pizza.ingredients}</h2>

          <div className="pizza-block__selector full__pizza">
            <ul>
              {pizza.types.map((typeId, i) => (
                <li
                  key={typeId}
                  onClick={() => setActiveType(i)}
                  className={activeType === i ? "active" : ""}
                >
                  {typeNames[typeId]}
                </li>
              ))}
            </ul>
            <ul>
              {pizza.sizes.map((size, i) => (
                <li
                  key={size}
                  onClick={() => setActiveSizes(i)}
                  className={activeSizes === i ? "active" : ""}
                >
                  {size} см.
                </li>
              ))}
            </ul>
          </div>
          <div className="pizza-block__bottom full__bottom">
            <div className="pizza-block__price">от {pizza.price} ₽</div>
            <button
              onClick={onClickCart}
              className="button button--outline button--add"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                  fill="white"
                />
              </svg>
              <span>Добавить</span>
              {addedCount > 0 && <i>{addedCount}</i>}
            </button>
          </div>
        </div>
        <div className="cart__bottom-buttons">
          <Link
            to="/"
            className="button button--outline button--add go-back-btn"
          >
            <svg
              width="8"
              height="14"
              viewBox="0 0 8 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 13L1 6.93015L6.86175 1"
                stroke="#D3D3D3"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            <span>Вернуться назад</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FullPizza;
