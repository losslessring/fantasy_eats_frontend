import { gql, useApolloClient, useMutation } from '@apollo/client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../../components/button'
import { FormError } from '../../components/form-error'
import {
    createRestaurant,
    createRestaurantVariables,
} from '../../__generated__/createRestaurant'
import { MY_RESTAURANTS_QUERY } from './my-restaurants'

import { useHistory } from 'react-router-dom'

const CREATE_RESTAURANT_MUTATION = gql`
    mutation createRestaurant($input: CreateRestaurantInput!) {
        createRestaurant(input: $input) {
            error
            ok
            restaurantId
        }
    }
`

interface IFormProps {
    name: string
    address: string
    categoryName: string
    coverImg: string
}

export const AddRestaurant = () => {
    const client = useApolloClient()
    const history = useHistory()
    const [imageUrl, setImageUrl] = useState('')
    const onCompleted = (data: createRestaurant) => {
        const {
            createRestaurant: { ok, restaurantId },
        } = data
        if (ok) {
            const { name, categoryName, address } = getValues()
            setUploading(false)

            const queryResult = client.readQuery({
                query: MY_RESTAURANTS_QUERY,
            })
            client.writeQuery({
                query: MY_RESTAURANTS_QUERY,
                data: {
                    myRestaurants: {
                        ...queryResult.myRestaurants,
                        restaurants: [
                            {
                                address,
                                category: {
                                    name: categoryName,
                                    __typename: 'Category',
                                },
                                coverImg: imageUrl,
                                id: restaurantId,
                                isPromoted: false,
                                name,
                                __typename: 'Restaurant',
                            },
                            ...queryResult.myRestaurants.restaurants,
                        ],
                    },
                },
            })
            history.push('/')
        }
    }

    const [createRestaurantMutation, { data }] = useMutation<
        createRestaurant,
        createRestaurantVariables
    >(CREATE_RESTAURANT_MUTATION, {
        onCompleted,
    })

    const [uploading, setUploading] = useState(false)

    const { register, getValues, formState, handleSubmit } =
        useForm<IFormProps>({
            mode: 'onChange',
        })

    const onSubmit = () => {
        try {
            const { name, address, categoryName, coverImg } = getValues()
            setImageUrl(coverImg)
            createRestaurantMutation({
                variables: {
                    input: {
                        name,
                        categoryName,
                        address,
                        coverImg,
                    },
                },
            })
        } catch (e) {}
    }
    return (
        <div className="container">
            <title>Add Restaurant | Fantasy Eats</title>
            <h1>Add restaurant</h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
            >
                <input
                    className="input"
                    type="text"
                    placeholder="Name"
                    {...register('name', { required: 'Name is required.' })}
                />
                <input
                    className="input"
                    type="text"
                    placeholder="Address"
                    {...register('address', {
                        required: 'Address is required.',
                    })}
                />
                <input
                    className="input"
                    type="text"
                    placeholder="Category Name"
                    {...register('categoryName', {
                        required: 'Category Name is required.',
                    })}
                />
                <input
                    className="input"
                    type="text"
                    placeholder="Cover Image URL"
                    {...register('coverImg', {
                        required: 'Cover Image is required.',
                    })}
                />

                <Button
                    loading={uploading}
                    // loading={false}
                    // canClick={true}
                    canClick={formState.isValid}
                    actionText="Create Restaurant"
                />
                {data?.createRestaurant?.error && (
                    <FormError errorMessage={data.createRestaurant.error} />
                )}
            </form>
        </div>
    )
}
