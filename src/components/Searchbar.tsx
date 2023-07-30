import { Fragment, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import {
  useGetMoviesBySearchQuery,
  useGetNowPlayingMovies,
} from '../hooks/useMovies';
import { Movie } from '../utilities/types';
import { useNavigate } from 'react-router-dom';
import { useGenreContext } from '../contexts/GenreContext';
import UseAnimations from 'react-useanimations';
import loading from 'react-useanimations/lib/loading';

export default function SearchBar() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Movie | null>(null);
  const [query, setQuery] = useState('');

  const { genreIDs } = useGenreContext();
  const genreIDsString = genreIDs.join('-');

  const { data: moviesByQuery, isLoading: isLoadingQuery } =
    useGetMoviesBySearchQuery(query);

  const { data: playingNowMovies, isLoading: isLoadingNowPlaying } =
    useGetNowPlayingMovies(genreIDsString);

  const movies = query === '' ? playingNowMovies : moviesByQuery;
  const isLoading = query === '' ? isLoadingNowPlaying : isLoadingQuery;

  function handleSubmitMovie(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && selected) {
      navigate(`/movies/${selected.tmdbId}`);
    }
  }

  return (
    <div>
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-full bg-dark-light text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-yellow">
            <div className="pl-6 h-full absolute border-solid flex justify-center items-center">
              <MagnifyingGlassIcon
                className="text-white-dimmed "
                style={{
                  width: '18px',
                }}
              />
            </div>
            <Combobox.Input
              onKeyUp={e => handleSubmitMovie(e)}
              placeholder="Search movies"
              className="h-12 w-full rounded-full bg-transparent border-none py-2 pl-3 pr-10 text-sm leading-5 text-white-dimmed focus:ring-0 indent-10"
              displayValue={(movie: Movie) => movie && movie.title}
              onChange={event => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-2 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute w-full mt-1 max-h-60 overflow-auto rounded-md bg-dark-light text-white-dimmed py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-sm">
              {isLoading ? (
                <Combobox.Option
                  value="none"
                  className="py-2 pl-10 pr-4 flex gap-1 items-end"
                >
                  Loading movie suggestions...
                  <UseAnimations
                    animation={loading}
                    strokeColor="rgba(255, 255, 255, 0.4)"
                    size={20}
                  />
                </Combobox.Option>
              ) : movies && movies.length > 0 ? (
                movies.map((movie: Movie) => (
                  <Combobox.Option
                    onClick={() => navigate(`/movies/${movie.tmdbId}`)}
                    key={movie.tmdbId}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active && 'bg-amber-500 text-white'
                      }`
                    }
                    value={movie}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {movie.title}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white-dimmed' : 'text-yellow'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              ) : (
                <Combobox.Option value="none" className="py-2 pl-10 pr-4">
                  No movie suggestions found.
                </Combobox.Option>
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
