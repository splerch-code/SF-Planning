import React from 'react'
import AddBuildingForm from './AddBuildingForm'

const Header = ({ addBuilding, sfData }) => {
    return (
        <div className='w-full bg py-6 bg-sf-dark px-6 container mx-auto flex items-center absolute top-0 left-0 z-10'>
            <div className="flex-none text-xl text-sf mr-4">
                Satisfactory Planner
            </div>
            <div className="flex-none">
                <AddBuildingForm addBuilding={addBuilding} sfData={sfData} />
            </div>

        </div>
    )
}

export default Header