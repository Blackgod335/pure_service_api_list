import { z } from "zod";

const signup = z.object({
  firstName: z.string().min(3, { message: "FirstName must be at least 3 characters" }),
  lastName: z.optional(z.string().min(3, { message: "LastName must be at least 3 characters" })),
  mobile: z.string().regex(/^\d{10}$/, { message: "Enter a valid 10-digit Mobile Number" }),
  email: z.string().email({ message: "Enter valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  address: z.array(z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string().regex(/^\d{6}$/, { message: "Zipcode must be exactly 6 digits" }),
  }))
});

const login = z.object({
  email: z.string().email({ message: "Enter valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

const forgetPassword = z.object({
  email: z.string().email({ message: "Enter valid email address" }),
});

const setPassword = z.object({
  email: z.string().email({ message: "Enter valid email address" }),
  code: z.string().regex(/^\w{6}$/, { message: "Code must be exactly 6 characters" }),
});

const resetPassword = z.object({
  email: z.string().email({ message: "Enter valid email address" }),
  password: z.string(),
  newPassword: z.string().min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const errors = result.error.errors.map((err) => err.message);
    return res.status(400).json({ errors });
  }
  next();
};

export const signupValidation = validate(signup);
export const loginValidation = validate(login);
export const forgetPasswordValidation = validate(forgetPassword);
export const setPasswordValidation = validate(setPassword);
export const resetPasswordValidation = validate(resetPassword);
