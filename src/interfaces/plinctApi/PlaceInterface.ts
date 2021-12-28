import PostalAddressInterface from './PostalAddressInterface';

interface PlaceInterface {
    idplace: number,
    name: string,
    additionalType: string,
    address: PostalAddressInterface,
    dateCreated: string,
    dateModified: string,
    disambiguatingDescription: string,
    elevation: string,
    latitude: string,
    longitude: string    
}

export default PlaceInterface;