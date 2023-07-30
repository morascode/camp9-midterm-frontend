import { QRCodeSVG } from 'qrcode.react';
import { Link, useParams } from 'react-router-dom';
import { AddToCalendarButton } from 'add-to-calendar-button-react';
import Button from '../components/Button';
import { useGetMovieDetails } from '../hooks/useMovies';
import { useBookingQuery } from '../hooks/useBookingUser';
import { da } from 'date-fns/locale';
import UseAnimations from 'react-useanimations';
import loading from 'react-useanimations/lib/loading';

function Ticket() {
  const { bookingId, movieId } = useParams<{
    bookingId: string;
    movieId: string;
  }>();
  const { isLoading, data } = useBookingQuery(bookingId!);
  const { isLoading: isLoadingMovie, data: movieData } = useGetMovieDetails(
    +movieId!
  );
  if (isLoading || isLoadingMovie || !movieData || !data) {
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
    <div className="min-h-screen flex flex-col items-center py-8 px-5">
      {/* This div holds the ticket and the button. the flex makes the ticket responsive to different phones */}
      <div className="grow grid w-full content-between bg-[#494952] dark:bg-white rounded-[12px] items-center">
        {' '}
        {/* This div holds the ticket information and the "grow" is making the ticket responsive */}
        <div>
          {/* This div holds the movie poster and the movie information. it is needed in order to place the poster and the data together */}
          <img
            src={`https://image.tmdb.org/t/p/w500${movieData.backdropPath}`}
            alt="Movie Poster"
            className="rounded-t-[12px]  object-cover w-full h-[160px]"
          />

          <div className="grid">
            {/* This grid holds the Ticket information */}
            <h2 className="typography-title dark:text-dark-light pt-2 pb-6 px-6">
              {movieData.title}
            </h2>

            <div className="flex justify-between px-6 ">
              {/* This div holds the Date, Time, Price zusammen. It does not include Seats */}
              <div className="grid">
                <span className="text-xs font-medium">Date</span>
                <p className="font-semibold text-white dark:text-dark">
                  {data.screening.date}
                </p>
              </div>
              <div className="grid">
                <span className="text-xs font-medium">Time</span>
                <p className="font-semibold text-white dark:text-dark">
                  {data.screening.time}
                </p>
              </div>
              <div className="grid">
                <span className="text-xs font-medium">Price</span>
                <p className="font-semibold text-white dark:text-dark">
                  {(+data.totalPrice).toFixed(2)}
                </p>
              </div>
            </div>
            <div className="flex pt-2 px-6 place-content-between ">
              <div className="grid">
                <span className="text-xs font-medium">Seats</span>
                <p className="font-semibold text-white dark:text-dark">
                  {data.seats
                    .map((seat: any) => {
                      return `${seat.row}-${seat.number}`;
                    })
                    .join(', ')}
                </p>
              </div>
              <div className="grid justify-items-center  ">
                {' '}
                <span className="text-xs font-medium  dark:text-dark">
                  Save to Calendar
                </span>
                <AddToCalendarButton
                  size="1|1|1"
                  listStyle="modal"
                  availability="busy"
                  hideTextLabelButton
                  buttonStyle="round"
                  name="Super Mario Bros."
                  description="Movie time at Devhaus Cinema!🍿 https://devhauscinema.com"
                  options={['Apple', 'Google', 'Outlook.com|Outlook']}
                  location="Devhaus, Flossplatz 6, 04107 Leipzig Germany"
                  startDate="2023-04-29"
                  endDate="2023-04-29"
                  startTime="10:15"
                  endTime="23:30"
                  timeZone="Europe/Berlin"
                ></AddToCalendarButton>
              </div>
            </div>
          </div>
        </div>
        <div>
          {/* This div puts the barcode, the line and the circle in the end of the ticket. */}
          <hr className="translate-y-8 border-dashed" />
          <div className="flex justify-between items-center">
            {/* This div holds the circles in the end of the ticket */}
            <span className="-translate-x-6 translate-y-2.5 w-12 h-12 rounded-full bg-dark dark:bg-white"></span>
            <span className="translate-x-6 translate-y-2.5 w-12 h-12 rounded-full bg-dark dark:bg-white"></span>
          </div>
          <div className="flex justify-center pb-3">
            <QRCodeSVG
              value={`name:x;date:y;time:z;movieId:a;seats:b;price:c;`}
            />
          </div>
        </div>
      </div>
      <div className="w-full pt-5">
        <Link to="/">
          <Button>Back To Home</Button>
        </Link>
      </div>
    </div>
  );
}

export default Ticket;
