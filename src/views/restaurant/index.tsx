import { Divider } from "@chakra-ui/react"
import Detail from "../components/detail"
import { Navbar } from "@/components"

const DetailPage: React.FC = () => {
  return (
    <main>
      <Navbar />
      <Divider className="py-2" />
      <Detail />
    </main>
  )
}

export default DetailPage