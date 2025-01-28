import { useNavigate, useParams } from "react-router-dom";
import { useAdminContext } from "../Hooks/AdminContext";
import Form from "../UI/Form";
import { useUpdateAdminMutate } from "../Hooks/Admin/useAdmin";

function Edit() {
  const { adminId } = useParams();
  const { admin } = useAdminContext();
  const { dataAdmins } = admin;
  const { admins } = dataAdmins || {};
  const currentAdmin = admins?.find((val) => val._id === adminId);
  const navigate = useNavigate();

  const { updateAdmin, isPendingUpdate } = useUpdateAdminMutate(); // Update API

  function SubmitData(value) {
    if (!value) return;

    const formData = new FormData(); // Use FormData to send both text and file data
    formData.append("firstname", value.firstname);
    formData.append("lastname", value.lastname);
    formData.append("email", value.email);
    formData.append("cellno", value.cellno);

    if (value.profileImage) {
      formData.append("image", value.profileImage); // Add the image file to the FormData
    }
    console.log(formData);
    updateAdmin({
      url: "update-admin",
      id: adminId,
      updatedData: formData,
    });
  }

  if (!currentAdmin) {
    return (
      <div className="bg-background p-6 rounded-md max-w-[1440px] mx-auto">
        <h2 className="text-primary-dark text-2xl font-bold mb-4">
          Admin Edit
        </h2>
        <p className="text-neutral-dark">No admin data available.</p>
      </div>
    );
  }

  return (
    <div className="bg-background p-6 rounded-md max-w-[1440px] mx-auto">
      <h2 className="text-primary-dark text-2xl font-bold mb-4">
        Edit Admin Details
      </h2>
      <Form
        defaultValues={{
          firstname: currentAdmin.firstname,
          lastname: currentAdmin.lastname,
          email: currentAdmin.email,
          cellno: currentAdmin.cellno,
        }}
        onSubmit={SubmitData}
      >
        <Form.Input label="First Name" name="firstname" />
        <Form.Input label="Last Name" name="lastname" />
        <Form.Input label="Email" name="email" type="email" />
        <Form.Input label="Phone Number" name="cellno" />
        <Form.FileInput
          label="Upload Image"
          name="profileImage"
          accept="image/*"
        />
        <div className="flex flex-col sm:flex-row gap-4 mt-8 sm:max-w-[50rem]">
          <Form.ButtonSubmit isSubmitting={isPendingUpdate}>
            Save Changes
          </Form.ButtonSubmit>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full bg-gray-200  text-gray-700 py-2 px-4 rounded-xl hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </Form>
    </div>
  );
}

export default Edit;
