import CustomForm from "../UI/Form";
import BackButton from "../UI/BackButton";
import { useNewAdminMutate } from "../Hooks/Admin/useAdmin";
import FullPageSpinner from "../UI/Spinner";
import { useNavigate } from "react-router-dom";
function Admin() {
  const { mutateAdmin, isPending: newAdminPend } = useNewAdminMutate();
  const navigate = useNavigate();
  function submitFunc(values) {
    if (!values) return;

    const formData = new FormData(); // Create a FormData object

    // Append text fields
    formData.append("firstname", values.firstname);
    formData.append("lastname", values.lastname);
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("cellno", values.number);

    // Append the file
    if (values.profileImage) {
      formData.append("image", values.profileImage); // Key name 'image' matches the backend's Multer setup
    }

    // Call the mutation function
    mutateAdmin({
      url: "create-admin",
      data: formData, // Pass the FormData object
    });
  }

  if (newAdminPend) return <FullPageSpinner />;
  return (
    <div className="mt-8">
      <BackButton />
      <div className="mt-8">
        <CustomForm onSubmit={submitFunc}>
          {/* Email Input */}
          <CustomForm.Input
            label="First Name"
            name="firstname"
            type="text"
            validation={{
              required: "Name  is required",
            }}
          />
          <CustomForm.Input label="Last Name" name="lastname" type="text" />

          <CustomForm.Input
            label="Email Address"
            name="email"
            type="email"
            validation={{
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Enter a valid email address",
              },
            }}
          />

          {/* Password and Confirm Password Inputs */}
          <CustomForm.PasswordInput label="Password" name="password" />
          <CustomForm.ConfirmPasswordInput
            label="Confirm Password"
            name="confirmPassword"
            confirmName="password"
          />
          <CustomForm.Input
            label="Phone"
            name="number"
            type="Number"
            validation={{
              required: "Phone Number  is required",
            }}
          />
          <CustomForm.Input
            label="Business Name"
            name="company"
            type="text"
            validation={{
              required: "Business Name  is required",
            }}
          />
          <CustomForm.FileInput
            label="Upload Image"
            name="profileImage"
            accept="image/*"
            validation={{
              required: "Image is required",
            }}
          />

          {/* <CustomForm.ButtonSubmit>New Admin</CustomForm.ButtonSubmit> */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 sm:max-w-[50rem]">
            <CustomForm.ButtonSubmit isSubmitting={newAdminPend}>
              Save Changes
            </CustomForm.ButtonSubmit>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full bg-gray-200  text-gray-700 py-2 px-4 rounded-xl hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </CustomForm>
      </div>
    </div>
  );
}

export default Admin;
