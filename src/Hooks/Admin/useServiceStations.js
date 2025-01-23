import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteStation,
  getServiceStations,
  postServiceStations,
} from "../../Services/ServiceStation";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

export function UsegetServiceStations() {
  const { adminId } = useParams();
  const {
    data: dataStations = [], // Default to an empty array
    isLoading: pendinStation,
    error,
  } = useQuery({
    queryKey: ["getStations", adminId], // Add adminId to the query key
    queryFn: () => getServiceStations({ url: `service-stations/${adminId}` }),
    staleTime: 0, // Ensure fresh data
    keepPreviousData: false, // Discard old data when adminId changes
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
  console.log(stationId, "😁😂🌏");
  const {
    data: dataStationUsers,
    isPending: pendingStationUsers,
    error,
  } = useQuery({
    queryKey: ["stationStationUsers"],
    queryFn: () =>
      getServiceStations({ url: `get-car-registration/${stationId}` }),
    // getServiceStations({
    //   url: `get-car-registration/678f7da88d171d2ec3a7f831`,
    // }),
  });
  return { dataStationUsers, pendingStationUsers, error };
}
// postServiceStations
export function usePostStationMutate() {
  const queryClient = useQueryClient();
  const {
    mutate: postStations,
    isLoading: isPendingStation,
    isSuccess,
  } = useMutation({
    mutationFn: postServiceStations, // The update function you’ve defined earlier
    onSuccess: () => {
      toast.success("Station has been created");
      queryClient.invalidateQueries(["getStations"]);
    },
    onError: (error) => {
      toast.error("Please Try Again: " + error.message);
      console.error("update Error:", error);
    },
  });

  return { postStations, isPendingStation, isSuccess };
}
export function useDeleteStations() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteStationMutate,
    isLoading: isPendingDelete,
    isSuccess,
  } = useMutation({
    mutationFn: deleteStation,
    onSuccess: () => {
      toast.success("Station has been Deleted");
      queryClient.invalidateQueries(["getStations"]);
    },
    onError: (error) => {
      toast.error("Please Try Again: " + error.message);
      queryClient.invalidateQueries(["getStations"]);
      console.error("deletion Error:", error);
    },
  });
  return { deleteStationMutate, isPendingDelete, isSuccess };
}
