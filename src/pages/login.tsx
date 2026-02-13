import { gql, useMutation } from '@apollo/client'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { authTokenVar, isLoggedInVar } from '../apollo'
import { Button } from '../components/button'
import { FormError } from '../components/form-error'
import { LOCALSTORAGE_TOKEN } from '../constants'
import {
    loginMutation,
    loginMutationVariables,
} from '../__generated__/loginMutation'

interface ILoginForm {
    email: string
    password: string
}

export const LOGIN_MUTATION = gql`
    mutation loginMutation($loginInput: LoginInput!) {
        login(input: $loginInput) {
            ok
            token
            error
        }
    }
`

export const Login = () => {
    const { register, getValues, handleSubmit, formState } =
        useForm<ILoginForm>({
            mode: 'onChange',
        })
    const { errors } = formState

    const onCompleted = (data: loginMutation) => {
        const {
            login: { ok, token },
        } = data

        if (ok && token) {
            localStorage.setItem(LOCALSTORAGE_TOKEN, token)
            authTokenVar(token)
            isLoggedInVar(true)
        }
    }
    const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
        loginMutation,
        loginMutationVariables
    >(LOGIN_MUTATION, {
        onCompleted,
    })
    const onSubmit = () => {
        if (!loading) {
            const { email, password } = getValues()
            loginMutation({
                variables: {
                    loginInput: {
                        email,
                        password,
                    },
                },
            })
        }
    }

    return (
        <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
            <title>Login | Fantasy Eats</title>
            <div className="w-full max-w-screen-sm flex flex-col px-5 items-center">
                <form
                    className="grid gap-3 mt-5 w-full mb-5"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <input
                        {...register('email', {
                            required: 'Email is required',
                            pattern:
                                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        })}
                        name="email"
                        required
                        type="email"
                        placeholder="Email"
                        className="input"
                        role="email"
                    />
                    {errors.email?.type === 'pattern' && (
                        <FormError
                            errorMessage={'Please enter a valid email'}
                        />
                    )}
                    {errors.email?.message && (
                        <FormError errorMessage={errors.email?.message} />
                    )}
                    <input
                        {...register('password', {
                            required: 'Password is required',
                        })}
                        required
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="input"
                    />
                    {errors.password?.message && (
                        <FormError errorMessage={errors.password?.message} />
                    )}
                    <Button
                        canClick={formState.isValid}
                        loading={loading}
                        actionText={'Log in'}
                    />
                    {loginMutationResult?.login.error && (
                        <FormError
                            errorMessage={loginMutationResult.login.error}
                        />
                    )}
                </form>
                <div>
                    New to Fantasy?{' '}
                    <Link
                        to="/create-account"
                        className="text-lime-600 hover:underline"
                    >
                        Create an Account
                    </Link>
                </div>
            </div>
        </div>
    )
}
