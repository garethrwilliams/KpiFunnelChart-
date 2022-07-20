import { useContext } from 'react';
import { StaffContext } from '../contexts/Data';

export default function Sidebar() {
  const { staff, setDataQuery } = useContext(StaffContext);

  const handleSelection = (e) => {
    e.preventDefault();
    setDataQuery(e.target.textContent);
  };

  return (
    <aside className='w-64' aria-label='Sidebar'>
      <div className='border border-red-400'>
        <button className='hover:text-gray-400' onClick={handleSelection}>
          Company
        </button>
        {Object.keys(staff).map((team) => {
          return (
            <div className='ml-6 my-4 flex flex-col'>
              <button
                className='hover:text-gray-300 text-left'
                onClick={handleSelection}
                key={team}
              >
                {team ? team : 'Unassigned'}
              </button>

              {staff[team].map((staff) => {
                return (
                  <button
                    className='ml-12 hover:text-gray-300 flex-col'
                    onClick={handleSelection}
                    key={staff}
                  >
                    {staff}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
