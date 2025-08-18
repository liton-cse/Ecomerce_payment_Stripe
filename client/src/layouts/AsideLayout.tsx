interface AsideProps {
  children: React.ReactNode;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
}

function Aside({ children, leftContent }: AsideProps) {
  return (
    <div className="flex flex-col lg:flex-row p-1 mt-20  gap-2 sm:gap-4">
      {/* <aside className="hidden md:block lg:w-64 xl:w-80 2xl:w-96 bg-gray-50  rounded shadow">
        {leftContent}
      </aside> */}

      <section className="flex- sm:p-3 lg:p-4 bg-white rounded shadow min-w-0">
        {children}
      </section>

      <aside className="hidden xl:block xl:w-80 2xl:w-1/4 bg-gray-50 p-2  rounded shadow">
        {leftContent}
      </aside>
    </div>
  );
}
export default Aside;
