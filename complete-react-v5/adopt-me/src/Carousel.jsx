import React from "react";

class Carousel extends React.Component {
  // 这种写法需要安装一系列 babel 插件支持
  state = {
    photos: [],
    active: 0,
  };

  // getDerivedStateFromProps return 的对象会被合并到 state 中
  // 必须是一个 static 方法
  // 参数是 props
  static getDerivedStateFromProps({ media }) {
    let photos = ["http://placecorgi.com/600/600"];

    if (media.length) {
      photos = media.map(({ large }) => large);
    }

    return { photos };
  }

  // methodName = () => {} 这种写法也需要一些 babel 插件的支持
  // 这样就不用在 constructor 中手动 bind this 了
  handleIndexClick = (event) => {
    this.setState({
      active: +event.target.dataset.index,
    });
  };
  render() {
    const { photos, active } = this.state;
    return (
      <div className="carousel">
        <img src={photos[active]} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            // eslint-disable-next-line
            <img
              key={photo}
              // 使用 onClick={this.handleIndexClick.bind(this)} 也可以
              // 不过在旧浏览器中开销很大，组件每次更新都会重新 bind，但新版 chrome 修复了这个问题
              onClick={this.handleIndexClick}
              data-index={index}
              src={photo}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
