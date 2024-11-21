"use client";

import { useEffect, useState } from "react";
import FileUploader from "@/components/(new-material)/FileUploader";
import { EXAMS, MATERIAL_TYPES } from "@/lib/constants";
import { useRouter } from "next/navigation";
import Loading from "@/components/(layout)/Loading";
import { toast } from "react-hot-toast";
import { PiUploadSimpleBold } from "react-icons/pi";
import { Helmet } from "react-helmet";

export default function NewMaterialPage() {
    const router = useRouter();
    const [file, setFile] = useState(null);

    const materialsList = [];
    const yearsList = [];
    const examsList = [];
    const [coursesList, setCoursesList] = useState(null);

    for (const key in MATERIAL_TYPES) materialsList.push(MATERIAL_TYPES[key]);
    for (const key in EXAMS) examsList.push(EXAMS[key]);
    for (let i = 2009; i <= new Date().getFullYear(); i++) yearsList.push(i);

    const [courseName, setCourseName] = useState(null);
    const [materialType, setMaterialType] = useState(materialsList[0]);
    const [isUploading, setIsUploading] = useState(false);

    const fetchCourses = async () => {
        try {
            const response = await fetch("api/courses?courseName=*");
            const data = await response.json();
            setCoursesList(data.data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    if (coursesList === null) return <Loading />;

    const uploadData = async (e) => {
        try {
            const formData = new FormData(e.target);
            formData.append("file", file);
            formData.set("materialType", materialType);
            setIsUploading(true);
            const response = await fetch("/api/requests", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            if (!data.success) throw new Error(data.error);
        } catch (e) {
            console.log(e);
            throw e;
        } finally {
            e.target.reset();
            setFile(null);
            setIsUploading(false);
            setCourseName(null);
            setMaterialType(materialsList[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            toast.error("file not selected");
            return;
        }
        toast.promise(
            uploadData(e),
            {
                loading: "Uploading...",
                success: <b>Material requested successfully!</b>,
                error: <b>Could not upload</b>,
            },
            {
                success: {
                    duration: 2000,
                    icon: "👏",
                },
                error: {
                    duration: 2000,
                    icon: "😞",
                },
            }
        );
    };

    return (
        <div className="left-0 top-0 -z-10 h-full w-full">
            <Helmet>
                <title>New Material | AcadVault2.0</title>
                <meta name="description" content="Request new academic material for DA-IICT" />
            </Helmet>
            <div className="flex items-center justify-center text-white my-10">
                <div className="mx-auto w-11/12 sm:w-3/4 md:w-2/3 xl:w-1/2">
                    <form onSubmit={handleSubmit}>
                        <FileUploader file={file} setFile={setFile} />
                        <div className="mb-5">
                            <label htmlFor="courseName" className="mb-3 block text-base font-medium">Which course does this material belong?</label>
                            <select id="courseName" name="courseName" className="w-full rounded-md appearance-none border border-[#e0e0e0] bg-transparent py-3 px-6 text-base font-medium text-[#a4b0c6] outline-none focus:border-[#6A64F1] focus:shadow-md" onChange={(e) => setCourseName(e.target.value)}>{[...coursesList.map(({ courseName }, index) => { return (<option value={courseName} key={index} className="text-[#676c79]">{courseName}</option>); }), <option value="Other" key={coursesList.length} className="text-[#676c79]">Other</option>,]}</select>
                        </div>
                        {courseName === "Other" && (
                            <div className="-mt-3 mb-5 ml-3">
                                <input name="otherCourseName" placeholder="Specify Course Name" className="w-full rounded-md appearance-none border border-[#e0e0e0] bg-transparent py-3 px-6 text-base font-medium text-[#a4b0c6] outline-none focus:border-[#6A64F1] focus:shadow-md" required />
                            </div>
                        )}
                        <div className="mb-5">
                            <label className="mb-3 block text-base font-medium ">Which type of material is it?</label>
                            <select id="materialType" name="materialType" className="w-full rounded-md appearance-none border border-[#e0e0e0] bg-transparent py-3 px-6 text-base font-medium text-[#a4b0c6] outline-none focus:border-[#6A64F1] focus:shadow-md" onChange={(e) => setMaterialType(e.target.value)}>{materialsList.map((_materialType, index) => { return (<option value={_materialType} key={index} className="text-[#676c79]">{_materialType}</option>); })}</select>
                        </div>
                        {materialType === MATERIAL_TYPES.REFERENCE_BOOK ? (
                            <div className="mb-5">
                                <label className="mb-3 block text-base font-medium ">Reference Book Name</label>
                                <input type="text" name="referenceBookName" placeholder="Reference Book Name (with author)" className="w-full rounded-md border border-[#e0e0e0] bg-transparent py-3 px-6 text-base font-medium text-[#a4b0c6] placeholder:opacity-50 outline-none focus:border-[#6A64F1] focus:shadow-md" required />
                            </div>
                        ) : (
                            <div>
                                <div className="mb-5">
                                    <label className="mb-3 block text-base font-medium ">Of which year?</label>
                                    <select name="year" className="w-full rounded-md appearance-none border border-[#e0e0e0] bg-transparent py-3 px-6 text-base font-medium text-[#a4b0c6] outline-none focus:border-[#6A64F1] focus:shadow-md">{yearsList.map((year, index) => { return (<option value={year} key={index} className="text-[#676c79]">{year}</option>); })}</select>
                                </div>
                                {(materialType === MATERIAL_TYPES.ASSIGNMENT_QUESTIONS || materialType === MATERIAL_TYPES.ASSIGNMENT_SOLUTION) && (
                                    <div className="mb-5">
                                        <label className="mb-3 block text-base font-medium ">Which Lab/Tutorial?</label>
                                        <select name="number" className="w-full rounded-md appearance-none border border-[#e0e0e0] bg-transparent py-3 px-6 text-base font-medium text-[#a4b0c6] outline-none focus:border-[#6A64F1] focus:shadow-md">{[...Array(15).keys()].map((i) => { return (<option value={i + 1} key={i + 1} className="text-[#676c79]">{i + 1}</option>); })}</select>
                                    </div>
                                )}
                                {(materialType === MATERIAL_TYPES.EXAM_QUESTION_PAPER || materialType === MATERIAL_TYPES.EXAM_PAPER_SOLUTION) && (
                                    <div className="mb-5">
                                        <label className="mb-3 block text-base font-medium ">Which Exam?</label>
                                        <select name="exam" className="w-full rounded-md appearance-none border border-[#e0e0e0] bg-transparent py-3 px-6 text-base font-medium text-[#a4b0c6] outline-none focus:border-[#6A64F1] focus:shadow-md">{examsList.map((exam, index) => { return (<option value={exam} key={index} className="text-[#676c79]">{exam}</option>); })}</select>
                                    </div>
                                )}
                                {materialType === MATERIAL_TYPES.LECTURE_SLIDES && (
                                    <div className="mb-5">
                                        <label className="mb-3 block text-base font-medium ">Which Lecture?</label>
                                        <input type="text" name="number" placeholder="Enter Lecture number or Range (e.g. 1 to 5)" className="w-full rounded-md border border-[#e0e0e0] bg-transparent py-3 px-6 text-base font-medium text-[#a4b0c6] outline-none focus:border-[#6A64F1] focus:shadow-md" required/>
                                    </div>
                                )}
                            </div>
                        )}
                        <div className="flex justify-center content-center mt-10">
                            <button type="submit" disabled={isUploading} className=" inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white text-white focus:ring-4 focus:outline-none focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed">
                                <span className="inline-flex items-center px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0"><PiUploadSimpleBold className="w-4 h-4 me-2" />Submit</span>
                            </button>
                            <button type="button" onClick={() => router.back()} className="inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white text-white focus:ring-4 focus:outline-none focus:ring-blue-800">
                                <span className="inline-flex items-center px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">Cancel</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}