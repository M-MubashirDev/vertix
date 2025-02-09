import useMutateLoginSuperAdmin from "../Hooks/SuperAdmin/useMutateLoginSuperAdmin";
import Form from "../UI/Form";

function Login() {
  const { superLoginMutate, pendLogin } = useMutateLoginSuperAdmin();

  async function Submit(e) {
    if (!e.email || !e.password) {
      console.error("Email and password are required.");
      return;
    }
    superLoginMutate({ email: e.email, password: e.password });
  }

  return (
    <div className="bg-gray-100">
      <div className="flex items-center justify-center max-w-[1440px] w-[90%] mx-auto min-h-screen ">
        <div className="w-full max-w-lg bg-white p-8 shadow-lg rounded-lg">
          {/* Logo Section */}
          <div className="flex justify-center mb-6">
            <img
              src="logo.png" // Replace with your logo path
              alt="Logo"
              className="h-16 w-auto"
            />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-primary-dark mb-6 text-center">
            Login to Your Account
          </h1>

          {/* Form */}
          <Form onSubmit={Submit}>
            {/* Email Input */}
            <Form.Input
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

            {/* Password Input */}
            <Form.PasswordInput
              label="Password"
              name="password"
              validation={{ required: "Please Enter the Password" }}
            />

            {/* Submit Button */}
            {/* <div className="flex flex-col sm:flex-row gap-4 mt-8 sm:max-w-[50rem]">
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
          </div> */}
            <Form.ButtonSubmit isSubmitting={pendLogin}>
              Login
            </Form.ButtonSubmit>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Login;
