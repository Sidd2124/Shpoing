const SimilarProductItem = props => {
  const {SimlarItems} = props
  const {Brand, Description, Price} = SimlarItems
  return (
    <div>
      <h1>{Brand}</h1>
      <p>{Description}</p>
      <p>{Price}</p>
    </div>
  )
}
export default SimilarProductItem
