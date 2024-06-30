import React, { useEffect, useState } from "react";
import { dereferenceSwagger } from "./utils/helpers";
import { Disclosure, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "./assets/svg";

interface IProps {
  link: string;
  path: string;
  title: string;
  method: string | null;
}

export interface SwaggerData {
  [key: string]: any;
}

const RenderSwagger = ({ link, title, path, method }: IProps) => {
  const [swaggerData, setSwaggerData] = useState<SwaggerData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSwaggerData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(link);
      const data = await response.json();
      const dereferencedData = await dereferenceSwagger(data);
      Object.entries(dereferencedData.paths).map((swaggerPath: any) => {
        if (swaggerPath[0] === path) {
          Object.entries(swaggerPath[1]).map((swaggerMethod: any) => {
            if (swaggerMethod[0].toUpperCase() === method) {
              setSwaggerData(swaggerMethod[1]);
            }
          });
        }
      });
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSwaggerData();
  }, []);

  return (
    <div>
      <div> {`لینک swagger: ${title} `}</div>
      {isLoading ? (
        <div className="spinner" />
      ) : swaggerData ? (
        <div className="w-full px-4 pt-5">
          <div className="w-full rounded-2xl bg-white p-2">
            <Disclosure>
              {({ open }) => (
                <div
                  className={`${
                    open ? "bg-purple-200 border-purple-100 border-2 mb-3" : ""
                  } rounded-lg `}
                >
                  <Disclosure.Button
                    className={`flex w-full mb-3 items-center rounded-lg
                         px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200
                          focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75
                          ${open ? "" : " border-purple-100 border-2"}`}
                  >
                    <ChevronDownIcon
                      className={`${
                        open ? "" : "rotate-90 transform"
                      } h-5 w-5 fill-purple-500`}
                    />
                    <p className="mr-10">
                      مسیر: <span>{path}</span>
                    </p>
                  </Disclosure.Button>
                  <Transition
                    show={open}
                    enter="transition duration-100 ease-out"
                    enterFrom="transform opacity-0 h-0"
                    enterTo="transform opacity-100 h-fit"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform opacity-100 h-fit"
                    leaveTo="transform opacity-0 h-0"
                  >
                    <Disclosure.Panel className="px-4 pt-2 pb-4 text-sm text-gray-500">
                      <Disclosure>
                        {({ open }) => (
                          <div
                            className={`${
                              open
                                ? "bg-purple-100 border-purple-100 border-2 mb-3 max-w-full"
                                : ""
                            } rounded-lg `}
                          >
                            <Disclosure.Button
                              className={`flex items-center w-full mb-3 rounded-lg
                                              px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200
                                               focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75
                                               ${
                                                 open
                                                   ? ""
                                                   : " border-purple-100 border-2"
                                               }`}
                            >
                              <ChevronDownIcon
                                className={`${
                                  open ? "" : "rotate-90 transform"
                                } h-5 w-5 fill-purple-500 ml-2`}
                              />
                              <div className="flex items-center">
                                <p className="text-lg font-bold">{method}</p>
                                <span className="mr-6 text-xs text-gray-500 text-justify">
                                  {swaggerData?.description}
                                </span>
                              </div>
                            </Disclosure.Button>
                            <Transition
                              show={open}
                              enter="transition duration-100 ease-out"
                              enterFrom="transform opacity-0 h-0"
                              enterTo="transform opacity-100 h-fit"
                              leave="transition duration-75 ease-out"
                              leaveFrom="transform opacity-100 h-fit"
                              leaveTo="transform opacity-0 h-0"
                            >
                              <Disclosure.Panel className="px-4 pt-2 pb-4 text-sm text-gray-500 overflow-x-auto">
                                <div className="flex flex-col">
                                  <div className="">
                                    <p className="text-lg font-bold">
                                      پارامترها:
                                    </p>
                                    <table className="my-4 w-full">
                                      <thead>
                                        <tr>
                                          <th className="px-4 py-2">نام</th>
                                          <th>توضیحات</th>
                                          <th>قسمت</th>
                                          <th>نوع</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {swaggerData.parameters.map(
                                          (parameter: any) => {
                                            return (
                                              <tr>
                                                <td className="px-2">
                                                  {parameter.name}
                                                </td>
                                                <td className="px-2 text-rigth">
                                                  {parameter?.description}
                                                </td>
                                                <td className="px-2">
                                                  {parameter.in}
                                                </td>
                                                <td className="px-2">
                                                  {parameter.type}
                                                </td>
                                              </tr>
                                            );
                                          }
                                        )}
                                      </tbody>
                                    </table>
                                  </div>
                                  {swaggerData.responses[200] && (
                                    <div className="mb-4">
                                      <div className="flex items-center">
                                        <p className="text-lg font-bold">
                                          پاسخ(200):
                                        </p>
                                        <span className="mr-6 text-xs text-gray-500 ">
                                          {
                                            swaggerData?.responses[200]
                                              ?.description
                                          }
                                        </span>
                                      </div>
                                      <table className="my-4 table-auto w-full">
                                        <thead>
                                          <tr>
                                            <th className="px-4 py-2">نام</th>
                                            <th>توضیحات</th>
                                            <th>نوع</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {swaggerData?.responses[200]?.schema
                                            ?.properties
                                            ? Object.entries(
                                                swaggerData.responses[200]
                                                  .schema.properties
                                              ).map((property: any) => {
                                                return (
                                                  <tr>
                                                    <td className="px-2">
                                                      {property[0]}
                                                    </td>
                                                    <td className="px-2">
                                                      {property[1]?.description}
                                                    </td>
                                                    <td className="px-2">
                                                      {property[1].type}
                                                    </td>
                                                  </tr>
                                                );
                                              })
                                            : swaggerData?.responses[200]
                                                ?.content?.["application/json"]
                                                ?.schema?.items?.properties
                                            ? Object.entries(
                                                swaggerData.responses[200]
                                                  .content["application/json"]
                                                  .schema.items.properties
                                              ).map((item: any) => {
                                                return (
                                                  <tr>
                                                    <td className="px-2">
                                                      {item[0]}
                                                    </td>
                                                    <td className="px-2">
                                                      {item[1]?.description}
                                                    </td>
                                                    <td className="px-2">
                                                      {item[1].type}
                                                    </td>
                                                  </tr>
                                                );
                                              })
                                            : swaggerData?.responses[200]
                                                ?.content?.["application/json"]
                                                ?.schema?.properties
                                            ? Object.entries(
                                                swaggerData.responses[200]
                                                  .content["application/json"]
                                                  .schema.properties
                                              ).map((item: any) => {
                                                return (
                                                  <tr>
                                                    <td className="px-2">
                                                      {item[0]}
                                                    </td>
                                                    <td className="px-2">
                                                      {item[1]?.description}
                                                    </td>
                                                    <td className="px-2">
                                                      {item[1].type}
                                                    </td>
                                                  </tr>
                                                );
                                              })
                                            : null}
                                        </tbody>
                                      </table>
                                    </div>
                                  )}
                                  {swaggerData.responses[405] && (
                                    <div className="flex items-center mb-4">
                                      <p className="text-lg font-bold">
                                        خطای (405):
                                      </p>
                                      <span className="mr-6 text-xs text-gray-500 ">
                                        {
                                          swaggerData.responses[405]
                                            ?.description
                                        }
                                      </span>
                                    </div>
                                  )}
                                  {swaggerData.responses[401] && (
                                    <div className="flex items-center mb-4">
                                      <p className="text-lg font-bold">
                                        خطای (401):
                                      </p>
                                      <span className="mr-6 text-xs text-gray-500 ">
                                        {
                                          swaggerData.responses[401]
                                            ?.description
                                        }
                                      </span>
                                    </div>
                                  )}
                                  {swaggerData.responses[403] && (
                                    <div className="flex items-center mb-4">
                                      <p className="text-lg font-bold">
                                        خطای (403):
                                      </p>
                                      <span className="mr-6 text-xs text-gray-500 ">
                                        {
                                          swaggerData.responses[403]
                                            ?.description
                                        }
                                      </span>
                                    </div>
                                  )}
                                  {swaggerData.responses[404] && (
                                    <div className="flex items-center mb-4">
                                      <p className="text-lg font-bold">
                                        خطای (404):
                                      </p>
                                      <span className="mr-6 text-xs text-gray-500 ">
                                        {
                                          swaggerData.responses[404]
                                            ?.description
                                        }
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </Disclosure.Panel>
                            </Transition>
                          </div>
                        )}
                      </Disclosure>
                    </Disclosure.Panel>
                  </Transition>
                </div>
              )}
            </Disclosure>
          </div>
        </div>
      ) : (
        <div className="border-2 border-primary rounded-lg flex justify-center items-center">
          <p className="font-bold mt-2">خطایی در دریافت اطلاعات رخ داده!!!!</p>
        </div>
      )}
    </div>
  );
};

export default RenderSwagger;
