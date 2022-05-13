import s from './Button.module.css'

interface IButtonProps {
    onClick: ()=>void;
}

const Button: React.FC<IButtonProps>= ({ onClick}) => {
    return (
        <button onClick={onClick} className={s.button} type="button">
        Load more
      </button>
    );
  }

export default Button;