import CustomForm from "../UI/Form";
import BackButton from "../UI/BackButton";
import { useNewAdminMutate } from "../Hooks/Admin/useAdmin";
function Admin() {
  const { mutateAdmin, isPending: newAdminPend } = useNewAdminMutate();

  function submitFunc(values) {
    if (!values) return;
    console.log(values);
    const data = {
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      password: values.password,
      cellno: values.number,
    };
    mutateAdmin({ url: "create-admin", data });
  }
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
            label="Upload File"
            name="fileInput"
            multiple={false}
            accept="image/*" // Accept all file types
            validation={{ required: "File is required" }}
          />

          <CustomForm.ButtonSubmit>Sign In</CustomForm.ButtonSubmit>
        </CustomForm>
      </div>
    </div>
  );
}

export default Admin;
