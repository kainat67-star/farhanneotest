import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4 py-8">
      <div className="w-full max-w-md text-center">
        <h1 className="mb-3 text-3xl font-bold sm:mb-4 sm:text-4xl">404</h1>
        <p className="mb-4 text-base text-muted-foreground sm:text-xl">Oops! Page not found</p>
        <Link to="/" className="text-sm font-medium text-primary underline-offset-4 hover:text-primary/90 hover:underline sm:text-base">
          Return to home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
