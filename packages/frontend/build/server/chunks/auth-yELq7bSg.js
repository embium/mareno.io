import { p as public_env } from './shared-server-BU2DVf8Q.js';
import { z } from 'zod';

const config = {
  /**
   * Backend API base URL
   * @default 'http://localhost:8000'
   */
  apiUrl: public_env.PUBLIC_API_URL || "http://localhost:8000",
  /**
   * API request timeout in milliseconds
   * @default 30000
   */
  apiTimeout: parseInt(public_env.PUBLIC_API_TIMEOUT || "30000", 10)
};
const emailSchema = z.string().email("Invalid email format").min(1, "Email is required");
z.string().min(3, "Username must be at least 3 characters long").max(30, "Username must be at most 30 characters long").regex(
  /^[a-zA-Z][a-zA-Z0-9_]*$/,
  "Username must start with a letter and contain only letters, numbers, and underscores"
);
const passwordSchema = z.string().min(8, "Password must be at least 8 characters long").regex(/[A-Z]/, "Password must contain at least one uppercase letter").regex(/[a-z]/, "Password must contain at least one lowercase letter").regex(/\d/, "Password must contain at least one digit").regex(
  /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
  "Password must contain at least one special character"
);
z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required")
});
z.object({
  email: emailSchema,
  password: passwordSchema
});
z.object({
  refresh_token: z.string().min(1, "Refresh token is required")
});
z.object({
  current_password: z.string().min(1, "Current password is required"),
  new_password: passwordSchema
});
z.object({
  token: z.string().min(1, "Token is required")
});
z.object({
  email: emailSchema
});
z.object({
  email: emailSchema
});
z.object({
  token: z.string().min(1, "Token is required"),
  new_password: passwordSchema
});
const userSchema = z.object({
  id: z.string(),
  email: z.email(),
  username: z.string(),
  name: z.string().nullable(),
  avatar: z.string().nullable(),
  created_at: z.string(),
  is_active: z.boolean(),
  is_email_verified: z.boolean(),
  subscription_tier: z.string().nullable().optional()
});
z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  token_type: z.string(),
  expires_in: z.number(),
  user: userSchema
});
z.object({
  user_id: z.string(),
  email: z.email(),
  created_at: z.string(),
  message: z.string().optional()
});
z.object({
  access_token: z.string(),
  token_type: z.string(),
  expires_in: z.number()
});
z.object({
  message: z.string()
});
z.object({
  message: z.string()
});
const errorResponseSchema = z.object({
  detail: z.string(),
  error_code: z.string().optional()
});
z.object({
  message: z.string(),
  email: z.string(),
  access_token: z.string().optional(),
  refresh_token: z.string().optional(),
  token_type: z.string().optional(),
  expires_in: z.number().optional()
});
z.object({
  message: z.string()
});
z.object({
  message: z.string()
});
z.object({
  message: z.string()
});
class AuthError extends Error {
  constructor(message, code, statusCode) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.name = "AuthError";
  }
}
class NetworkError extends Error {
  constructor(message, originalError) {
    super(message);
    this.originalError = originalError;
    this.name = "NetworkError";
  }
}

export { AuthError as A, NetworkError as N, config as c, errorResponseSchema as e };
//# sourceMappingURL=auth-yELq7bSg.js.map
