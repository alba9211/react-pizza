import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectFilter,
  setCategoryId,
  setPageCount,
} from "../redux/slices/filterSlice";
import { fetchPizzas, selectPizzaData } from "../redux/slices/pizzaSlice";

import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock/Index";
import Skeleton from "../components/PizzaBlock/Skeleton";
import { Pagination } from "../components/Pagination";

export const Home = () => {
  const { searchValue, categoryId, currentPage } = useSelector(selectFilter);
  const sortType = useSelector((state) => state.filter.sort.sortProperty);

  const { items, status } = useSelector(selectPizzaData);

  const dispatch = useDispatch();

  const onChangePage = (number) => {
    dispatch(setPageCount(number));
  };

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const getPizzas = async () => {
    const sortBy = sortType.replace("-", "");
    const order = sortType.includes("-") ? "asc" : "desc";
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage,
      })
    );

    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    getPizzas();
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
      {status === "error" ? (
        <div className="content__error-info">
          {" "}
          <h2>Произошла ошибка 😕</h2>
          <p>
            К сожалению, не удалось получить пиццы. Попробуйте повторить попытку
            позже.
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeleton : pizzas}
        </div>
      )}

      <Pagination onChangePage={onChangePage} />
    </div>
  );
};
