import Languages from "../components/Languages"

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div>
      <Languages />
      {children}

    </div>
  )
}

export default Layout