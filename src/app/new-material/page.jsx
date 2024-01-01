"use client";

import axios from "axios";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import FileUploader from "@/components/FileUploader";
import { EXAMS, MATERIALS } from "@/lib/constants";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

export default function NewMaterialPage() {
  const session = useSession();
  const router = useRouter();
  const [file, setFile] = useState(null);

  const materialsList = [];
  const yearsList = [];
  const examsList = [];
  const [coursesList, setCoursesList] = useState([]);

  for (const key in MATERIALS) materialsList.push(MATERIALS[key]);
  for (const key in EXAMS) examsList.push(EXAMS[key]);
  for (let i = 2019; i <= new Date().getFullYear(); i++) yearsList.push(i);

  const [courseName, setCourseName] = useState(null);
  const [materialType, setMaterialType] = useState(materialsList[0]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("api/courses", {
        params: { courseName: "*" },
      });
      setCoursesList(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  if (session.status === "loading" || coursesList.length === 0) return (<Loading/>);
  if (session.status === "unauthenticated") redirect("/login");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      console.log("file not selected");
      return;
    }
    try {
      const formData = new FormData(e.target);
      formData.append("studentID", session.data.user.email.split("@")[0]);
      formData.append("courseName", courseName);
      formData.append("file", file);
      formData.set("materialType", materialType);
      const response = await axios.postForm("/api/material/request", formData);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center p-12 text-white">
        <div className="mx-auto w-full max-w-[550px]">
          <form onSubmit={handleSubmit}>
            <FileUploader file={file} setFile={setFile} />

            <div className="mb-5">
              <label htmlFor="courseName" className="mb-3 block text-base font-medium ">
                Which course does this material belong?
              </label>
              <select id="courseName" name="courseName" className="w-full rounded-md appearance-none border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#5c636f] outline-none focus:border-[#6A64F1] focus:shadow-md" onChange={(e) => setCourseName(e.target.value)} >
                {[
                  ...coursesList.map(({ name }, index) => {
                    return (
                      <option value={name} key={index}>
                        {name}
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
                <input name="otherCourseName" placeholder="Specify Course Name" className="w-full rounded-md appearance-none border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#5c636f] outline-none focus:border-[#6A64F1] focus:shadow-md" required />
              </div>
            )}

            <div className="mb-5">
              <label className="mb-3 block text-base font-medium ">
                Which type of material is it?
              </label>
              <div className="grid grid-cols-2 grid-flow-row">
                {materialsList.map((_materialType, index) => {
                  return (
                    <div className="w-full" key={index}>
                      <input id={_materialType} type="radio" name="materialType" className="h-3 w-3" defaultChecked={index === 0} onChange={(e) => setMaterialType(_materialType)} />
                      <label htmlFor={_materialType} className="pl-3 text-base font-normal ">
                        {_materialType}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>

            {materialType === MATERIALS.REFERENCE_BOOK ? (
              <div className="mb-5">
                <label className="mb-3 block text-base font-medium ">
                  Reference Book Name
                </label>
                <input type="text" name="referenceBookName" placeholder="Reference Book Name (with author)" className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#5c636f] outline-none focus:border-[#6A64F1] focus:shadow-md" required />
              </div>
            ) : (
              <div>
                <div className="mb-5">
                  <label className="mb-3 block text-base font-medium ">
                    Of which year?
                  </label>
                  <select name="year" className="w-full rounded-md appearance-none border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#5c636f] outline-none focus:border-[#6A64F1] focus:shadow-md" >
                    {yearsList.map((year, index) => {
                      return (
                        <option value={year} key={index}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                </div>
                {(materialType === MATERIALS.ASSIGNMENT_QUESTIONS ||
                  materialType === MATERIALS.ASSIGNMENT_SOLUTION) && (
                  <div className="mb-5">
                    <label className="mb-3 block text-base font-medium ">
                      Which Lab/Tutorial?
                    </label>
                    <select name="number" className="w-full rounded-md appearance-none border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#5c636f] outline-none focus:border-[#6A64F1] focus:shadow-md" >
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
                {(materialType === MATERIALS.EXAM_QUESTION_PAPER ||
                  materialType === MATERIALS.EXAM_PAPER_SOLUTION) && (
                  <div className="mb-5">
                    <label className="mb-3 block text-base font-medium ">
                      Which Exam?
                    </label>
                    <select name="exam" className="w-full rounded-md appearance-none border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#5c636f] outline-none focus:border-[#6A64F1] focus:shadow-md" >
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

            <div className="flex justify-evenly mt-10">
              <button type="submit" className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none" >
                Submit
              </button>
              <button type="button" onClick={() => router.back()} className="hover:shadow-form rounded-md bg-[#ef4f4f] py-3 px-8 text-center text-base font-semibold text-white outline-none" >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}