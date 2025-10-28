import Hero from '../components/home/Hero';
import AboutSection from '../components/home/AboutSection';
import ApproachSection from '../components/home/ApproachSection';
import FeaturedWork from '../components/home/FeaturedWork';
import Publications from '../components/home/Publications';
import LatestBlog from '../components/home/LatestBlog';
import FinalCTA from '../components/home/FinalCTA';

const Home = () => {
  return (
    <div>
      <Hero />
      <AboutSection />
      <ApproachSection />
      <FeaturedWork />
      <Publications />
      <LatestBlog />
      <FinalCTA />
    </div>
  );
};

export default Home;
