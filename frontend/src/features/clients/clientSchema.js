import z from "zod";

export const clientSchema = z.object({
  name: z.string().min(2, "Name must be atleast 2 digits"),
  email: z.email("Invalid email address"),
  phone: z.string().min(10, "Phone must be atleast 10 digits"),
  company: z.string().min(2, "Company must be atleast 2 digits"),
  status: z.enum(["active", "inactive","pending","suspended"]),
  avatar:  z.any().optional()
});
