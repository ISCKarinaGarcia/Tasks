import { withAuth } from "next-auth/middleware";

export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/admin/tasks" ,
    "/admin/tasks/new" ,
    "/admin/tasks/update" ,
    "/admin/users",
    "/admin/users/new",
    "/admin/users/edit"



  ],
};

