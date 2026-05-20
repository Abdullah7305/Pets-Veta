// import Sidebar from "./Sidebar";

// interface Props {
//   open: boolean;
//   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const MobileSidebar = ({ open, setOpen }: Props) => {
//   return (
//     <>
//       {/* BACKDROP */}
//       {open && (
//         <div
//           className="fixed inset-0 bg-black/40 z-40 lg:hidden"
//           onClick={() => setOpen(false)}
//         />
//       )}

//       {/* SIDEBAR */}
//       <div
//         className={`
//         fixed top-0 left-0 h-screen w-[220px]
//         bg-white z-50 shadow-xl
//         transition-all duration-300

//         ${open ? "translate-x-0" : "-translate-x-full"}

//         lg:hidden
//       `}
//       >
//         <Sidebar />
//       </div>
//     </>
//   );
// };

// export default MobileSidebar;
import Sidebar from "./Sidebar";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileSidebar = ({ open, setOpen }: Props) => {
  return (
    <>
      {/* BACKDROP */}
      {open && (
        <div
          className="
          fixed inset-0
          bg-black/40
          z-40
          lg:hidden
        "
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`
        fixed top-0 left-0
        h-screen
        w-[220px]
        bg-white
        z-50
        shadow-2xl
        transition-transform duration-300 ease-in-out

        ${open ? "translate-x-0" : "-translate-x-full"}

        lg:hidden
      `}
      >
        <Sidebar />
      </div>
    </>
  );
};

export default MobileSidebar;
