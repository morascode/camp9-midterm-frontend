import InfiniteScroll from 'react-infinite-scroll-component';
import { useGetMovies } from '../hooks/useMovies';
import { Link } from 'react-router-dom';
import UseAnimations from 'react-useanimations';
import loading from 'react-useanimations/lib/loading';

function Movies() {
  const { isError, isLoading, data, fetchNextPage, hasNextPage } =
    useGetMovies();
  if (isError) {
    return (
      <h1 className="typography-primary text-white">
        Couldn't find the movies, sorry!
      </h1>
    );
  } else if (isLoading) {
    return (
      <div className="flex gap-2 px-5 py-8 items-end">
        <UseAnimations
          animation={loading}
          strokeColor="rgba(255, 255, 255, 0.4)"
        />
        <h4 className="typography-title text-white-dimmed">Loading.....</h4>
      </div>
    );
  } else
    return (
      <>
        <div className="fixed top-0 h-8 w-full bg-gradient-to-b from-dark"></div>
        <div className="px-5 py-8">
          <InfiniteScroll
            dataLength={data.pages.length}
            next={() => {
              fetchNextPage();
            }}
            hasMore={!!hasNextPage}
            loader={
              <h4 className="typography-primary text-white">wait a sec...</h4>
            }
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b className="typography-primary text-white">
                  Yay! You have seen all the movies we have in our database!
                </b>
              </p>
            }
          >
            {data.pages.map((page, index) => {
              return (
                <div
                  className="grid grid-rows-2 grid-cols-2 gap-5 mb-5"
                  key={index}
                >
                  {page.results.map((movie, index) => {
                    let image = movie.posterPath;
                    if (movie.posterPath === null) {
                      return null;
                    } else {
                      return (
                        <Link to={`/movies/${movie.tmdbId}`} key={index}>
                          <img
                            className="rounded-md object-cover h-full w-full"
                            alt={`Poster for the movie ${movie.title}`}
                            src={`https://image.tmdb.org/t/p/original/${image}`}
                          />
                        </Link>
                      );
                    }
                  })}
                </div>
              );
            })}
          </InfiniteScroll>
        </div>
      </>
    );
}

export default Movies;
