import { gql, useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Dish } from '../../components/dish'
import { DishOption } from '../../components/dish-option'
import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from '../../fragments'
import {
    createOrder,
    createOrderVariables,
} from '../../__generated__/createOrder'

import { CreateOrderItemInput } from '../../__generated__/globalTypes'
import { restaurant, restaurantVariables } from '../../__generated__/restaurant'

const RESTAURANT_QUERY = gql`
    query restaurant($input: RestaurantInput!) {
        restaurant(input: $input) {
            ok
            error
            restaurant {
                ...RestaurantParts
                menu {
                    ...DishParts
                }
            }
        }
    }
    ${RESTAURANT_FRAGMENT}
    ${DISH_FRAGMENT}
`

const CREATE_ORDER_MUTATION = gql`
    mutation createOrder($input: CreateOrderInput!) {
        createOrder(input: $input) {
            ok
            error
            orderId
        }
    }
`

interface IRestaurantParams {
    id: string
}

export const Restaurant = () => {
    const params = useParams<IRestaurantParams>()

    const { loading, data } = useQuery<restaurant, restaurantVariables>(
        RESTAURANT_QUERY,
        {
            variables: {
                input: {
                    restaurantId: +params.id,
                },
            },
        }
    )

    const [orderStarted, setOrderStarted] = useState(false)
    const [orderItems, setOrderItems] = useState<CreateOrderItemInput[]>([])
    const triggerStartOrder = () => {
        setOrderStarted(true)
    }

    const getItem = (dishId: number) => {
        return orderItems.find((order) => order.dishId === dishId)
    }

    const isSelected = (dishId: number) => Boolean(getItem(dishId))

    const addItemToOrder = (dishId: number) => {
        if (isSelected(dishId)) {
            return
        }
        setOrderItems((current) => [{ dishId, options: [] }, ...current])
    }

    const removeFromOrder = (dishId: number) => {
        setOrderItems((current) =>
            current.filter((dish) => dish.dishId !== dishId)
        )
    }
    const addOptionToItem = (dishId: number, optionName: string) => {
        if (!isSelected(dishId)) {
            return
        }
        const oldItem = getItem(dishId)
        if (oldItem) {
            const hasOption = Boolean(
                oldItem.options?.find((aOption) => aOption.name == optionName)
            )
            if (!hasOption) {
                removeFromOrder(dishId)
                setOrderItems((current) => [
                    {
                        dishId,
                        options: [{ name: optionName }, ...oldItem.options!],
                    },
                    ...current,
                ])
            }
        }
    }

    const getOptionFromItem = (
        item: CreateOrderItemInput,
        optionName: string
    ) => {
        return item.options?.find((option) => option.name === optionName)
    }

    const isOptionSelected = (dishId: number, optionName: string) => {
        const item = getItem(dishId)
        if (item) {
            return Boolean(getOptionFromItem(item, optionName))
        }
        return false
    }

    const removeOptionFromItem = (dishId: number, optionName: string) => {
        if (!isSelected(dishId)) {
            return
        }
        const oldItem = getItem(dishId)
        if (oldItem) {
            removeFromOrder(dishId)
            setOrderItems((current) => [
                {
                    dishId,
                    options: oldItem.options?.filter(
                        (option) => option.name !== optionName
                    ),
                },
                ...current,
            ])
            return
        }
    }

    const triggerCancelOrder = () => {
        setOrderStarted(false)
        setOrderItems([])
    }
    const history = useHistory()
    const onCompleted = (data: createOrder) => {
        const {
            createOrder: { ok, orderId },
        } = data
        if (data.createOrder.ok) {
            history.push(`/orders/${orderId}`)
        }
    }

    const [createOrderMutation, { loading: placingOrder }] = useMutation<
        createOrder,
        createOrderVariables
    >(CREATE_ORDER_MUTATION, {
        onCompleted,
    })
    const triggerConfirmOrder = () => {
        if (placingOrder) {
            return
        }
        if (orderItems.length === 0) {
            alert("Can't place empty order")
            return
        }
        const ok = window.confirm('You are about to place an order')
        if (ok) {
            createOrderMutation({
                variables: {
                    input: {
                        restaurantId: +params.id,
                        items: orderItems,
                    },
                },
            })
        }
    }

    return (
        <div>
            <title>
                {data?.restaurant.restaurant?.name || ''} | Fantasy Eats
            </title>
            <div
                className=" bg-gray-800 bg-center bg-cover h-72 w-full"
                style={{
                    backgroundImage: `url(${data?.restaurant.restaurant?.coverImg})`,
                }}
            ></div>
            <div className="bg-white  py-6">
                <h4 className="text-2xl mb-3">
                    {data?.restaurant.restaurant?.name}
                </h4>
                <h5 className="text-sm font-light mb-2">
                    {data?.restaurant.restaurant?.category?.name}
                </h5>
                <h6 className="text-sm font-light">
                    {data?.restaurant.restaurant?.address}
                </h6>
            </div>
            <div className="container flex flex-col items-end">
                {!orderStarted && (
                    <button onClick={triggerStartOrder} className="btn px-10">
                        Start Order
                    </button>
                )}
                {orderStarted && (
                    <div className="flex items-center">
                        <button
                            onClick={triggerCancelOrder}
                            className="btn px-10 mr-4"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={triggerConfirmOrder}
                            className="btn px-10"
                        >
                            Confirm
                        </button>
                    </div>
                )}

                <div className="container w-full grid md:grid-cols-3 gap-x-5 gap-y-5 mt-4">
                    {data?.restaurant.restaurant?.menu.map((dish, index) => (
                        <Dish
                            isSelected={isSelected(dish.id)}
                            id={dish.id}
                            orderStarted={orderStarted}
                            key={index}
                            name={dish.name}
                            description={dish.description}
                            price={dish.price}
                            isCustomer={true}
                            options={dish.options}
                            addItemToOrder={addItemToOrder}
                            removeFromOrder={removeFromOrder}
                        >
                            {dish.options?.map((option, index) => (
                                <DishOption
                                    key={index}
                                    dishId={dish.id}
                                    isSelected={isOptionSelected(
                                        dish.id,
                                        option.name
                                    )}
                                    name={option.name}
                                    extra={option.extra}
                                    addOptionToItem={addOptionToItem}
                                    removeOptionFromItem={removeOptionFromItem}
                                />
                            ))}
                        </Dish>
                    ))}
                </div>
            </div>
        </div>
    )
}
