import {z} from "zod";

const createCustomer = z.object({
  firstName: z.string().min(3, { message: "FirstName must be at least 3 characters" }),
  lastName: z.string().min(3, { message: "LastName must be at least 3 characters" }),
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

const updateCustomer = z.object({
    customerId : z.string(),
    firstName : z.string().min(3, "firstName must be at least 3 characters"),
    lastName : z.string().min(3, "lastNam must be at least 3 characters"),
    mobile : z.string().regex(/^\d{10}$/, {message : "Enter a valid 10-digit Mobie Number"}),
    email : z.string().email({message : "Enter valid email address"}),
    address : z.object({
        street : z.string(),
        city : z.string(),
        state : z.string(),
        zipCode : z.string().regex(/^\d{6}$/, {message : "Zipcode must be exactly 6 digits"})
    })
})

const updateTagInCustomer = z.object({
    customerId : z.string(),
    tagName : z.string()
})

const validate = (schema) => (req,res,next) =>{
  const result = schema.safeParse(req.body);
  if(!result.success){
    const errors = result.error.errors.map((err)=> err.message)
    res.status(400).json({errors})
  }
  next()
}

export const createCustomerValidate = validate(createCustomer);
export const loginValidate = validate(login);
export const updateCustomerValidate = validate(updateCustomer);
export const updateTagInCustomerValidate = validate(updateTagInCustomer)