import { getAllEvents } from '../../dummy-data';
import EventList from '../../components/events/EventList';

const AllEventPage = () => {
  const events = getAllEvents();
  return (
    <div>
      <EventList items={events} />
    </div>
  );
};

export default AllEventPage;
