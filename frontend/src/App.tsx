import CartDrawer from './components/CartDrawer'
import Footer from './components/Footer'
import Header from './components/Header'
import { useStore } from './context/store'
import About from './pages/About'
import Account from './pages/Account'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Home from './pages/Home'
import Login from './pages/Login'
import OrderDone from './pages/OrderDone'
import ProductPage from './pages/ProductPage'
import Shop from './pages/Shop'
import TrackOrder from './pages/TrackOrder'

export default function App() {
  const { view, logged, pid, cartOpen } = useStore()
  return (
    <div className="bh" style={{ minHeight: '100vh' }}>
      <Header />
      {view === 'home' && <Home />}
      {view === 'shop' && <Shop />}
      {/* key: troca de produto zera cor, tamanho e quantidade escolhidos */}
      {view === 'product' && <ProductPage key={pid} />}
      {view === 'account' && (logged ? <Account /> : <Login />)}
      {view === 'checkout' && <Checkout />}
      {view === 'done' && <OrderDone />}
      {view === 'cart' && <Cart />}
      {view === 'track' && <TrackOrder />}
      {view === 'about' && <About />}
      <Footer />
      {cartOpen && <CartDrawer />}
    </div>
  )
}
