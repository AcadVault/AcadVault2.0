import { MATERIAL_CATEGORIES } from '@/lib/constants'
import BrowseCard from '@/components/BrowseCard'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { PiExam } from 'react-icons/pi'
import { MdOutlineAssignment } from 'react-icons/md'
import { GiEvilBook } from 'react-icons/gi'

const iconList = {
    Exams: <PiExam />,
    Lectures: <FaChalkboardTeacher />,
    Assignments: <MdOutlineAssignment />,
    'Reference Books': <GiEvilBook />,
}

const MaterialCategoryListPage = ({ params }) => {
    const categoryCode = params.categoryCode
    const courseName = decodeURIComponent(params.courseName)

    const materialCategoryList = []
    for (const key in MATERIAL_CATEGORIES)
        materialCategoryList.push(MATERIAL_CATEGORIES[key])

    return (
        <div className="grid gap-2 md:gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mx-auto">
            {materialCategoryList.map((category, index) => {
                return (
                    <BrowseCard
                        key={index}
                        href={`/browse/${categoryCode}/${courseName}/${category}`}
                    >
                        <div className="flex flex-col items-center">
                            <div className=" text-6xl md:text-7xl mb-5">
                                {iconList[category]}
                            </div>
                            <div className="card-text-2">{category}</div>
                        </div>
                    </BrowseCard>
                )
            })}
        </div>
    )
}

export default MaterialCategoryListPage
