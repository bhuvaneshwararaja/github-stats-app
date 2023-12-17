"use client";

import { UserContext } from "@/app/context";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import { PiGitForkFill } from "react-icons/pi";

function RepoList() {
  const globalUserData: any = useContext(UserContext);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [repositoryData, setRepositoryData] = useState([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [loader, setLoader] = useState(false);
  const router = useRouter()
  useEffect(() => {
    if(globalUserData.userData.login){
      setTotalPages(Math.round(globalUserData.userData.public_repos / 50));
    }
    else{
      router.push("/")
    }
  }, []);

  useEffect(() => {
    getRepository(currentPage);
  }, [currentPage]);

  const getRepository = async (pageNumber: number) => {
    setLoader(true);
    setRepositoryData([]);
    if (globalUserData.userData) {
      const repoData = await fetch(
        `/api/user/repository/${pageNumber}/${globalUserData.userData.login}`,
        { cache: "no-store" }
      );
      const repoDataResult = await repoData.json();
      setRepositoryData(repoDataResult["data"]);
      setLoader(false);
    }
  };

  return (
    <div>
      <>
        <div
          className="overflow-y-scroll grid grid-cols-3 grid-4 p-3"
          style={{ height: "80vh" }}
        >
          {loader ? (
            <>
              {new Array(12).fill(0).map((data: number) => (
                <div className="skeleton w-11/12 h-40" key={data}></div>
              ))}
            </>
          ) : (
            <>
              {repositoryData.length ? (
                <>
                  {repositoryData.map((data: any) => {
                    return (
                      <div
                        className="list-tabs w-11/12 h-40 flex flex-col justify-between shadow-md rounded-md mt-3 p-3 cursor-pointer"
                        style={{ backgroundColor: "#262D47" }}
                        key={data}
                      >
                        <div className="flex flex-col">
                          <h1 className="text-white font-bold text-lg">
                            {data.name}
                          </h1>
                          <p
                            className="text-white mt-1"
                            style={{ fontSize: "12px" }}
                          >
                            {data.description || "No description"}
                          </p>
                        </div>
                        <div className="flex justify-between items-center mt-3">
                          <div className="flex items-center ">
                            <div className="w-2 h-2 rounded-box bg-green-600 "></div>
                            <p
                              className="text-white ml-2"
                              style={{ fontSize: "11px" }}
                            >
                              {data.language || "others"}
                            </p>
                            <div className="ml-2 flex items-center">
                              <FaStar
                                className="text-slate-200"
                                style={{ fontSize: "11px" }}
                              />
                              <p
                                className="text-white ml-1"
                                style={{ fontSize: "11px" }}
                              >
                                {data.stargazers_count}
                              </p>
                            </div>
                            <div className="ml-2 flex items-center">
                              <PiGitForkFill
                                className="text-slate-200"
                                style={{ fontSize: "11px" }}
                              />
                              <p
                                className="text-white ml-1"
                                style={{ fontSize: "11px" }}
                              >
                                {data.forks_count}
                              </p>
                            </div>
                          </div>
                          <p
                            className="text-white"
                            style={{ fontSize: "11px" }}
                          >
                            {data.size} KB
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : null}
            </>
          )}
        </div>
        {totalPages > 1 ? (
          <div className="flex justify-center mt-8">
            <div className="join">
              {new Array(totalPages).fill(0).map((pageIndex, index) => {
                return (
                  <input
                    ref={inputRef}
                    className={`join-item btn btn-square`}
                    type="radio"
                    name="options"
                    aria-label={(index + 1).toString()}
                    style={
                      currentPage === index + 1
                        ? { background: "#333", border: "none" }
                        : {}
                    }
                    defaultChecked={currentPage === index + 1}
                    onInput={(e) => {
                      setCurrentPage(index + 1);
                    }}
                    key={index}
                  />
                );
              })}
            </div>
          </div>
        ) : null}
      </>
    </div>
  );
}

export default RepoList;
