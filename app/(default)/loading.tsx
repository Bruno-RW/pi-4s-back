import Loader from "@/components/ui/custom/Loader";

const Loading = () => {
  return ( 
    <div className="flex h-full w-full items-center justify-center mt-32">
      <Loader />
    </div>
  );
};

export default Loading;