export default function NavigationBar({
  title
}:{
  title: string
}) {
  return (
    <div className="navbar border-b px-6">
      <div className="navbar-start">
        <h1 className="text-xl font-bold">{title}</h1>
      </div>
      <div className="navbar-end">
        <a className="btn btn-ghost" href="https://mitaka.boo.jp" target="_blank">Blog</a>
      </div>
    </div>
  );
}
