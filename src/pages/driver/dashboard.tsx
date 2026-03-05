import { gql } from '@apollo/client'
import { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

const TAKE_ORDER_MUTATION = gql`
    mutation takeOrder($input: TakeOrderInput!) {
        takeOrder(input: $input) {
            ok
            error
        }
    }
`

export const Dashboard = () => {
    const [driverCoords, setDriverCoords] = useState()
    const onSuccess = (position) => {
        console.log(position)
    }

    const onError = (error) => {
        console.log(error)
    }

    useEffect(() => {
        navigator.geolocation.watchPosition(onSuccess, onError, {
            enableHighAccuracy: true,
        })
    }, [])

    return (
        <div className=" bg-gray-800">
            <MapContainer
                center={[51.505, -0.09]}
                zoom={13}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[51.505, -0.09]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}
