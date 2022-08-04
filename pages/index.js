import EventList from '../components/events/EventList';
import { getFeaturedEvents } from '../dummy-data';

const HomePage = () => {
  const featuredEvents = getFeaturedEvents();

  console.log(featuredEvents);
  return <EventList items={featuredEvents} />;
};

export default HomePage;
