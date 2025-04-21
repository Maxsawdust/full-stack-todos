export default interface UserDetails {
  username?: string;
  email: string;
  password: string;
  remember?: boolean;
}

// Extend Express Request type
declare module "express" {
  interface Request {
    user?: any;
  }
}
