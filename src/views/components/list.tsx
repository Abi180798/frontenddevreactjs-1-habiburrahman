'use client'

import { useEffect } from "react"
import { Circle } from "react-feather"
import StarRatings from 'react-star-ratings'
import { Box, Button, Image, Skeleton, Text } from "@chakra-ui/react"
import { useFilterStore, useRestaurantStore } from "@/helpers/store"
import { useRouter } from "next/navigation"
import { formatNumber } from "@/helpers"

const List: React.FC = () => {
  let navigate = useRouter()
  const { restaurants, loading, hasErrors, getRestaurant, searchRestaurant } = useRestaurantStore()
  const { status, price, search } = useFilterStore()
  const restaurant = restaurants?.restaurants

  function returnRestaurant() {
    if (status && price) {
      return restaurant?.filter((f) =>
        (price === ">= Rp. 7.000" ? ((f?.price || 0) >= 7000) : ((f?.price || 0) < 7000))
        && (status ? ((f?.rating || 0) >= 4.5) : ((f?.rating || 0) < 4.5))
      )
    } else if (price) {
      return restaurant?.filter((f) =>
        (price === ">= Rp. 7.000" ? ((f?.price || 0) >= 7000) : ((f?.price || 0) < 7000))
      )
    } else if (status) {
      return restaurant?.filter((f) =>
        (status ? ((f?.rating || 0) >= 4.5) : ((f?.rating || 0) < 4.5))
      )
    } else {
      return restaurant
    }
  }
  useEffect(() => {
    getRestaurant()
  }, [])
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchRestaurant(search)
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [search])

  return (
    <section className="px-4 py-4">
      <Text fontSize={"2xl"}>All Restaurants</Text>
      <Box className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-4">
        {loading ? (
          <Box>
            <Skeleton height='200px' />
          </Box>
        ) : returnRestaurant()?.map((r) => (
          <Box key={r?.id} className="flex flex-col gap-2">
            <Image alt={`restaurant-${r?.pictureId}`} src={`https://restaurant-api.dicoding.dev/images/small/${r?.pictureId}`} h={145} />
            <Text fontWeight={"bold"}>{r?.name}</Text>
            <Box className="w-full">
              <StarRatings
                rating={r?.rating}
                starRatedColor="gray"
                starDimension="20px"
                starSpacing="1px"
                numberOfStars={5}
              />
            </Box>
            <Box className="flex justify-between items-center gap-2">
              <Box className="flex items-center gap-2">
                <Text fontSize={"sm"}>{r?.city}</Text>
                <Circle size={"5px"} fill="black" />
                <Text fontSize={"sm"}>{formatNumber(r?.price || 0)}</Text>
              </Box>
              <Box className="flex items-center gap-2">
                <Circle size={"5px"} fill={(r?.rating || 0) >= 4.5 ? "green" : "red"} />
                <Text fontSize={"sm"}>{(r?.rating || 0) >= 4.5 ? "Open" : "Closed"}</Text>
              </Box>
            </Box>
            <Box>
              <Button variant={"solid"} w={"full"} colorScheme="blue" onClick={() => navigate.push(`/restaurant/${r?.id}`)}>
                Learn More
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </section>
  )
}

export default List