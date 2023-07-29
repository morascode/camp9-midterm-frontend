import {
  HomeIcon,
  FilmIcon,
  HeartIcon,
  UserIcon,
} from '@heroicons/react/24/solid';
import {
  HomeIcon as HomeIconOutline,
  FilmIcon as FilmIconOutline,
  HeartIcon as HeartIconOutline,
  UserIcon as UserIconOutline,
} from '@heroicons/react/24/outline';
import { NavLink, NavLinkProps } from 'react-router-dom';

interface NavigationButtonProps extends NavLinkProps {
  icon: 'home' | 'movies' | 'bookmarks' | 'account';
}

function NavigationButton({ icon, ...props }: NavigationButtonProps) {
  return (
    <NavLink
      aria-label={icon}
      to={props.to}
      className="block w-7 dark:fill-dark-light no_highlight"
    >
      {({ isActive, isPending }) => {
        switch (icon) {
          case 'home':
            if (isActive) return <HomeIcon />;
            else return <HomeIconOutline />;
          case 'movies':
            if (isActive) return <FilmIcon />;
            else return <FilmIconOutline />;
          case 'bookmarks':
            if (isActive) return <HeartIcon />;
            else return <HeartIconOutline />;
          case 'account':
            if (isActive) return <UserIcon />;
            else return <UserIconOutline />;
        }
      }}
    </NavLink>
  );
}

export default NavigationButton;
