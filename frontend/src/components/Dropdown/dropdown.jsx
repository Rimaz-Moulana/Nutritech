import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function Dropdown() {
  return (
    <Menu as="div" className="ml-56 mt-16 relative inline-block text-left">
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-backgroundGreen text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm  hover:text-darkGreen'
                  )}
                >
                  All Videos
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-backgroundGreen text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm hover:text-darkGreen'
                  )}
                >
                  Annotated Videos
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={classNames(
                    active ? 'bg-backgroundGreen text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm  hover:text-darkGreen'
                  )}
                >
                  Unannotated Videos
                </a>
              )}
            </Menu.Item>
            
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default Dropdown