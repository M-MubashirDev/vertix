import CustomForm from "../UI/Form";
function submitFunc(values) {
  console.log(values);
}
function Admin() {
  return (
    <div>
      <div className="mt-20">
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
          <CustomForm.InputSecure
            label="Password"
            name="password"
            confirmName="confirmPassword"
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
          {/* <CustomForm.Input
            label="Full Name"
            name="fullname"
            type="file"
            validation={{
              required: "Name  is required",
            }}
          /> */}
          {/* Submit Button */}
          <CustomForm.ButtonSubmit>Sign In</CustomForm.ButtonSubmit>
        </CustomForm>
      </div>
    </div>
  );
}

export default Admin;
