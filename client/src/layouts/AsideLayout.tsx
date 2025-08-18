interface AsideProps {
  children: React.ReactNode;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
}
import { useLocation } from "react-router-dom";
function Aside({ children, leftContent }: AsideProps) {
  const location = useLocation();
  const isHome = location.pathname === "/";
  return (
    <div className="p-1 mt-20">
      {/* <aside className="hidden md:block lg:w-64 xl:w-80 2xl:w-96 bg-gray-50  rounded shadow">
        {leftContent}
      </aside> */}
      {isHome ? (
        <div className="flex flex-col lg:flex-row   gap-2 sm:gap-4">
          <section className="flex- sm:p-3 lg:p-4 bg-white rounded shadow min-w-0">
            {children}
          </section>
          <aside className="hidden xl:block xl:w-80 2xl:w-1/4 bg-gray-50rounded">
            {leftContent}
          </aside>
        </div>
      ) : (
        <section className="flex- sm:p-3 lg:p-4 bg-white rounded shadow min-w-0">
          {children}
        </section>
      )}
    </div>
  );
}
export default Aside;
