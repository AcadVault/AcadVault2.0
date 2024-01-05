"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import FileUploader from "@/components/FileUploader";
import { EXAMS, MATERIAL_TYPES } from "@/lib/constants";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import { toast } from "react-hot-toast";
import { PiUploadSimpleBold } from "react-icons/pi";

export default function NewMaterialPage() {
  const session = useSession();
  const router = useRouter();
  const [file, setFile] = useState(null);

  const materialsList = [];
  const yearsList = [];
  const examsList = [];
  const [coursesList, setCoursesList] = useState([]);

  for (const key in MATERIAL_TYPES) materialsList.push(MATERIAL_TYPES[key]);
  for (const key in EXAMS) examsList.push(EXAMS[key]);
  for (let i = 2019; i <= new Date().getFullYear(); i++) yearsList.push(i);

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

  if (coursesList.length === 0) return <Loading />;

  const uploadData = async (e) => {
    try {
      const formData = new FormData(e.target);
      formData.append("studentID", session.data.user.email.split("@")[0]);
      formData.append("courseName", courseName);
      formData.append("file", file);
      formData.set("materialType", materialType);
      setIsUploading(true);
      await fetch("/api/requests", {
        method: "POST",
        body: formData,
      });
      e.target.reset();
      setFile(null);
      setIsUploading(false);
    } catch (e) {
      e.target.reset();
      setFile(null);
      setIsUploading(false);
      throw e;
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
      <div className="flex items-center justify-center p-8 text-white">
        <div className="mx-auto w-full max-w-[750px]">
          <form onSubmit={handleSubmit}>
            <FileUploader file={file} setFile={setFile} />

            <div className="mb-5">
              <label
                htmlFor="courseName"
                className="mb-3 block text-base font-medium "
              >
                Which course does this material belong?
              </label>
              <select
                id="courseName"
                name="courseName"
                className="w-full rounded-md appearance-none border border-[#e0e0e0] bg-transparent py-3 px-6 text-base font-medium text-[#5c636f] outline-none focus:border-[#6A64F1] focus:shadow-md"
                onChange={(e) => setCourseName(e.target.value)}
              >
                {[
                  ...coursesList.map(({ courseName }, index) => {
                    return (
                      <option value={courseName} key={index}>
                        {courseName}
                      </option>
                    );
                  }),
                  <option value="Other" key={coursesList.length}>
                    Other
                  </option>,
                ]}
              </select>
            </div>

            {courseName === "Other" && (
              <div className="-mt-3 mb-5 ml-3">
                <input
                  name="otherCourseName"
                  placeholder="Specify Course Name"
                  className="w-full rounded-md appearance-none border border-[#e0e0e0] bg-transparent py-3 px-6 text-base font-medium text-[#5c636f] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  required
                />
              </div>
            )}

            <div className="mb-5">
              <label className="mb-3 block text-base font-medium ">
                Which type of material is it?
              </label>
              <div className="grid grid-cols-2 grid-flow-row gap-4">
                {materialsList.map((_materialType, index) => {
                  return (
                    <div className="w-full" key={index}>
                      <input
                        id={_materialType}
                        type="radio"
                        name="materialType"
                        className="hidden peer"
                        defaultChecked={index === 0}
                        onChange={(e) => setMaterialType(_materialType)}
                      />
                      <label
                        htmlFor={_materialType}
                        className="inline-flex w-full py-4 px-2 text-gray-500 justify-center bg-transparent backdrop backdrop-blur-sm outline outline-gray-200 outline-1 rounded-lg cursor-pointer peer-checked:outline-[#1c6bfeb3] peer-checked:outline-4 peer-checked:bg-[#4385ff23] peer-checked:text-blue-600 hover:text-gray-600"
                      >
                        <div className="block">
                          <div className="w-full text-lg font-semibold">
                            {_materialType}
                          </div>
                        </div>
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>

            {materialType === MATERIAL_TYPES.REFERENCE_BOOK ? (
              <div className="mb-5">
                <label className="mb-3 block text-base font-medium ">
                  Reference Book Name
                </label>
                <input
                  type="text"
                  name="referenceBookName"
                  placeholder="Reference Book Name (with author)"
                  className="w-full rounded-md border border-[#e0e0e0] bg-transparent py-3 px-6 text-base font-medium text-[#5c636f] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  required
                />
              </div>
            ) : (
              <div>
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium ">
                    Of which year?
                  </label>
                  <select
                    name="year"
                    className="w-full rounded-md appearance-none border border-[#e0e0e0] bg-transparent py-3 px-6 text-base font-medium text-[#5c636f] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  >
                    {yearsList.map((year, index) => {
                      return (
                        <option value={year} key={index}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                </div>
                {(materialType === MATERIAL_TYPES.ASSIGNMENT_QUESTIONS ||
                  materialType === MATERIAL_TYPES.ASSIGNMENT_SOLUTION) && (
                  <div className="mb-5">
                    <label className="mb-3 block text-base font-medium ">
                      Which Lab/Tutorial?
                    </label>
                    <select
                      name="number"
                      className="w-full rounded-md appearance-none border border-[#e0e0e0] bg-transparent py-3 px-6 text-base font-medium text-[#5c636f] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    >
                      {[...Array(12).keys()].map((i) => {
                        return (
                          <option value={i + 1} key={i + 1}>
                            {i + 1}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                )}
                {(materialType === MATERIAL_TYPES.EXAM_QUESTION_PAPER ||
                  materialType === MATERIAL_TYPES.EXAM_PAPER_SOLUTION) && (
                  <div className="mb-5">
                    <label className="mb-3 block text-base font-medium ">
                      Which Exam?
                    </label>
                    <select
                      name="exam"
                      className="w-full rounded-md appearance-none border border-[#e0e0e0] bg-transparent py-3 px-6 text-base font-medium text-[#5c636f] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    >
                      {examsList.map((exam, index) => {
                        return (
                          <option value={exam} key={index}>
                            {exam}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-center content-center mt-10">
              <button
                type="submit"
                disabled={isUploading}
                className=" inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="inline-flex items-center px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  <PiUploadSimpleBold className="w-4 h-4 me-2" />
                  Submit
                </span>
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
              >
                <span className="relative inline-flex items-center px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Cancel
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
