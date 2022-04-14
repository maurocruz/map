
import { useContext } from "react";
import { AppContext } from "@contexts/AppContext";
import { useApi } from "@hooks/useApi";
import { UserType } from "@hooks/useUser/useUser";

export default function useFavoritesPlace() {

  const { token } = useContext(AppContext);

  const {responseApi: favPlaceResponse, setRequestApi} = useApi();

  function getFavPlaces(user: UserType) {
    setRequestApi({
      path: 'map/viewport',
      method: 'GET',
      values: {
        orderBy: 'position asc, dateModified desc',
        iduser: user.uid,
        token: token
      }
    });
  }

  function saveFavPlaces(name: string, viewport: string, iduser: string) {
    setRequestApi({
        path: 'map/viewport',
        method: 'POST',
        values: {
            name: name,
            viewport: viewport,
            iduser: iduser
        },
        token: token
    });
  }

  function deleteFavPlace(idmap_viewport: string) {
    setRequestApi({
      path: 'map/viewport',
      method: 'DELETE',
      values: {
        idmap_viewport: idmap_viewport
      },
      token: token
    })
  }

  function request_changePositionFavplaces(idmap_viewport: string, position: string) {
    setRequestApi({
      path: 'map/viewport',
      method: 'PUT',
      values: {
        idmap_viewport: idmap_viewport,
        position: position
      },
      token: token
    });
  }

  return {
    favPlaceResponse,
    getFavPlaces,
    saveFavPlaces,
    deleteFavPlace,
    request_changePositionFavplaces
  }
}
