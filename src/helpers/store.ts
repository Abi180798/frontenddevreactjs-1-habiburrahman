import { SetState, create } from 'zustand'
import { RestaurantDetailResponseType, RestaurantResponseType, RestaurantType } from '@/models/restaurants'
import { RestaurantAPI } from '@/services/restaurants'
import { formatNumber, randomNumber } from '.'

export interface FilterProps {
  status?: boolean
  price?: string
  search?: string
  filter?: (payload: FilterProps) => void
}

export interface StateProps {
  restaurants: RestaurantResponseType
  restaurantDetail: RestaurantDetailResponseType
  loading: boolean
  hasErrors: boolean
  getRestaurant: () => void
  getDetailRestaurant: (payload: RestaurantType['id']) => void
  searchRestaurant: (payload: RestaurantType['name']) => void
}

export const useRestaurantStore = create<StateProps>((set: SetState<StateProps>) => ({
  restaurants: [],
  restaurantDetail: {},
  loading: false,
  hasErrors: false,
  searchRestaurant: async (query: RestaurantType['name']) => {
    set(() => ({ loading: true }))
    try {
      const response = await RestaurantAPI.searchRestaurant(query || "")
      set((state: StateProps) => ({
        ...state, restaurants: state.restaurants = {
          ...response.data, restaurants: response?.data?.restaurants?.map((r: any, i: number) => {
            return {
              ...r,
              price: (randomNumber * (i + 1))
            }
          })
        },
        loading: false
      }))
    } catch (err) {
      set(() => ({ hasErrors: true, loading: false }));
    }
  },
  getRestaurant: async () => {
    set(() => ({ loading: true }))
    try {
      const response = await RestaurantAPI.getListRestaurant()
      set((state: StateProps) => ({
        ...state, restaurants: state.restaurants = {
          ...response.data, restaurants: response?.data?.restaurants?.map((r: any, i: number) => {
            return {
              ...r,
              price: (randomNumber * (i + 1))
            }
          })
        },
        loading: false
      }))
    } catch (err) {
      set(() => ({ hasErrors: true, loading: false }));
    }
  },
  getDetailRestaurant: async (id: RestaurantType['id']) => {
    set(() => ({ loading: true }))
    try {
      const response = await RestaurantAPI.getDetailRestaurant(id || "")
      set((state: StateProps) => ({
        ...state, restaurantDetail: state.restaurantDetail = {
          ...response.data,
          restaurant: { ...response?.data?.restaurant, price: randomNumber }
        },
        loading: false
      }))
    } catch (err) {
      set(() => ({ hasErrors: true, loading: false }));
    }
  },
}))
export const useFilterStore = create<FilterProps>((set: SetState<FilterProps>) => ({
  status: false,
  price: "",
  search: "",
  filter: (payload: FilterProps) => set((state: FilterProps) => ({
    ...state, status: payload.status, price: payload.price, search: payload.search
  })),
}))