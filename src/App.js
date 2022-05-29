import React from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      const cartResponce = await axios.get('https://628511a4a48bd3c40b7a7ffd.mockapi.io/cart');
      const favoritesResponce = await axios.get('https://628511a4a48bd3c40b7a7ffd.mockapi.io/favorites');
      const itemsResponce = await axios.get('https://628511a4a48bd3c40b7a7ffd.mockapi.io/items');

      setCartItems(cartResponce.data);
      setFavorites(favoritesResponce.data);
      setItems(itemsResponce.data);
    }

    fetchData();
  }, []);

  const onAddToCart = (obj) => {
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        axios.delete(`https://628511a4a48bd3c40b7a7ffd.mockapi.io/cart/${obj.id}`);
        setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      } else {
        axios.post('https://628511a4a48bd3c40b7a7ffd.mockapi.io/cart', obj);
        setCartItems((prev) => [...prev, obj]);
      }
    } catch (error) {}
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(`https://628511a4a48bd3c40b7a7ffd.mockapi.io/favorites/${obj.id}`);
      } else {
        const { data } = await axios.post(
          'https://628511a4a48bd3c40b7a7ffd.mockapi.io/favorites',
          obj,
        );
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты');
    }
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://628511a4a48bd3c40b7a7ffd.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />
      )}

      <Header onClickCart={() => setCartOpened(true)} />

      <Routes>
        <Route
          exact
          path="/"
          element={
            <Home
              items={items}
              cartItems={cartItems}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToFavorite={onAddToFavorite}
              onAddToCart={onAddToCart}
            />
          }></Route>

        <Route
          exact
          path="/favorites"
          element={<Favorites items={favorites} onAddToFavorite={onAddToFavorite} />}></Route>
      </Routes>
    </div>
  );
}

export default App;
