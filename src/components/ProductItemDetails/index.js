import {Component} from 'react'

import Cookies from 'js-cookie'

import SimilarProductItem from '../SimilarProductItem'

import './index.css'

class ProductItemDetails extends Component {
  state = {productdatails: []}

  componentDidMount() {
    this.CompleteDetails()
  }

  CompleteDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const Url = `https://apis.ccbp.in/products/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const responce = await fetch(Url, options)

    if (responce.ok) {
      const code = await responce.json()
      console.log(code)
      const Updated = {
        brand: code.brand,
        ImageUrl: code.image_url,
        Price: code.price,
        Description: code.description,
        Instock: code.availability,
        Rating: code.rating,
        Similar: code.similar_products.map(each => ({
          Brand: each.brand,
          Price: each.Price,
          Description: each.description,
        })),
      }

      this.setState({productdatails: Updated})
    }
  }

  completeDetails = () => {
    const {productdatails} = this.state
    const {
      brand,
      ImageUrl,
      Price,
      Description,
      Instock,
      Rating,
      Similar,
    } = productdatails
    return (
      <div>
        <h1>{brand}</h1>
        <img className="imagedetails" src={ImageUrl} alt="sidd" />
        <p>{Rating}</p>
        <p>{Price}</p>
        <p>{Description}</p>
        <p>{Instock}</p>
        <div>
          {Similar.map(each => (
            <SimilarProductItem SimlarItems={each} />
          ))}
        </div>
      </div>
    )
  }

  render() {
    return <div>{this.completeDetails()}</div>
  }
}

export default ProductItemDetails
