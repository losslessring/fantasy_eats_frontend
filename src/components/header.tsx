import { Link } from 'react-router-dom'
import { LOCALSTORAGE_TOKEN } from '../constants'

interface IHeaderProps {
    email: string
}

export const Header: React.FC = () => {
    // const { data } = useMe()

    // const [loginToken, setLoginToken] = useState('')

    // useEffect(() => {
    //     localStorage.setItem(LOCALSTORAGE_TOKEN, '')
    // }, [loginToken])

    const logOutAndReload = () => {
        localStorage.setItem(LOCALSTORAGE_TOKEN, '')
        window.location.href = '/'
    }

    return (
        <>
            <header className="py-4">
                <div className="w-full mx-auto flex flex-start items-center gap-6">
                    <Link
                        className="text-xs text-red-800 hover:underline"
                        to="/"
                    >
                        <span>Fantasy Eats</span>
                    </Link>
                    <span className="text-xs text-red-800 hover:underline">
                        <Link to="/edit-profile">Edit Profile</Link>
                    </span>
                    <span className="text-xs text-red-800 hover:underline">
                        <Link to="/">
                            <span onClick={logOutAndReload}>Log Out</span>
                        </Link>
                    </span>
                </div>
            </header>
        </>
    )
}
