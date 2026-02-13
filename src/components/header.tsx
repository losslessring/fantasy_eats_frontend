import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { useMe } from '../hooks/useMe'
import fantasyLogo from '../images/dragon_logo.svg'

interface IHeaderProps {
    email: string
}

export const Header: React.FC = () => {
    const { data } = useMe()

    return (
        <>
            {!data?.me.verified && (
                <div className="bg-red-500 p-3 text-center text-xs text-white">
                    <span>Please verify your email</span>
                </div>
            )}
            <header className="py-2">
                <div className="w-full px-2 mx-auto flex justify-between items-center">
                    <img
                        src={fantasyLogo}
                        className="w-10"
                        alt="Fantasy Eats"
                    />
                    <span className="text-xs">
                        <Link to="/edit-profile">
                            <FontAwesomeIcon
                                icon={faUser}
                                className="text-xl"
                            />
                        </Link>
                    </span>
                </div>
            </header>
        </>
    )
}
