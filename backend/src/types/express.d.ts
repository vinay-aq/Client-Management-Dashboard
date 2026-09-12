import "express-serve-static-core";

declare module "express-serve-static-core" {
  interface Request {
    user: {
      id: number;
      name: string;
      role: {
        id: number;
        name: string;
        description: string;
        code: string;
        isActive: boolean;
        createdAt: string;
        updatedAt: string;
      };

      permissions: string[];
      name: string;
      iat: number;
      exp: number;
    };
  }
}
