
const Divider = ({isVertical}) => {

  return (
    <div className={`divider ${isVertical ? "vertical" : ""}`}></div>
  )
}

export default Divider