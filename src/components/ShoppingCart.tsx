import { Offcanvas, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { formatCurrency } from "../utilities/formatCurrency"
import { CartItem } from "./CartItem"
import storeItems from "../data/items.json"
import { CartItem as CartItemType } from "../utils/Definitions"
import { Link } from "react-router-dom"

type ShoppingCartProps = {
  isOpen: boolean

}


export function ShoppingCartList ({inCartMenu = false}: {inCartMenu?:boolean}) {
  const { cartItems,total } = useShoppingCart()
  return <Stack gap={3}>
          {cartItems.map(item => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {formatCurrency(
              total()
            )}
          </div>
          {inCartMenu && <Link to={"/order"}>Proceed to order</Link>}
        </Stack>
}
export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart } = useShoppingCart()
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <ShoppingCartList inCartMenu/>
      </Offcanvas.Body>
    </Offcanvas>
  )
}
