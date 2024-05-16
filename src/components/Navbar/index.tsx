import { Text } from "@chakra-ui/react"

const Navbar: React.FC = () => {
  return (
    <section className="px-4">
      <Text fontSize={"4xl"}>Restaurants</Text>
      <Text fontSize={"lg"}>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
      </Text>
    </section>
  )
}

export default Navbar