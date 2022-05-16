import s from "./ErrorView.module.css";
import errorImage from "../../images/error.jpeg";

interface ErrorViewProps {
  message: string | undefined;
}

const ErrorView: React.FC<ErrorViewProps> = ({ message }) => {
  return (
    <div role="alert" className={s.errorWrap}>
      <img src={errorImage} width="340" alt="error" />
      <p className={s.errorMessage}>
        Sorry, something went wrong. Please try again.
      </p>
      <p className={s.errorMessage}>Error:{message}.</p>
    </div>
  );
};

export default ErrorView;
