import { gql, useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import { Restaurant } from '../../components/restaurant'
import { RESTAURANT_FRAGMENT } from '../../fragments'
import { myRestaurants } from '../../__generated__/myRestaurants'

export const MY_RESTAURANTS_QUERY = gql`
    query myRestaurants {
        myRestaurants {
            ok
            error
            restaurants {
                ...RestaurantParts
            }
        }
    }
    ${RESTAURANT_FRAGMENT}
`

export const MyRestaurants = () => {
    const { data } = useQuery<myRestaurants>(MY_RESTAURANTS_QUERY)
    return (
        <div>
            <title>My Restaurants | Fantasy Eats</title>
            <div className="max-w-screen-3xl mx-auto">
                <h2 className="text-red-800 text-3xl mb-2">My Restaurants</h2>
                <Link
                    className="text-red-800 hover:underline"
                    to="/add-restaurant"
                >
                    <span> Create one &rarr;</span>
                </Link>
                {data?.myRestaurants.ok &&
                data.myRestaurants.restaurants.length === 0 ? (
                    <>
                        <h4 className="text-xl mb-5">
                            You have no restaurants.
                        </h4>
                        <Link
                            className="text-red-800 hover:underline"
                            to="/add-restaurant"
                        >
                            <span>Create one &rarr;</span>
                        </Link>
                    </>
                ) : (
                    <div className="grid mt-4 md:grid-cols-3 gap-x-5 gap-y-10">
                        {data?.myRestaurants.restaurants.map((restaurant) => (
                            <Restaurant
                                key={restaurant.id}
                                id={restaurant.id + ''}
                                coverImg={restaurant.coverImg}
                                name={restaurant.name}
                                categoryName={restaurant.category?.name}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
