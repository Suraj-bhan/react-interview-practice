"use client"
import React from 'react'
import Popover from './Tooltip'

const page = () => {
    return (
        <div className='page flex flex-col h-full justify-center gap-4'>
            <Popover
                trigger="click"
                placement="top"
                content={
                    <div>
                        <p>Popover content</p>
                        <button>Action</button>
                    </div>
                }
            >
                <button className="border px-3 py-1">Click me</button>
            </Popover>
            <Popover content="This is a tooltip">
                <button className="border px-3 py-1">Hover me</button>
            </Popover>
        </div>
    )
}

export default page