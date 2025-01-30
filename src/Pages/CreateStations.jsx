// import { useNavigate, useParams } from "react-router-dom";
// import { usePostStationMutate } from "../Hooks/Admin/useServiceStations";
// import Form from "../UI/Form";

// function CreateStations() {
//   const navigate = useNavigate();
//   const { adminId } = useParams();
//   const { postStations, isPendingStation } = usePostStationMutate();

//   const handleCreateStation = async (data) => {
//     console.log(data);
//     postStations({
//       url: "service-station",
//       data: { adminId: adminId, ...data },
//     });
//   };
//   console.log(isPendingStation);

//   return (
//     <div className=" mt-10  p-8 rounded-lg ">
//       <h2 className="text-2xl font-bold text-primary-dark mb-6 text-center">
//         Create Service Station
//       </h2>
//       <Form onSubmit={handleCreateStation}>
//         {/* Name Field */}
//         <Form.Input
//           label="Station Name"
//           name="name"
//           type="text"
//           validation={{
//             required: "Station name is required",
//           }}
//         />

//         {/* Location Field */}
//         <Form.Input
//           label="Location"
//           name="location"
//           type="text"
//           validation={{
//             required: "Location is required",
//           }}
//         />

//         {/* Address Field */}
//         <Form.Input
//           label="Address"
//           name="address"
//           type="text"
//           validation={{
//             required: "Address is required",
//           }}
//         />

//         {/* Image Field */}
//         <Form.FileInput label="Station Image" name="image" accept="image/*" />

//         {/* Submit Button */}
//         {/* <Form.ButtonSubmit>Create Station</Form.ButtonSubmit> */}
//         <div className="flex flex-col sm:flex-row gap-4 mt-8 sm:max-w-[50rem]">
//           <Form.ButtonSubmit isSubmitting={isPendingStation}>
//             Create Station{" "}
//           </Form.ButtonSubmit>
//           <button
//             type="button"
//             onClick={() => navigate(-1)}
//             className="w-full bg-gray-200  text-gray-700 py-2 px-4 rounded-xl hover:bg-gray-300 transition-colors"
//           >
//             Cancel
//           </button>
//         </div>
//       </Form>
//     </div>
//   );
// }

// export default CreateStations;
import { useNavigate, useParams } from "react-router-dom";
import { usePostStationMutate } from "../Hooks/Admin/useServiceStations";
import Form from "../UI/Form";

function CreateStations() {
  const navigate = useNavigate();
  const { adminId } = useParams();
  const { postStations, isPendingStation } = usePostStationMutate();

  const handleCreateStation = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("location", data.location.toLowerCase());
    formData.append("address", data.address);
    formData.append("latitude", data.latitude);
    formData.append("longitude", data.longitude);
    formData.append("adminId", adminId);
    if (data.image) {
      formData.append("image", data.image);
    }
    console.log(data.image);
    postStations({
      url: "service-station",
      data: formData,
    });
  };

  return (
    <div className="mt-10 p-8 rounded-lg">
      <h2 className="text-4xl font-bold text-primary-dark mb-10 text-center sm:text-start">
        Create Service Station
      </h2>
      <Form onSubmit={handleCreateStation}>
        {/* Name Field */}
        <Form.Input
          label="Station Name"
          name="name"
          type="text"
          validation={{
            required: "Station name is required",
          }}
        />

        {/* Location Field */}
        <Form.Input
          label="Location"
          name="location"
          type="text"
          validation={{
            required: "Location is required",
          }}
        />

        {/* Address Field */}
        <Form.Input
          label="Address"
          name="address"
          type="text"
          validation={{
            required: "Address is required",
          }}
        />

        {/* Latitude Field */}
        <Form.Input
          label="Latitude"
          name="latitude"
          type="text"
          validation={{
            required: "Latitude is required",
            pattern: {
              value: /^-?\d+(\.\d+)?$/,
              message: "Please enter a valid latitude",
            },
          }}
        />

        {/* Longitude Field */}
        <Form.Input
          label="Longitude"
          name="longitude"
          type="text"
          validation={{
            required: "Longitude is required",
            pattern: {
              value: /^-?\d+(\.\d+)?$/,
              message: "Please enter a valid longitude",
            },
          }}
        />

        {/* Image Field */}
        <Form.FileInput label="Station Image" name="image" accept="image/*" />

        {/* Submit Button */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 sm:max-w-[50rem]">
          <Form.ButtonSubmit isSubmitting={isPendingStation}>
            Create Station
          </Form.ButtonSubmit>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full bg-gray-200 text-gray-700 py-2 px-4 rounded-xl hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </Form>
    </div>
  );
}

export default CreateStations;
