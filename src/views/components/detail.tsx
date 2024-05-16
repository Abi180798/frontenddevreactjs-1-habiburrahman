'use client'

import { useEffect } from "react"
import { Circle } from "react-feather"
import StarRatings from 'react-star-ratings'
import { Avatar, Badge, Box, Button, Image, ListItem, Skeleton, Text, UnorderedList } from "@chakra-ui/react"
import { useRestaurantStore } from "@/helpers/store"
import { useParams, useRouter } from "next/navigation"
import { formatNumber } from "@/helpers"

const Detail: React.FC = () => {
  let navigate = useRouter()
  const { id } = useParams<{ id: string }>()
  const { restaurantDetail, loading, hasErrors, getDetailRestaurant } = useRestaurantStore()
  const restaurant = restaurantDetail.restaurant
  useEffect(() => {
    getDetailRestaurant(id)
  }, [id])

  return (
    <section className="px-4 p-4">
      <Text fontSize={"2xl"}>Detail Restaurants</Text>
      <Box className="pt-4">
        {loading ? (
          <Box>
            <Skeleton height='200px' />
          </Box>
        ) :
          <Box key={restaurant?.id} className="flex flex-col gap-2">
            <Image className="px-12" alt={`restaurant-${restaurant?.pictureId}`} src={`https://restaurant-api.dicoding.dev/images/small/${restaurant?.pictureId}`} />
            <Text fontWeight={"bold"} fontSize={"xl"}>{restaurant?.name}</Text>
            <Box className="w-full">
              <StarRatings
                rating={restaurant?.rating}
                starRatedColor="gray"
                starDimension="20px"
                starSpacing="1px"
                numberOfStars={5}
              />
            </Box>
            <Box className="flex justify-between items-center gap-2">
              <Box className="flex items-center gap-2">
                <Text fontSize={"sm"}>{restaurant?.city}</Text>
                <Circle size={"5px"} fill="black" />
                <Text fontSize={"sm"}>{formatNumber(restaurant?.price || 0)}</Text>
              </Box>
              <Box className="flex items-center gap-2">
                <Circle size={"5px"} fill={(restaurant?.rating || 0) > 4.5 ? "green" : "red"} />
                <Text fontSize={"sm"}>{(restaurant?.rating || 0) > 4.5 ? "Open" : "Closed"}</Text>
              </Box>
            </Box>
            <Box className="flex items-center gap-2">
              {restaurant?.categories?.map((r) => (
                <Badge key={`category-${r?.name}`}>{r?.name}</Badge>
              ))}
            </Box>
            <Box>
              <Text>{restaurant?.description}</Text>
            </Box>
            <Box>
              <Text fontSize={"lg"} fontWeight={"bold"}>Menus:</Text>
              <Text>Foods:</Text>
              <UnorderedList>
                {restaurant?.menus?.foods?.map((r) => (
                  <ListItem key={`menu-${r?.name}`}>{r?.name}</ListItem>
                ))}
              </UnorderedList>
              <Text>Drinks:</Text>
              <UnorderedList>
                {restaurant?.menus?.foods?.map((r) => (
                  <ListItem key={`menu-${r?.name}`}>{r?.name}</ListItem>
                ))}
              </UnorderedList>
            </Box>
            <Box>
              <Text fontSize={"lg"} fontWeight={"bold"}>Reviewers</Text>
              {restaurant?.customerReviews?.map((r) => (
                <Box key={`review-${r?.name}`} className="flex gap-4 mb-2 p-4 border rounded-lg">
                  <Box>
                    <Avatar />
                  </Box>
                  <Box>
                    <Text fontSize={"sm"}>{r?.date}</Text>
                    <Text fontWeight={"bold"}>{r?.name}</Text>
                    <Text fontSize={"sm"}>{r?.review}</Text>
                  </Box>
                </Box>
              ))}
            </Box>
            <Box>
              <Button variant={"solid"} w={"full"} colorScheme="blue"
                onClick={() => navigate.push("/")}
              >Back</Button>
            </Box>
          </Box>
        }
      </Box>
    </section>
  )
}

export default Detail