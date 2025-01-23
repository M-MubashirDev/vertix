import { useParams } from "react-router-dom";
import { usePostStationMutate } from "../Hooks/Admin/useServiceStations";
import Form from "../UI/Form";

function CreateStations() {
  const { adminId } = useParams();
  const { postStations, isPendingStation } = usePostStationMutate();

  const handleCreateStation = async (data) => {
    console.log(data);
    postStations({
      url: "service-station",
      data: { adminId: adminId, ...data },
    });
  };

  return (
    <div className=" mt-10  p-8 rounded-lg ">
      <h2 className="text-2xl font-bold text-primary-dark mb-6 text-center">
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

        {/* Image Field */}
        <Form.FileInput label="Station Image" name="image" accept="image/*" />

        {/* Submit Button */}
        <Form.ButtonSubmit>Create Station</Form.ButtonSubmit>
      </Form>
    </div>
  );
}

export default CreateStations;
