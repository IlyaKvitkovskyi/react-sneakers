import React from 'react'
import Info from './info';
import AppContext from '../context';

function Drawer({ onClose, onRemove, items = [] }) {
  const { setCartItems } = React.useContext(AppContext);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);

  const onClickOrder = () => {
    setIsOrderComplete(true);
    setCartItems([]);
  }

  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="mb-30 d-flex justify-between">
          Корзина
          <img onClick={onClose} className="removeBtn cu-p" src="/img/btn-remove.svg" alt="Close" />
        </h2>

        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items">
              {items.map((obj) => (
                <div key={obj.id} className="cartItem d-flex align-center mb-20">
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className="cartItemImg"></div>

                  <div className="mr-20 flex ">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} грн.</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className="removeBtn"
                    src="/img/btn-remove.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>

            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>21 498 грн.</b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>1074 грн.</b>
                </li>
              </ul>

              <button onClick={onClickOrder} className="greenButton">
                Оформить заказ
                <img src="img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
            description={isOrderComplete ? "Ваш заказ #18 скоро будет передан курьерской службе " : "Добавьте хотя бы одну пару кроссовок, что бы сделать заказ"}
            image={isOrderComplete ? "/img/complete-order.jpg" : "/img/empty-cart.jpg"}
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
