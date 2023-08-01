import { Link } from 'react-router-dom';
import { useGetBookmarks } from '../hooks/useBookmarks';
import { Movie } from '../utilities/types';
import UseAnimations from 'react-useanimations';
import loading from 'react-useanimations/lib/loading';
import HeaderPage from '../components/HeaderPage';
export default function BookmarkedMovies() {
  const { data, isError, isLoading } = useGetBookmarks();
  if (isError) {
    return (
      <section>
        <HeaderPage
          children="Bookmarked Movies"
          hasBackButton={false}
          hasFade={true}
        />
        <div className="px-5 py-8">
          <h1 className="typography-primary text-white">
            Couldn't find the bookmarks, sorry!
          </h1>
        </div>
      </section>
    );
  } else if (isLoading) {
    return (
      <section>
        <HeaderPage
          children="Bookmarked Movies"
          hasBackButton={false}
          hasFade={true}
        />
        <div className="flex gap-2 px-5 py-8 items-end">
          <UseAnimations
            animation={loading}
            strokeColor="rgba(255, 255, 255, 0.4)"
          />
          <h4 className="typography-title text-white-dimmed">Loading.....</h4>
        </div>
      </section>
    );
  } else if (data.length === 0) {
    return (
      <section>
        <HeaderPage
          children="Bookmarked Movies"
          hasBackButton={false}
          hasFade={true}
        />
        <div className="flex justify-center items-center h-screen text-center px-5 pb-24">
          <h1 className="text-2xl text-white-dimmed">
            You have no bookmarked movies.
          </h1>
        </div>
      </section>
    );
  } else
    return (
      <section>
        <HeaderPage
          children="Bookmarked Movies"
          hasBackButton={false}
          hasFade={true}
        />
        <div className="grid grid-rows-2 grid-cols-2 gap-5 px-5 pb-24">
          {data.map((movie: Movie, index: number) => {
            let image = movie.posterPath;
            return (
              <Link to={`/movies/${movie.tmdbId}`} key={index}>
                <img
                  className="rounded-md object-cover h-full w-full"
                  alt={`Poster for the movie ${movie.title}`}
                  src={`https://image.tmdb.org/t/p/original/${image}`}
                ></img>
              </Link>
            );
          })}
        </div>
      </section>
    );
}
