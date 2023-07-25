import axios, { AxiosError } from 'axios';
import { Booking, BookingResponse } from '../utilities/types';
import { useMutation, useQuery } from '@tanstack/react-query';

async function bookingsUser(bookings: Booking) {
  const { data } = await axios.post(
    `${import.meta.env.VITE_SERVER_URL}/api/1.0/user/booking`,
    bookingsUser
  );
  return data;
}

async function getBooking(bookingId: string) {
  const { data } = await axios.get<any>(
    `${import.meta.env.VITE_SERVER_URL}/api/1.0/booking/${bookingId}`,
    { withCredentials: true }
  );
  return data;
}

export function useBookingMutation() {
  const mutiation = useMutation<BookingResponse, AxiosError, Booking>({
    mutationFn: bookingUser => bookingsUser(bookingUser),
  });

  return mutiation;
}

export function useBookingQuery(bookingId: string) {
  const query = useQuery({
    queryKey: ['booking', bookingId],
    queryFn: () => getBooking(bookingId),
  });
  return query;
}
