import { useRef } from 'react';

const Dropdown = () => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className="relative cursor-pointer">
        <div
          ref={ref}
          className="absolute -bottom-32 -left-28  bg-gray-700 border  border-gray-100 z-50 w-[160px] rounded-lg shadow"
        >
          <div className="flex flex-col text-gray-200">
            <div className="px-4 py-2 hover:bg-gray-600" >
              Profile
            </div>
            <div className="px-4 py-2 hover:bg-gray-600" >
              Settings
            </div>
            <div className="px-4 py-2 hover:bg-gray-600" onClick={() => {
                localStorage.removeItem("token")
                window.location.reload()
            }}>
              Logout
            </div>
          </div>
        </div>
    </div>
  );
};

export default Dropdown;
