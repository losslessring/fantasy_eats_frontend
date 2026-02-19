import { gql, useMutation } from '@apollo/client'
import { useForm } from 'react-hook-form'
import { Button } from '../../components/button'
import {
    createRestaurant,
    createRestaurantVariables,
} from '../../__generated__/createRestaurant'

const CREATE_RESTAURANT_MUTATION = gql`
    mutation createRestaurant($input: CreateRestaurantInput!) {
        createRestaurant(input: $input) {
            error
            ok
        }
    }
`

interface IFormProps {
    name: string
    address: string
    categoryName: string
    file: FileList
}

export const AddRestaurant = () => {
    const [createRestaurantMutation, { data }] = useMutation<
        createRestaurant,
        createRestaurantVariables
    >(CREATE_RESTAURANT_MUTATION)

    const { register, getValues, formState, handleSubmit } =
        useForm<IFormProps>({
            mode: 'onChange',
        })

    const onSubmit = () => {
        console.log(getValues())
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
                <div>
                    {/* <input
                        type="file"
                        accept="image/*"
                        {...register('file', { required: true })}
                        name="file"
                    /> */}
                </div>
                <Button
                    loading={false}
                    // canClick={true}
                    canClick={formState.isValid}
                    actionText="Create Restaurant"
                />
                {/* {data?.createRestaurant?.error && (
          <FormError errorMessage={data.createRestaurant.error} />
        )} */}
            </form>
        </div>
    )
}
