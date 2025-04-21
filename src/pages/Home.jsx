import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId, setPageCount } from "../redux/slices/filterSlice";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/Index";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { Pagination } from "../components/Pagination";
import { SearchContext } from "../App";

export const Home = () => {
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);
  const currentPage = useSelector((state) => state.filter.pageCount);

  const dispatch = useDispatch();
  const dispatchCurrentPage = useDispatch();

  const onChangePage = (number) => {
    dispatchCurrentPage(setPageCount(number));
  };
  console.log("id category", categoryId);

  const onChangeCategory = (id) => {
    console.log(id);
    dispatch(setCategoryId(id));
  };
  const { searchValue } = React.useContext(SearchContext);

  const [items, setItems] = React.useState([]);

  const [isLoading, setIsLoadding] = React.useState(true);

  React.useEffect(() => {
    setIsLoadding(true);
    const sortBy = sortType.replace("-", "");
    const order = sortType.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    axios
      .get(
        `https://67dae01535c87309f52e6ed5.mockapi.io/pizza?page=${currentPage}&limit=8&${category}&sortBy=${sortBy}&order=${order}${search}`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoadding(false);
      })
      .catch(() => {
        setItems([]);
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
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />

        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeleton : pizzas}</div>
      <Pagination onChangePage={onChangePage} />
    </div>
  );
};
