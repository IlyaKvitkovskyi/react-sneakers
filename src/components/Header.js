import { Link } from 'react-router-dom';

function Header(props) {
  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/">
        <div className="d-flex align-center">
          <img width={40} height={40} src="/img/logo.png" alt="logo" />
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className="d-flex">
        <li onClick={props.onClickCart} className="mr-30 cu-p">
          <img width={18} height={18} src="/img/cart.svg" alt="cart" />
          <span>1205 грн.</span>
        </li>

        <li className="mr-20 cu-p">
          <Link to="/favorites">
            <img width={20} height={20} src="/img/heart.svg" alt="heart icon" />
          </Link>
        </li>

        <li className="cu-p">
          <img width={20} height={20} src="/img/user.svg" alt="user icon" />
        </li>
      </ul>
    </header>
  );
}

export default Header;
