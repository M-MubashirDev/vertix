/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useForm } from "react-hook-form";

// Create a Context for the form
const FormContext = createContext();

// Custom hook to use the form context
const useFormContextCustom = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("Form components must be used within a FormProvider");
  }
  return context;
};

// Form Component: Provides form context and handles submission
function Form({ children, onSubmit }) {
  const methods = useForm({
    mode: "onTouched", // Validate inputs when they are touched
  });

  return (
    <FormContext.Provider value={methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
        {children}
      </form>
    </FormContext.Provider>
  );
}

// Input Component: Generic input field with label and validation
function Input({ label, name, type = "text", validation = {}, ...rest }) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContextCustom();

  const value = watch(name);

  return (
    <div className="relative">
      <input
        type={type}
        id={name}
        className={`peer h-10 w-full border-b-2 ${
          errors[name] ? "border-red-500" : "border-gray-300"
        } text-white bg-transparent placeholder-transparent focus:outline-none focus:border-blue-800 transition-colors duration-200`}
        placeholder=" "
        {...register(name, validation)}
        {...rest}
      />
      <label
        htmlFor={name}
        className={`absolute left-0 transition-all duration-200 ease-in-out ${
          value || document.activeElement === document.querySelector(`#${name}`)
            ? "-top-4 text-gray-400 text-sm"
            : "top-2 text-gray-400 text-base"
        } peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-4 peer-focus:text-sm`}
      >
        {label}
      </label>
      {errors[name] && (
        <p className="mt-1 text-sm text-red-500">{errors[name].message}</p>
      )}
    </div>
  );
}

// InputSecure Component: Password input with visibility toggle and confirmation
function InputSecure({ label, name, confirmName, ...rest }) {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContextCustom();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const passwordValue = watch(name);
  const confirmPasswordValue = watch(confirmName);

  return (
    <>
      {/* Password Input */}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id={name}
          className={`peer h-10 w-full border-b-2 ${
            errors[name] ? "border-red-500" : "border-gray-300"
          } text-white bg-transparent placeholder-transparent focus:outline-none focus:border-blue-800 transition-colors duration-200`}
          placeholder=" "
          {...register(name, {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          {...rest}
        />
        <label
          htmlFor={name}
          className={`absolute left-0 transition-all duration-200 ease-in-out ${
            passwordValue ||
            document.activeElement === document.querySelector(`#${name}`)
              ? "-top-4 text-gray-400 text-sm"
              : "top-2 text-gray-400 text-base"
          } peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-4 peer-focus:text-sm`}
        >
          {label}
        </label>
        {passwordValue && (
          <span
            onClick={togglePasswordVisibility}
            className="absolute right-0 top-2.5 cursor-pointer text-gray-300 hover:text-gray-100"
          >
            {showPassword ? <BsEyeSlash /> : <BsEye />}
          </span>
        )}
        {errors[name] && (
          <p className="mt-1 text-sm text-red-500">{errors[name].message}</p>
        )}
      </div>

      {/* Confirm Password Input */}
      <div className="relative mt-4">
        <input
          type={showPassword ? "text" : "password"}
          id={confirmName}
          className={`peer h-10 w-full border-b-2 ${
            errors[confirmName] ? "border-red-500" : "border-gray-300"
          } text-white bg-transparent placeholder-transparent focus:outline-none focus:border-blue-800 transition-colors duration-200`}
          placeholder=" "
          {...register(confirmName, {
            required: "Please confirm your password",
            validate: (value) =>
              value === passwordValue || "Passwords do not match",
          })}
          {...rest}
        />
        <label
          htmlFor={confirmName}
          className={`absolute left-0 transition-all duration-200 ease-in-out ${
            confirmPasswordValue ||
            document.activeElement === document.querySelector(`#${confirmName}`)
              ? "-top-4 text-gray-400 text-sm"
              : "top-2 text-gray-400 text-base"
          } peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-4 peer-focus:text-sm`}
        >
          Confirm {label}
        </label>
        {confirmPasswordValue && (
          <span
            onClick={() => {}}
            className="absolute right-0 top-2.5 cursor-pointer text-gray-300 hover:text-gray-100"
          >
            {/* Optionally, implement confirm password visibility toggle */}
          </span>
        )}
        {errors[confirmName] && (
          <p className="mt-1 text-sm text-red-500">
            {errors[confirmName].message}
          </p>
        )}
      </div>
    </>
  );
}

// ButtonSubmit Component: Reusable submit button
function ButtonSubmit({ children }) {
  return (
    <button
      className="w-full py-2 px-4 bg-blue-800 hover:bg-blue-900 rounded-md shadow-lg text-white font-semibold transition duration-200 text-sm sm:text-base"
      type="submit"
    >
      {children}
    </button>
  );
}

// Assign compound components to Form
Form.ButtonSubmit = ButtonSubmit;
Form.InputSecure = InputSecure;
Form.Input = Input;

export default Form;
