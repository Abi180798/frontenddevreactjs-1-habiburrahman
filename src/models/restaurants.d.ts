interface StandardType {
  id?: string
  name?: string
}

interface ResponseStandardType {
  count?: number
  error?: boolean
  message?: string
}

interface MenusType {
  foods?: StandardType[]
  drinks?: StandardType[]
}

interface CustomerReviewType {
  name?: string
  review?: string
  date?: string
}

export interface RestaurantType {
  id?: string
  name?: string
  description?: string
  city?: string
  rating?: number
  price?: number
  pictureId?: string
  categories?: StandardType[]
  menus?: MenusType
  customerReviews?: CustomerReviewType[]
}
export interface RestaurantResponseType extends ResponseStandardType {
  restaurants?: RestaurantType[]
}
export interface RestaurantDetailResponseType extends ResponseStandardType {
  restaurant?: RestaurantType
}