import { Button, Card } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { formatCurrency } from "../utilities/formatCurrency"
import { Product } from "../utils/Definitions"
import { useUser } from "../context/UserContext"
import { isAdmin } from "../utils/validation"
import { EditOutlined,DeleteOutlined } from '@ant-design/icons'
import { useNavigate } from "react-router-dom"
import { useProducts } from "../context/ProductContext"
import { Modal } from "antd"

const EditIcon = EditOutlined as any
const DeleteIcon = DeleteOutlined as any
export function StoreItem({product}:{product: Product}) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart()
  const quantity = getItemQuantity(product.id)
  const {user} = useUser()

  const {deleteProduct} = useProducts()

  const nav = useNavigate()
  const navToEdit = (id:any) => nav(`/EditItem/${id}`) 

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={product.img}
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{product.title}</span>
          <span className="ms-2 text-muted">{formatCurrency(product.price)}</span>
        </Card.Title>
        <div className="mt-auto flex-col row-gap">

          
          {quantity === 0 ? (
            <Button className="w-100" onClick={() => increaseCartQuantity(product.id)}>
              + Add To Cart
            </Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: ".5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button onClick={() => decreaseCartQuantity(product.id)}>-</Button>
                <div>
                  <span className="fs-3">{quantity}</span> in cart
                </div>
                <Button onClick={() => increaseCartQuantity(product.id)}>+</Button>
              </div>
              <Button
                onClick={() => removeFromCart(product.id)}
                variant="danger"
                size="sm"
              >
                Remove
              </Button>
            </div>
          )}
            {isAdmin(user) && <div className="flex-col row-gap">
            <Button className="w-100 bg-green" onClick={() => navToEdit(product.id)}>
              <EditIcon  /> Edit
            </Button>
            <Button className="w-100 bg-red" onClick={() =>  {
              Modal.confirm({
                content:`Are you sure you want to delete this product: ${product.title}?`,
                okText: "Delete",
                cancelText:"Cancel",
                onOk: async() => await deleteProduct(product.id)
              })
            }}>
              <DeleteIcon />  Delete
            </Button>
            </div>}
        </div>
      </Card.Body>
    </Card>
  )
}
