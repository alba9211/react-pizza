import React, { Suspense } from "react";
import "./scss/app.scss";
import Header from "./components/Header.tsx";
import { Home } from "./pages/Home.tsx";
// import { Cart } from "./pages/Cart.tsx";
// import { NotFound } from "./pages/NotFound.tsx";
import { Route, Routes } from "react-router-dom";

import { Loader } from "./components/Spinner.tsx";
import SkeletonFullPizza from "./pages/SkeletonFullPizza.tsx";
// import FullPizza from "./pages/FullPizza.tsx";

const Cart = React.lazy(
  () => import(/* webpackChunkName: 'Cart' */ "./pages/Cart.tsx")
);
const FullPizza = React.lazy(
  () => import(/* webpackChunkName: 'FullPizza' */ "./pages/FullPizza.tsx")
);
const NotFound = React.lazy(
  () => import(/* webpackChunkName: 'NotFound' */ "./pages/NotFound.tsx")
);

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/cart"
            element={
              <Suspense fallback={<Loader />}>
                {" "}
                <Cart />{" "}
              </Suspense>
            }
          />
          <Route
            path="/pizza/:id"
            element={
              <Suspense fallback={<SkeletonFullPizza />}>
                {" "}
                <FullPizza />{" "}
              </Suspense>
            }
          />

          <Route
            path="*"
            element={
              <Suspense fallback={<div>Загрузка...</div>}>
                {" "}
                <NotFound />{" "}
              </Suspense>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
