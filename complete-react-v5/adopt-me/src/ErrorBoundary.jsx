import React from "react";
import { Link, Redirect } from "@reach/router";

// ErrorBoundary 必须是 class 组件
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  // 如果捕获到了错误，React 会通知我们，更新 state
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidUpdate() {
    setTimeout(() => {
      this.setState({ redirect: true });
    }, 5000);
  }

  componentDidCatch(error, info) {
    console.error("caught by ErrorBoundary: ", error, info); // eslint-disable-line no-console
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    if (this.state.hasError) {
      return (
        <h1>
          Something went wrong. <Link to="/">Click here</Link> to go back to the
          home page or wait five seconds.
        </h1>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
