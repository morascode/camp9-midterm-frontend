import Button from '../components/Button';
import { Link, useParams } from 'react-router-dom';
import { minutesToHoursAndMinutes } from '../utilities/minutesToHoursAndMinutes';
import { firstOneOrTwoGenres } from '../utilities/firstOneOrTwoGenres';
import { returnNameOfCrewMember } from '../utilities/returnNameOfCrewMember';
import { useGetMovieDetails } from '../hooks/useMovies';
import HeaderPage from '../components/HeaderPage';
import { useBookmarks } from '../hooks/useBookmarks';
import UseAnimations from 'react-useanimations';
import loading from 'react-useanimations/lib/loading';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';

function MovieDetails() {
  const movieId = parseInt(useParams().id!);
  const { isBookmarked, toggleBookmark } = useBookmarks(movieId);
  const { data, isLoading, isError } = useGetMovieDetails(movieId);
  if (isLoading) {
    return (
      <article className="h-screen w-screen">
        <HeaderPage children="Movie Details" hasHeartButton={false} />
        <div className="flex gap-2 px-5 pb-8 items-end">
          <UseAnimations
            animation={loading}
            strokeColor="rgba(255, 255, 255, 0.4)"
          />
          <h4 className="typography-title text-white-dimmed">Loading...</h4>
        </div>
      </article>
    );
  }
  if (isError) {
    return (
      <article className="h-screen w-screen">
        <HeaderPage children="Movie Details" hasHeartButton={false} />
        <div className="flex gap-2 px-5 pb-8 items-end">
          <h4 className="typography-title text-white-dimmed">
            Error while fetching the movie {movieId}.
          </h4>
        </div>
      </article>
    );
  }
  return (
    <article className="h-screen w-screen flex flex-col pb-6">
      <HeaderPage
        isLiked={isBookmarked}
        children="Movie Details"
        hasHeartButton={true}
        onHeartButtonClick={toggleBookmark}
      />
      <div className="px-5 pb-7 flex flex-col">
        <img
          alt={`Image for the movie ${data.title}`}
          className="rounded-md object-cover w-full h-48"
          src={`https://image.tmdb.org/t/p/w500${data.backdropPath}`}
        />
        <h2 className="typography-title mt-5">{data.title}</h2>
        <div className="mt-3 flex justify-between">
          <div className="flex gap-3">
            <p className="typography-description text-white">
              {data.releaseDate.split('-')[0]}
            </p>
            <p className="typography-description">
              {firstOneOrTwoGenres(data)}
            </p>
            <p className="typography-description">
              {minutesToHoursAndMinutes(data)}
            </p>
          </div>
          <div className="flex gap-2">
            <span className="typography-description text-green">
              {data && Math.round(data?.voteAverage * 10) + '%'}
            </span>
            <span className="typography-description">Score</span>
          </div>
        </div>
        <div className="flex mt-2 w-full gap-10 justify-between">
          <div className="flex gap-2">
            <div className="flex flex-col justify-evenly">
              <span className="typography-description">Director:</span>
              <span className="typography-description">Writer:</span>
            </div>
            <div className="flex flex-col justify-evenly">
              <span className="typography-description whitespace-nowrap text-white">
                {returnNameOfCrewMember('Director', data)}
              </span>
              <span className="typography-description whitespace-nowrap text-white">
                {returnNameOfCrewMember('Screenplay', data)}
              </span>
            </div>
          </div>
          <Link className="w-32" to={`/credits/${movieId}`}>
            <Button variant="secondary" size="md">
              Cast & Crew
            </Button>
          </Link>
        </div>
        <hr className="mt-3 bg-white-dimmed-heavy"></hr>
        <h2 className="typography-title mt-3">Synopsis</h2>
        <p className="typography-body mt-2">
          {data?.overview.slice(0, 150) + '...'}
        </p>
        <a
          className="typography-body text-orange-500 mt-2"
          href={`https://www.themoviedb.org/movie/${data?.tmdbId}`}
          target="_blank"
        >
          <span className="underline">Read more</span>{' '}
          <ArrowTopRightOnSquareIcon className="h-4 inline mb-1" />
        </a>
      </div>
      <div className="mt-auto px-5">
        <Link to={`/dates/${movieId}`}>
          <Button>Get Reservation</Button>
        </Link>
      </div>
    </article>
  );
}

export default MovieDetails;
