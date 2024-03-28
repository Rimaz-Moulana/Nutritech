import React from 'react'
import { Dropdown as FlowbiteDropdown} from 'flowbite-react';

function annotatorvideosdropdown() {

  return (
    <div className="flex flex-wrap gap-4 w-7 mr-0">
    <FlowbiteDropdown className='w-52 border-hidden' placement="right-start" label={<img src={video} alt="Menu" className='h-8 w-8 ml-3' />}>
              <FlowbiteDropdown.Item>All Videos</FlowbiteDropdown.Item>
              <FlowbiteDropdown.Item>Annotated Videos</FlowbiteDropdown.Item>
              <FlowbiteDropdown.Item>Unannotated Videos</FlowbiteDropdown.Item>
            </FlowbiteDropdown>
    <Dropdown/>
    </div>
  )
}

export default annotatorvideosdropdown
