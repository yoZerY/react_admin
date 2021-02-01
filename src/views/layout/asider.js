import React, { Fragment } from 'react'
import AsiderMenu from './asideMenu'
export default function Asider({ collapsed }) {
    return (
        <Fragment>
            <div className="logo">
                {
                    collapsed ? 'Y' : 'Y Admin'
                }
            </div>
            <AsiderMenu />
        </Fragment>
    )
}
