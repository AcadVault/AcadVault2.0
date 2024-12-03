"use client";

import { useEffect, useState } from "react";
import FileUploader from "@/components/(new-material)/FileUploader";
import { EXAMS, MATERIAL_TYPES } from "@/lib/constants";
import { useRouter } from "next/navigation";
import Loading from "@/components/(layout)/Loading";
import { toast } from "react-hot-toast";
import { Upload } from "lucide-react";
import { Helmet } from "react-helmet";

export default function NewMaterialPage() {
    const router = useRouter();
    const [file, setFile] = useState(null);

    const materialsList = Object.values(MATERIAL_TYPES);
    const yearsList = Array.from({ length: new Date().getFullYear() - 2009 + 1 }, (_, i) => i + 2009);
    const examsList = Object.values(EXAMS);

    const [coursesList, setCoursesList] = useState(null);
    const [courseName, setCourseName] = useState(null);
    const [materialType, setMaterialType] = useState(materialsList[0]);
    const [isUploading, setIsUploading] = useState(false);

    const fetchCourses = async () => {
        try {
            const response = await fetch("/api/courses?courseName=*");
            const data = await response.json();
            setCoursesList(data.data);
        } catch (e) {
            console.error("Error fetching courses:", e);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    if (coursesList === null) return <Loading />;

    const checkMaterial = async (formData) => {
        try {
            const response = await fetch("/api/check-material", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    courseName: formData.get("courseName") || formData.get("otherCourseName"),
                    materialType: formData.get("materialType"),
                    year: formData.get("year"),
                    number: formData.get("number"),
                    exam: formData.get("exam"),
                }),
            });
            return await response.json();
        } catch (error) {
            console.error("Error checking material:", error);
            return { success: false, exists: false };
        }
    };

    const uploadData = async (e) => {
        try {
            const formData = new FormData(e.target);
            formData.append("file", file);
            formData.set("materialType", materialType);

            const checkResult = await checkMaterial(formData);

            if (checkResult.exists) {
                toast.error(`Material already exists in ${checkResult.type === "APPROVED" ? "Approved" : "Unapproved"} materials!`);
                return;
            }

            setIsUploading(true);
            const response = await fetch("/api/requests", { method: "POST", body: formData });
            const data = await response.json();

            if (!data.success) throw new Error(data.message || data.error);

            toast.success("Material requested successfully!");
        } catch (error) {
            console.error("Upload failed:", error);
            toast.error("Could not upload material.");
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
            toast.error("File not selected");
            return;
        }

        uploadData(e);
    };

    return (
        <div className="left-0 top-0 -z-10 h-full w-full">
            <Helmet>
                <title>New Material | AcadVault2.0</title>
                <meta name="description" content="Request new academic material for DA-IICT" />
            </Helmet>
            <div className="flex items-center justify-center my-10">
                <div className="mx-auto w-11/12 sm:w-3/4 md:w-2/3 xl:w-1/2 border rounded-lg p-6 bg-white border-gray-400">
                    <form onSubmit={handleSubmit}>
                        <FileUploader file={file} setFile={setFile} />
                        <div className="mb-5">
                            <label htmlFor="courseName" className="mb-3 block text-base font-medium">Course</label>
                            <select id="courseName" name="courseName" className="w-full rounded-md appearance-none border border-gray-700 bg-transparent py-3 px-6 text-base font-medium outline-none" onChange={(e) => setCourseName(e.target.value)}>{[...coursesList.map(({ courseName }, index) => (<option value={courseName} key={index} className="text-[#676c79]">{courseName}</option>)), <option value="Other" key={coursesList.length} className="text-[#676c79]">Other</option>]}</select>
                        </div>
                        {courseName === "Other" && (
                            <div className="-mt-3 mb-5 ml-3">
                                <input name="otherCourseName" placeholder="Specify Course Name" className="w-full rounded-md appearance-none border border-gray-700 bg-transparent py-3 px-6 text-base font-medium outline-none " required />
                            </div>
                        )}
                        <div className="mb-5">
                            <label className="mb-3 block text-base font-medium">Material Type</label>
                            <select id="materialType" name="materialType" className="w-full rounded-md appearance-none border border-gray-700 bg-transparent py-3 px-6 text-base font-medium outline-none" onChange={(e) => setMaterialType(e.target.value)}>{materialsList.map((_materialType, index) => (<option value={_materialType} key={index} className="text-[#676c79]">{_materialType}</option>))}</select>
                        </div>
                        {materialType === MATERIAL_TYPES.REFERENCE_BOOK ? (
                            <div className="mb-5">
                                <label className="mb-3 block text-base font-medium ">Reference Book Name</label>
                                <input type="text" name="referenceBookName" placeholder="Reference Book Name (with author)" className="w-full rounded-md border border-gray-700 bg-transparent py-3 px-6 text-base font-medium outline-none" required />
                            </div>
                        ) : (
                            <div>
                                <div className="mb-5">
                                    <label className="mb-3 block text-base font-medium ">Academic Year</label>
                                    <select name="year" className="w-full rounded-md appearance-none border border-gray-700 bg-transparent py-3 px-6 text-base font-medium outline-none ">{yearsList.map((year, index) => { return (<option value={year} key={index} className="text-[#676c79]">{year}</option>); })}</select>
                                </div>
                                {(materialType === MATERIAL_TYPES.ASSIGNMENT_QUESTIONS || materialType === MATERIAL_TYPES.ASSIGNMENT_SOLUTION) && (
                                    <div className="mb-5">
                                        <label className="mb-3 block text-base font-medium ">Lab/Tutorial Number</label>
                                        <select name="number" className="w-full rounded-md appearance-none border border-gray-700 bg-transparent py-3 px-6 text-base font-medium outline-none ">{[...Array(15).keys()].map((i) => { return (<option value={i + 1} key={i + 1} className="text-[#676c79]">{i + 1}</option>); })}</select>
                                    </div>
                                )}
                                {(materialType === MATERIAL_TYPES.EXAM_QUESTION_PAPER || materialType === MATERIAL_TYPES.EXAM_PAPER_SOLUTION) && (
                                    <div className="mb-5">
                                        <label className="mb-3 block text-base font-medium ">Exam</label>
                                        <select name="exam" className="w-full rounded-md appearance-none border border-gray-700 bg-transparent py-3 px-6 text-base font-medium outline-none ">{examsList.map((exam, index) => { return (<option value={exam} key={index} className="text-[#676c79]">{exam}</option>); })}</select>
                                    </div>
                                )}
                                {materialType === MATERIAL_TYPES.LECTURE_SLIDES && (
                                    <div className="mb-5">
                                        <label className="mb-3 block text-base font-medium ">Which Lecture?</label>
                                        <input type="text" name="number" placeholder="Enter Lecture number or Range (e.g. 1 to 5)" className="w-full rounded-md border border-gray-700 bg-transparent py-3 px-6 text-base font-medium outline-none " required />
                                    </div>
                                )}
                            </div>
                        )}
                        <div className="flex justify-end content-center mt-10">
                            <button type="button" onClick={() => router.back()} className="inline-flex items-center justify-center text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-base px-5 py-2 me-2">Cancel</button>
                            <button type="submit" disabled={isUploading} className="inline-flex gap-2 items-center justify-center me-2 text-white bg-black hover:bg-gray-900 rounded-lg text-base px-5 py-2"><Upload className="w-4 h-4 me-2" />Upload Material</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}