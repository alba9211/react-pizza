import React from "react";
import { useSelector } from "react-redux";
import {
  selectFilter,
  setCategoryId,
  setPageCount,
  selectSortProperty,
} from "../redux/slices/filterSlice.ts";
import {
  fetchPizzas,
  PizzaType,
  selectPizzaData,
} from "../redux/slices/pizzaSlice.ts";

import Categories from "../components/Categories.tsx";
import Sort from "../components/Sort.tsx";
import PizzaBlock from "../components/PizzaBlock/Index.tsx";
import Skeleton from "../components/PizzaBlock/Skeleton.tsx";
import { Pagination } from "../components/Pagination/index.tsx";
import { useAppDispatch } from "../redux/store.ts";

export const Home: React.FC = () => {
  const { searchValue, categoryId, currentPage } = useSelector(selectFilter);
  const sortType = useSelector(selectSortProperty);

  const { items, status } = useSelector(selectPizzaData);

  const dispatch = useAppDispatch();

  const onChangePage = (number: number) => {
    dispatch(setPageCount(number));
  };

  const onChangeCategory = React.useCallback(
    (id: number) => {
      dispatch(setCategoryId(id));
    },
    [dispatch]
  );

  const getPizzas = React.useCallback(async () => {
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
        currentPage: String(currentPage),
      })
    );

    window.scrollTo(0, 0);
  }, [dispatch, categoryId, sortType, searchValue, currentPage]);

  React.useEffect(() => {
    getPizzas();
  }, [getPizzas]);

  const pizzas = items.map((obj: PizzaType) => (
    <PizzaBlock key={obj.id} {...obj} />
  ));
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
