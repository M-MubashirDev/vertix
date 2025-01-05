import { useEffect, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { IoIosCloudDone } from "react-icons/io";
import {
  useForm,
  FormProvider,
  useFormContext,
  useController,
} from "react-hook-form";

// Main Form Component
function Form({ children, onSubmit, defaultValues = {} }) {
  const methods = useForm({
    mode: "onChange",
    defaultValues,
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-6 my-6"
      >
        {children}
      </form>
    </FormProvider>
  );
}

// Input Component
function Input({ label, name, type = "text", validation, ...rest }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex items-center justify-center">
      <div className="relative w-full">
        <input
          type={type}
          id={name}
          {...register(name, validation)} // Changed from rules to validation
          placeholder=""
          className={`w-full border-b ${
            errors[name] ? "border-red-500" : "border-gray-300"
          } py-1 focus:border-b-2 focus:border-primary-dark transition-colors focus:outline-none peer bg-inherit`}
          {...rest}
        />
        <label
          htmlFor={name}
          className="absolute -top-4 text-xs left-0 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-primary-dark peer-placeholder-shown:top-1 peer-placeholder-shown:text-sm text-gray-400"
        >
          {label}
        </label>
        {errors[name] && (
          <p role="alert" className="mt-1 text-sm text-red-500">
            {errors[name]?.message}
          </p>
        )}
      </div>
    </div>
  );
}
//file type
function FileInput({
  label,
  name,
  accept,
  multiple = false,
  validation,
  ...rest
}) {
  const [preview, setPreview] = useState(null);
  const {
    field: { onChange, onBlur, value, name: fieldName, ref },
    fieldState: { invalid, isTouched, error },
    formState: { touchedFields, dirtyFields },
  } = useController({
    name,
    rules: validation,
    defaultValue: "",
  });

  const handleFileChange = (e) => {
    const files = e.target.files;
    onChange(files);
    // Check if a file is selected
    if (files && files[0]) {
      // Check if the file is an image
      if (files[0].type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(files[0]);
      } else {
        setPreview(null);
      }
    } else {
      setPreview(null);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="relative w-full">
        <input
          type="file"
          id={fieldName}
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={handleFileChange}
          onBlur={onBlur}
          ref={ref}
          {...rest}
        />
        <label
          htmlFor={fieldName}
          className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary-dark transition-colors bg-gray-50 hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {preview ? (
              <IoIosCloudDone className="text-4xl text-green-700" />
            ) : (
              <svg
                className="w-8 h-8 mb-4 text-gray-500"
                aria-hidden="true"
                xmlns="(link unavailable)"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
            )}
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500">
              {accept ? `Accepted files: ${accept}` : "All files accepted"}
            </p>
          </div>
        </label>
        <p className="absolute -top-6 text-xs left-0 text-gray-400">{label}</p>
      </div>
      {error && (
        <p role="alert" className="text-sm text-red-500">
          {error?.message}
        </p>
      )}
    </div>
  );
} //   label,
//   name,
//   accept,
//   multiple = false,
//   validation,
//   ...rest
// }) {
//   return (
//     <Input
//       label={label}
//       accept={accept}
//       validation={validation}
//       type="file"
//       name={name}
//     />
//   );
// }

// Secure Password Component
function InputSecure({ label, name, confirmName, ...rest }) {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    watch,
    trigger,
    formState: { errors },
  } = useFormContext();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const passwordValue = watch(name);
  const confirmPasswordValue = watch(confirmName);

  useEffect(() => {
    if (confirmPasswordValue) trigger(confirmName);
  }, [passwordValue, confirmPasswordValue, confirmName, trigger]);

  return (
    <>
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          label={label}
          name={name}
          validation={{
            // Changed from rules to validation
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          }}
          {...rest}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-0 top-1 cursor-pointer text-primary hover:text-gray-600"
        >
          {showPassword ? <BsEyeSlash /> : <BsEye />}
        </button>
      </div>

      <Input
        type={showPassword ? "text" : "password"}
        label={`Confirm ${label}`}
        name={confirmName}
        validation={{
          // Changed from rules to validation
          required: "Please confirm your password",
          validate: (value) =>
            value === passwordValue || "Passwords do not match",
        }}
      />
    </>
  );
}
// Submit Button Component
function ButtonSubmit({ children, isSubmitting }) {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={`relative h-12 overflow-hidden text-white bg-primary-dark w-full shadow-2xl ${
        isSubmitting ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <span className="relative z-10">
        {isSubmitting ? "Submitting..." : children}
      </span>
    </button>
  );
}

// Export Subcomponents
Form.ButtonSubmit = ButtonSubmit;
Form.InputSecure = InputSecure;
Form.Input = Input;
Form.FileInput = FileInput;

export default Form;
