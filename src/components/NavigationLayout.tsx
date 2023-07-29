import { Outlet, useNavigate } from 'react-router-dom';
import {
  FilmIcon,
  HeartIcon,
  HomeIcon,
  QueueListIcon,
  UserIcon,
} from '@heroicons/react/24/solid';
import { useCheckAuthQuery } from '../hooks/useUser';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import UseAnimations from 'react-useanimations';
import loading from 'react-useanimations/lib/loading';
import { HomeIcon as HomeIconOutline } from '@heroicons/react/24/outline';

function NavigationLayout() {
  const navigate = useNavigate();
  // is user loggedIn ?
  // redirect to /login
  const { data, isLoading } = useCheckAuthQuery();

  useEffect(() => {
    if (!data?.auth) {
      navigate('/login');
    }
  }, [data?.auth, navigate]);

  if (isLoading) {
    return (
      <div className="flex gap-2 px-5 py-8 items-end">
        <UseAnimations
          animation={loading}
          strokeColor="rgba(255, 255, 255, 0.4)"
        />
        <h4 className="typography-title text-white-dimmed">Loading.....</h4>
      </div>
    );
  }

  return (
    <>
      <main>
        <Outlet />
      </main>
      <footer className="w-full fixed -bottom-2">
        <div className="h-4 w-full bg-gradient-to-t from-dark relative top-1"></div>
        <nav className="pt-8 pb-10 px-14 text-white-dimmed bg-dark dark:text-dark dark:bg-white-dimmed">
          <ul className="flex flex-row justify-between max-w-xs m-auto ">
            <li>
              <NavLink to="/" className="w-7 dark:fill-dark-light">
                <HomeIcon className="w-fit" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/movies">
                <FilmIcon className="w-7 dark:fill-dark-light" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/bookmarks">
                <HeartIcon className="w-7 dark:fill-dark-light" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/accountpage">
                <UserIcon className="w-7 dark:fill-dark-light" />
              </NavLink>
            </li>
          </ul>
        </nav>
      </footer>
    </>
  );
}

export default NavigationLayout;
