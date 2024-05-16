import { Divider } from "@chakra-ui/react"
import { Navbar } from "@/components"
import Filter from "./components/filter"
import List from "./components/list"

const HomePage: React.FC = () => {
  return (
    <main>
      <Navbar />
      <Divider className="py-2" />
      <Filter />
      <Divider className="py-2" />
      <List />
    </main>
  )
}

export default HomePage