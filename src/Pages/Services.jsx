import BackButton from "../UI/BackButton";
import CarWashServicesCard from "../UI/CarWashServicesCard";

function Packages() {
  const { servicesData, pendingServices } = useServices();

  return (
    <section className=" max-w-[1440px] mx-auto w-[90%]">
      <div className="min-h-screen  ">
        <div className="relative pt-8   flex flex-col items-center">
          <div className="   absolute left-12 top-8 md:opacity-100 opacity-0 ">
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
          <div className="flex w-full flex-wrap ">
            {servicesData && servicesData.length > 0 ? (
              servicesData.map((service) => (
                <CarWashServicesCard key={service._id} service={service} />
              ))
            ) : (
              <p className="text-center text-gray-500">
                There are no packages available.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Packages;
