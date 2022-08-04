import { getAllEvents } from '../../dummy-data';
import { Fragment } from 'react';
import EventList from '../../components/events/EventList';
import EventsSearch from '../../components/events/EventsSearch';

const AllEventPage = () => {
  const events = getAllEvents();
  return (
    <Fragment>
      <EventsSearch />
      <EventList items={events} />
    </Fragment>
  );
};

export default AllEventPage;
