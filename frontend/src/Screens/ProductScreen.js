import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { detailsProduct } from '../actions/productActions';
import data from '../data';

function ProductScreen(props) {
  console.log(props.match.params.id);
  const [qty,setQty]=useState(1)
  const productDetails = useSelector(state => state.productDetails)
  const {product,error,loading}=productDetails;
  const dispatch = useDispatch();
 
  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id))
    return () => {
    }
  }, [])

  const handleAddToCart=()=>{
    props.history.push("/cart/"+props.match.params.id+ "?qty="+qty)
  }
  //const product = data.products.find(x => x._id === props.match.params.id);
  return <div>
    <div className="back-to-result">
      <Link to="/">Back to result</Link>
    </div>
    {loading ?<div>Loading...</div> :
     error ? <div> {error}</div> :
     (
    <div className="details">
      <div className="details-image">
        <img src={product.image} alt="product" ></img>
      </div>
      <div className="details-info">
        <ul>
          <li>
            <h4>{product.name}</h4>
          </li>
          <li>
            {product.rating} Stars ({product.numReviews} Reviews)
          </li>
          <li>
            Price: <b>${product.price}</b>
          </li>
          <li>
            Description:
            <div>
              {product.description}
            </div>
          </li>
        </ul>
      </div>
      <div className="details-action">
        <ul>
          <li>
            Price: {product.price}
          </li>
          <li>
            Status: {product.status}
          </li>
          <li>
            Qty: <select value={qty}
            onChange={(e)=>{setQty(e.target.value)}}>
            {[...Array(product.countInStock).keys()].map(x=> <option value={x+1}>{x+1}</option>)}           
            </select>
          </li>
          <li>
            {product.countInStock > 0 ?  
            <button onClick={handleAddToCart} className="button primary" >Add to Cart</button>
            : <div className="statusmess"> Out of Stock</div>
            }
          </li>
        </ul>
      </div>

    </div>
     )
}
  </div>
    

}
export default ProductScreen;