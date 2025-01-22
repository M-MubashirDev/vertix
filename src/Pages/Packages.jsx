import { UsegetStationsPackages } from "../Hooks/Admin/useServiceStations";
import BackButton from "../UI/BackButton";
import CarWashServicesCard from "../UI/CarWashServicesCard";

function Packages() {
  const { dataPackages, pendingPackage } = UsegetStationsPackages(); // Fetch data using your custom hook

  return (
    <section>
      <div className="min-h-screen">
        <div className="relative pt-8 flex flex-col items-center">
          <div className="absolute left-0 top-8 md:opacity-100 opacity-0">
            <BackButton />
          </div>

          <div className="flex flex-col items-center">
            <h2 className="lg:text-2xl md:text-xl text-lg text-primary tracking-widest">
              Washing Packages
            </h2>
            <h1 className="lg:text-4xl md:text-3xl text-2xl mb-4 font-bold text-primary-dark">
              Admin-Provided Packages
            </h1>
            <p className="font-semibold tracking-wider text-center text-xl mb-8">
              &quot;A glance at the care provided, services at their best.&quot;
            </p>
          </div>

          {pendingPackage ? (
            <p className="text-center text-gray-500">Loading packages...</p>
          ) : dataPackages && dataPackages.length > 0 ? (
            dataPackages.map((service) => (
              <CarWashServicesCard key={service._id} service={service} />
            ))
          ) : (
            <p className="text-center text-gray-500">
              There are no packages available.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Packages;
