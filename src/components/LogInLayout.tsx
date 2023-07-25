//  implement that login is not accessible when token exists (user is logged in)

import { Outlet, useNavigate } from 'react-router-dom';
import { useCheckAuthQuery } from '../hooks/useUser';
import { useEffect } from 'react';
import UseAnimations from 'react-useanimations';
import loading from 'react-useanimations/lib/loading';

export default function LogInLayout() {
  const navigate = useNavigate();
  const { data, isLoading } = useCheckAuthQuery();
  useEffect(() => {
    if (data?.auth) {
      navigate('/');
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
    </>
  );
}
