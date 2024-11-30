export default function SkeletonMylists() { 
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 animate-fadein-up-20">
      <MylistCardSkeleton />
      <MylistCardSkeleton />
      <MylistCardSkeleton />
      <MylistCardSkeleton />
      <MylistCardSkeleton />
    </div>
  );
}

function MylistCardSkeleton() {
  return (
    <div className="card card-bordered border-base-content/10">
      <div className="card-body p-6 pb-4">
        <h3 className="card-title">
          <div className="skeleton w-60 max-w-full h-8"></div> 
        </h3>
        <div className="skeleton w-20 max-w-full h-4"></div>
        <div className="skeleton w-28 max-w-full h-4 self-end"></div>
      </div>
      <figure>
        <div className="w-full grid grid-cols-3 gap-x-1">
          <div className="skeleton aspect-square w-full rounded-none"></div>
          <div className="skeleton aspect-square w-full rounded-none"></div>
          <div className="skeleton aspect-square w-full rounded-none"></div>
        </div>        
      </figure>
    </div>
  );
}
