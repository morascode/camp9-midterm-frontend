import { HomeIcon } from '@heroicons/react/24/solid';
import { NavLink, NavLinkProps } from 'react-router-dom';

interface NavigationButtonProps extends NavLinkProps {
  icon: 'home' | 'movies' | 'bookmarks' | 'account';
}

function NavigationButton({ icon, ...props }: NavigationButtonProps) {
  return (
    <NavLink to={props.to} className="w-7 dark:fill-dark-light">
      {({ isActive, isPending }) => {
        switch (icon) {
          case 'home':
            return <HomeIcon />;
          case 'movies':
            return <HomeIcon />;
          case 'bookmarks':
            return <HomeIcon />;
          case 'account':
            return <HomeIcon />;
        }
      }}
    </NavLink>
  );
}

export default NavigationButton;
