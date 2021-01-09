import { Link, Router } from "@reach/router";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import Details from "./Details.jsx";
import SearchParams from "./SearchParams.jsx";
import store from "./store.js";
// import ThemeContext from "./ThemeContext.jsx";

const App = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <div>
          <header>
            <Link to="/">Adopt Me</Link>
          </header>
          <Router>
            <SearchParams path="/" />
            <Details path="/details/:id" />
          </Router>
        </div>
      </Provider>
    </React.StrictMode>

    // context
    // const themeHook = useState("peru");
    // // 使用 <React.StrictMode> 的话，写代码时会有提示告诉我们哪些是不稳定的 API
    // <React.StrictMode>
    //   {/* ThemeContext.Provider 相当于给子孙组件提供了一个全局状态 */}
    //   {/* value 是必须的，但它的值不一定是一个 hook，可以是一个对象或者别的 */}
    //   <ThemeContext.Provider value={themeHook}>
    //     <div>
    //       <header>
    //         <Link to="/">Adopt Me</Link>
    //       </header>
    //       <Router>
    //         {/* 通过 path 来注册路由组件 */}
    //         <SearchParams path="/" />
    //         <Details path="/details/:id" />
    //       </Router>
    //     </div>
    //   </ThemeContext.Provider>
    // </React.StrictMode>
  );
};

render(<App />, document.querySelector("#root"));
