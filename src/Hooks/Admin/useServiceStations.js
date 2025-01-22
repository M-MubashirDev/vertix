import { useQuery } from "@tanstack/react-query";
import { getServiceStations } from "../../Services/ServiceStation";
import { useParams } from "react-router-dom";

export function UsegetServiceStations() {
  const { adminId } = useParams();
  const {
    data: dataStations,
    isPending: pendinStation,
    error,
  } = useQuery({
    queryKey: ["getStations"],
    queryFn: () => getServiceStations({ url: `service-stations/${adminId}` }),
  });
  return { dataStations, pendinStation, error };
}
export function UsegetStationsPackages() {
  const { stationId } = useParams();
  const {
    data: dataPackages,
    isPending: pendingPackage,
    error,
  } = useQuery({
    queryKey: ["stationPackages"],
    queryFn: () =>
      getServiceStations({ url: `get-packages-by-station/${stationId}` }),
  });
  return { dataPackages, pendingPackage, error };
}
export function UsegetStationsUsers() {
  const { stationId } = useParams();
  const {
    data: dataStationUsers,
    isPending: pendingStationUsers,
    error,
  } = useQuery({
    queryKey: ["stationStationUsers"],
    queryFn: () =>
      // getServiceStations({ url: `get-car-registration/${stationId}` }),
      getServiceStations({
        url: `get-car-registration/678f7da88d171d2ec3a7f831`,
      }),
  });
  return { dataStationUsers, pendingStationUsers, error };
}
