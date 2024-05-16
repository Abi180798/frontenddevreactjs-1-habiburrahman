'use client'

import { useFilterStore } from "@/helpers/store"
import { Box, Button, Input, Select, Text } from "@chakra-ui/react"

const Filter: React.FC = () => {
  const { status, price, search, filter } = useFilterStore()
  return (
    <section className="flex justify-between px-4 pt-4">
      <Box className="flex items-center gap-4">
        <Text>Filter By: </Text>
        <Box>
          <label onClick={(e) => {
            if (filter)
              filter({
                price, search,
                status: !status
              })
          }} >
            <input type="radio" checked={status} />
            Open Now
          </label>
        </Box>
        <Box>
          <Select variant="flushed" placeholder="Choose Price"
            onChange={(e) => {
              if (filter)
                if (e.target.value) {
                  filter({
                    status, search,
                    price: e.target.value
                  })
                } else {
                  filter({
                    status, search,
                    price: ""
                  })
                }
            }}
            value={price}>
            <option>{">= Rp. 7.000"}</option>
            <option>{"< Rp. 7.000"}</option>
          </Select>
        </Box>
        <Box>
          <Input placeholder="Search" onChange={(e) => {
            if (filter)
              if (e.target.value) {
                filter({
                  status, price,
                  search: e?.target?.value
                })
              } else {
                filter({ status, price, search: "" })
              }
          }} value={search} />
        </Box>
      </Box>
      <Box>
        <Button variant={"outline"} onClick={() => {
          if (filter)
            filter({
              status: false, price: "",
              search: ""
            })
        }}>
          Clear All
        </Button>
      </Box>
    </section>
  )
}

export default Filter