import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/Index";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { Pagination } from "../components/Pagination";
import { SearchContext } from "../App";

export const Home = () => {
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);

  const dispatch = useDispatch();
  console.log("id category", categoryId);

  const onChangeCategory = (id) => {
    console.log(id);
    dispatch(setCategoryId(id));
  };
  const { searchValue } = React.useContext(SearchContext);

  const [items, setItems] = React.useState([]);

  const [isLoading, setIsLoadding] = React.useState(true);
  // const [categoryId, setCategoryId] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(1);

  // const [sortType, setSortType] = React.useState({
  //   name: "популярности",
  //   sortProperty: "rating",
  // });

  React.useEffect(() => {
    setIsLoadding(true);
    const sortBy = sortType.replace("-", "");
    const order = sortType.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    // fetch(
    //   `https://67dae01535c87309f52e6ed5.mockapi.io/pizza?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`
    // )
    //   .then((res) => res.json())
    //   .then((arr) => {
    //     setItems(Array.isArray(arr) ? arr : []);
    //     setIsLoadding(false);
    //   })
    //   .catch(() => {
    //     setItems([]);
    //     alert("Ошибка получения данных");
    //   });

    axios
      .get(
        `https://67dae01535c87309f52e6ed5.mockapi.io/pizza?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoadding(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeleton = [...new Array(12)].map((_, index) => (
    <Skeleton key={index} />
  )); // Рендерим 6 скелетонов
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          // onChangeCategory={(index) => setCategoryId(index)
          onChangeCategory={onChangeCategory}
        />
        {/* <Sort value={sortType} onChangeSort={(obj) => setSortType(obj)} /> */}
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeleton : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};
