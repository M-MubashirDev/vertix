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
