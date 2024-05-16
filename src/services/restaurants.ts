import { BASE_URL } from "@/utils/config"
import axios from "axios"

export const RestaurantAPI = {
  getListRestaurant() {
    const response = axios.get(`${BASE_URL}/list`)
    return response;
  },
  getDetailRestaurant(id: string) {
    const response = axios.get(`${BASE_URL}/detail/${id}`)
    return response;
  },
  searchRestaurant(id: string) {
    const response = axios.get(`${BASE_URL}/search?q=${id}`)
    return response;
  },
}