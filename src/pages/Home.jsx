import Hero from '../components/home/Hero';
import Featured from '../components/home/Featured';
import Latest from '../components/home/Latest';

const Home = () => {
  return (
    <section className="container mx-auto p-4 md:px-6 lg:px-24 py-16">
      <Hero /> 
      <Featured />
      <Latest />
    </section>
  );
};

export default Home;