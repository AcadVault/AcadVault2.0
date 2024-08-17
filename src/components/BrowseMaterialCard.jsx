import BrowseCard from "@/components/BrowseCard";
import { MATERIAL_TYPES } from "@/lib/constants";
import { formatDate, openFile } from "@/lib/client-helper-functions";
import { GoVerified } from "react-icons/go";

const BrowseMaterialCard = ({ data }) => {
    const formattedDate = formatDate(data.createdAt);
    const handleClick = () => { openFile(data.fileID); };

    return (
        <div>
            <BrowseCard>
                <div className="flex flex-col max-w-full max-h-full overflow-y-scroll no-scrollbar" onClick={handleClick}>
                    <div className="card-text-6 mb-2">{data.courseName}</div>
                    {[MATERIAL_TYPES.ASSIGNMENT_QUESTIONS, MATERIAL_TYPES.ASSIGNMENT_SOLUTION,].includes(data.materialType) && (
                        <div>
                            <div className="card-text-3">Assignment-{data.number}</div>
                            <div className="card-text-5">{data.materialType.split(" ")[1]}</div>
                        </div>
                    )}
                    {data.exam && (
                        <div>
                            <div className="card-text-3">{data.exam}</div>
                            <div className="card-text-5">{data.materialType.substring(5)}</div>
                        </div>
                    )}
                    {data.materialType === MATERIAL_TYPES.REFERENCE_BOOK && (
                        <div className="card-text-4 overflow-y-scroll no-scrollbar break-words">{data.referenceBookName}</div>
                    )}
                    {data.materialType === MATERIAL_TYPES.LECTURE_SLIDES && (
                        <div>
                            <div className="card-text-3">Lecture-{data.number}</div>
                            <div className="card-text-5">Slides</div>
                        </div>
                    )}
                    {data.materialType === MATERIAL_TYPES.HANDWRITTEN_NOTES && (
                        <div className="card-text-3">
                            <div className="flex flex-col">
                                <span>Handwritten</span>
                                <span>Notes</span>
                            </div>
                        </div>
                    )}
                    {data.year && <div className="card-text-4 mt-3">{data.year}</div>}
                    <div className="flex card-text-6 mt-3 items-center justify-center gap-1">
                        <span><GoVerified className="w-3 h-3 opacity-60" strokeWidth="1.5" stroke="#6370ff" /></span>
                        <span>Approved on {formattedDate}</span>
                    </div>
                </div>
            </BrowseCard>
        </div>
    );
};

export default BrowseMaterialCard;