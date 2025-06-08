import axios from "axios";
import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const FullPizza = () => {
  // const { pizza } = useSelector((state) => state.fullPizza);

  // const dispatch = useDispatch();
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

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
    return "Загрузка...";
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt={pizza.title} />
      <h2 className="pizza-block__title">{pizza.title}</h2>
      <h4 className="pizza-block__price">{pizza.price} ₽</h4>
      <div className="cart__bottom-buttons">
        <Link to="/" className="button button--outline button--add go-back-btn">
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
  );
};

export default FullPizza;
