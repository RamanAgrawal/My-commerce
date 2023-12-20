import { MouseEventHandler } from "react";
import Spinner from "../features/loaders/Spinner";

interface ButtonProps {
  loading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  label: string;
  variant: "primary" | "secondary";
  className?: string;
}

const Button = ({
  loading,
  onClick,
  label,
  variant,
  className,
}: ButtonProps) => {
  const classname = `${
    variant === "primary"
      ? "bg-primary hover:bg-indigo-700 focus:ring-indigo-500 text-white "
      : "bg-yellow-400 text-black hover:bg-yellow-500"
  } mt-10 flex w-full items-center justify-center rounded-md border border-transparent  px-8 py-3 text-base font-medium focus:outline-none focus:ring-2  focus:ring-offset-2`;
  return (
    <button
      onClick={onClick}
      type="submit"
      className={`${classname} ${className}`}
    >
      {label}
      {loading && <Spinner />}
    </button>
  );
};

export default Button;
