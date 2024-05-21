import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }
  
  const menuItems = [
    { label: '00 - 05s' },
    { label: '05 - 10s' },
    { label: '10 - 15s' },
    { label: '15 - 20s' },
    { label: '20 - 25s' },
    { label: '25 - 30s' },
    { label: '30 - 35s' },
    { label: '35 - 40s' },
    { label: '40 - 45s' },
    { label: '45 - 50s' },
    { label: '50 - 55s' },
    { label: '55 - 60s' },
  ];
  

function TimeStampdropdown() {
    return (
        <Menu as="div" className="ml-52 mt-32 relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-ful hover:border-none focus:border-none focus:outline-none justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ">
              <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
            </Menu.Button>
          </div>
    
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-24 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {menuItems.map((item, index) => (
                  <Menu.Item key={index}>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block px-4 py-2 text-sm hover:text-darkGreen'
                        )}
                      >
                        {item.label}
                      </a>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      );
}

export default TimeStampdropdown