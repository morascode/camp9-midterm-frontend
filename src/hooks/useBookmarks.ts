import { useQuery } from '@tanstack/react-query';
import type { MovieDbResponse, Movie } from '../utilities/types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { string } from 'zod';

async function getBookmarkedMovies() {
  const response = await axios.get<MovieDbResponse>(
    `${import.meta.env.VITE_SERVER_URL}/api/1.0/user/bookmarks/`,
    { withCredentials: true }
  );
  return response.data;
}
async function patchBookmark(movieId: number, createBookmark: boolean) {
  const response = await axios.patch(
    `${import.meta.env.VITE_SERVER_URL}/api/1.0/user/bookmarks/${movieId}/`,
    { createBookmark: createBookmark },
    { withCredentials: true }
  );
  return response.data;
}
// the hook
export function useBookmarks(id?: number) {
  const query = useQuery({
    queryKey: ['movies', 'bookmarked'],
    queryFn: getBookmarkedMovies,
  });
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (id && query.data) {
      if (checkIsBookmarked()) {
        !isBookmarked && setIsBookmarked(true);
      } else {
        isBookmarked && setIsBookmarked(false);
      }
    }
  }, [query]);
  function checkIsBookmarked() {
    return Boolean(
      query.data?.find((movie: Movie) => {
        return movie.tmdbId === id;
      })
    );
  }
  async function toggleBookmark() {
    if (id) {
      await patchBookmark(id, !checkIsBookmarked());
      query.refetch();
    }
  }
  return { query, isBookmarked, toggleBookmark };
}
