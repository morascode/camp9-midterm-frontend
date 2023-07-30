import { ChevronLeftIcon, HeartIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

type Props = {
  children: string;
  hasHeartButton?: boolean;
  hasBackButton?: boolean;
  hasFade?: boolean;
  isLiked?: boolean;
  onHeartButtonClick?: () => void;
};

function HeaderPage({
  hasBackButton = true,
  hasHeartButton = false,
  hasFade = false,
  ...props
}: Props) {
  // function used to navigate back to the last page when the arrow back is clicked
  const navigation = useNavigate();
  // the return statement with the jsx component
  return (
    <header className="sticky top-0 z-10">
      <div
        className={
          `flex justify-between items-center px-5 pt-8 bg-dark dark:bg-white ` +
          (hasFade ? 'pb-4' : 'pb-8')
        }
      >
        {/* the little back arrow */}
        <div className="w-5 h-5">
          {hasBackButton && (
            <button onClick={() => navigation(-1)}>
              <ChevronLeftIcon className="typography-title w-5 dark:stroke-dark"></ChevronLeftIcon>
            </button>
          )}
        </div>
        {/* the title of the page */}
        <h1 className="typography-title dark:text-dark">{props.children}</h1>
        {/* the heart icon, visible if the hasHeartButton={true} prop is passed, can call the callback function on click if one is passed as the onHeartButtonClick prop */}
        <div className="w-5 h-5 no_highlight">
          {hasHeartButton && (
            <button
              onClick={() => {
                props.onHeartButtonClick && props.onHeartButtonClick();
              }}
              className={
                `w-full transition-colors duration-500 ` +
                (props.isLiked
                  ? `stroke-transparent text-red`
                  : `stroke-red text-transparent`)
              }
            >
              <HeartIcon />
            </button>
          )}
        </div>
      </div>
      {hasFade && <div className="h-4 w-full bg-gradient-to-b from-dark"></div>}
    </header>
  );
}

export default HeaderPage;
