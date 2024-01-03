
interface ContainerType {
  title: string
  desc: string
}

const Container = ({ title, desc }: ContainerType) => {
  return (
    <div className="container-detail">
      <h4>{title}</h4>
      <p>{desc}</p>
    </div>
  )
}

export default Container