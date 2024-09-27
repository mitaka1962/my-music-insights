export default function SkeletonInfo() {
  return (
    <div className="flex flex-col gap-4 p-4 animate-skeleton-fadein">
      <div className="flex gap-4">
        <div className="flex-none w-1/3 max-w-[260px]">
          <div className="skeleton pt-[100%] w-full"></div>
        </div>
        <div className="grow w-2/3 card card-bordered bg-base-100 min-h-[260px]">
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
