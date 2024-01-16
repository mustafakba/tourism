import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, MouseEvent } from "react";
import LoadingSpinnerLight from "../LoadingSpinner";

// Prop türlerini tanımlayın
interface ButtonProps {
  title: string;
  icon?: any; // FontAwesomeIcon'un alabileceği türü belirtmek ideal olacaktır
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  isPending?: boolean;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  className?: string;
  type?: "button" | "submit" | "reset";
  width?: string | number;
  maxWidth?: string | number;
  minWidth?: string | number;
}

const Button: React.FC<ButtonProps> = ({
  title,
  icon,
  onClick,
  isPending = false,
  disabled = false,
  variant = "primary",
  className,
  type = "button",
  width,
  maxWidth,
  minWidth,
}) => {
  const [isWaitingPending, setIsWaitingPending] = useState(false);

  // classnames kütüphanesi olmadan sınıf isimlerini belirleme
  const buttonClassNames = `button-${variant} ${className || ""} ${
    isWaitingPending || disabled ? "disabled" : ""
  }`;

  const handleOnClick = async (event: MouseEvent<HTMLButtonElement>) => {
    if (!onClick) return;
    if (isPending) {
      setIsWaitingPending(true);
      await onClick(event);
      setIsWaitingPending(false);
      return;
    }
    onClick(event);
  };

  return (
    <button
      className={buttonClassNames}
      type={type}
      onClick={handleOnClick}
      style={{ width, maxWidth, minWidth }}
    >
      {!isWaitingPending && (
        <div className={"flex justify-center items-center gap-x-2"}>
          <div>{title}</div>
          {!!icon && (
            <div>
              <FontAwesomeIcon icon={icon} />
            </div>
          )}
        </div>
      )}
      {isWaitingPending && (
        <div className={"w-full h-full flex justify-center items-center"}>
          <LoadingSpinnerLight size={34} />
        </div>
      )}
    </button>
  );
};

export default Button;
