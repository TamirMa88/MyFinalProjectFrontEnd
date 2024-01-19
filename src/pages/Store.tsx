import { Col, Row } from "react-bootstrap"
import { StoreItem } from "../components/StoreItem"
import { useProducts } from "../context/ProductContext"
import { useEffect, useState } from "react"
import { Product } from "../utils/Definitions"
import { SearchOutlined } from "@ant-design/icons"

const SearchIcon = SearchOutlined as any
export function Store() {
  const {products} = useProducts()
  const [productsCopy,setProductsCopy] = useState<Product[]>([])

  useEffect(()=>{
    setProductsCopy(products)
  },[products])
  const filter = (q:any) => {
    if(!q) return setProductsCopy(products)
    const filtered = products.filter(p => p.title.toLowerCase().includes(q.toLowerCase()))
    setProductsCopy(filtered)
  }

  return (
    <>
      <h1 className="rtl-text">מינימרקט מנצור</h1>
      <div className="search-container">
        <input placeholder="Search something.." onChange={(e) => filter(e.target.value)}/>
        <SearchIcon className="search-icon"/>
      </div>
      <Row md={2} xs={1} lg={3} className="g-3">
        {productsCopy.map(item => (
          <Col key={item.id}>
            <StoreItem product={item} />
          </Col>
        ))}
      </Row>
    </>
  )
}
