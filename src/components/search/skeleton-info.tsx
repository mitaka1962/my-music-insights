export default function SkeletonInfo() {
  return (
    <div className="flex flex-col gap-4 p-4 animate-skeleton-fadein">
      <div className="flex gap-4">
        <div className="flex-none skeleton h-[240px] w-[240px]"></div>
        <div className="grow  card card-bordered bg-base-100 min-h-[240px]">
          <div className="card-body">
            <div className="skeleton h-12 w-full"></div>
            <div className="flex flex-col gap-3 mt-3">
                <div className="skeleton h-5 w-52"></div>
                <div className="skeleton h-5 w-44"></div>
                <div className="skeleton h-5 w-32"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="card card-bordered">
        <div className="card-body">
          <div className="skeleton h-8 w-96 rounded-xl"></div>
          <div className="grid grid-cols-2 gap-10 mt-8">
            <div className="skeleton h-5 w-full"></div>
            <div className="skeleton h-5 w-full"></div>
            <div className="skeleton h-5 w-full"></div>
            <div className="skeleton h-5 w-full"></div>
            <div className="skeleton h-5 w-full"></div>
            <div className="skeleton h-5 w-full"></div>
            <div className="skeleton h-5 w-full"></div>
          </div>
        </div>      
      </div>
    </div>
  );
}
