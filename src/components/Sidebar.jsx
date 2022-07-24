import { useContext } from 'react';
import { StaffContext } from '../contexts/Data';
import { useState } from 'react';

export default function Sidebar() {
  const { staff, setDataQuery, compare } = useContext(StaffContext);
  const [openMenu, setOpenMenu] = useState(null);

  const handleTeamSelection = (e) => {
    e.preventDefault();

    // Hide/show team members
    if (openMenu === parseInt(e.target.id)) {
      setOpenMenu(null);
    } else {
      setOpenMenu(e.target.textContent);
    }

    // Set data query
    compare
      ? setDataQuery((queryObj) => {
          const newQueryObj = { ...queryObj };
          newQueryObj.comparison = e.target.textContent;
          return newQueryObj;
        })
      : setDataQuery((queryObj) => {
          const newQueryObj = { ...queryObj };
          newQueryObj.main = e.target.textContent;
          return newQueryObj;
        });
  };

  const handleIndividualSelection = (e) => {
    compare
      ? setDataQuery((queryObj) => {
          const newQueryObj = { ...queryObj };
          newQueryObj.comparison = e.target.textContent;
          return newQueryObj;
        })
      : setDataQuery((queryObj) => {
          const newQueryObj = { ...queryObj };
          newQueryObj.main = e.target.textContent;
          return newQueryObj;
        });
  };

  return (
    <aside className='w-64 h-96 mt-12' aria-label='Sidebar'>
      <div className='border border-red-400 pl-4'>
        <button className='hover:text-gray-400' onClick={handleTeamSelection}>
          Company
        </button>
        {Object.keys(staff).map((team) => {
          return (
            <div className='ml-6 my-4 flex flex-col'>
              <button
                className='hover:text-gray-300 text-left'
                onClick={handleTeamSelection}
                key={team}
                id={team}
              >
                {team ? team : 'Unassigned'}
              </button>

              {staff[team].map((staff) => {
                return (
                  <button
                    className={`ml-12 hover:text-gray-300 flex-col ${
                      openMenu === team ? 'visible' : 'hidden'
                    }`}
                    onClick={handleIndividualSelection}
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
