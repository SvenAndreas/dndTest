"use client";
import React, { useEffect, useState } from "react";
import Spinner from "../components/spinner/Spinner";


interface UserInfo {
  name: string;
  category: string;
}

interface FormValidationErrors {
  name?: string;
  category?: string;
}

function Test() {
  const [usersInfo, setUsersInfo] = useState<UserInfo>({
    name: "",
    category: "",
  });
  const [errors, setErrors] = useState<FormValidationErrors>({
    name: "",
    category: "",
  });
  const [order, setOrder] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [loadOnOrganize,setLoadOnOrganize]= useState(false)

  const [userList, setUserList] = useState<UserInfo[]>([]);
  const [organizedUserList, setOrganizedUserList] = useState<UserInfo[]>([]); 
  const [isModified, setIsModified] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const hasErrors = Object.keys(errors).length > 0;
    if(usersInfo.name === '' || usersInfo.category === '')return
    if (hasErrors) return;
    setIsLoading(true);
    const storedData = localStorage.getItem("users");

    let existingUsers: UserInfo[] = [];

    if (storedData) {
      try {
        existingUsers = JSON.parse(storedData);

        // Verificar si es un array
        if (!Array.isArray(existingUsers)) {
          existingUsers = [];
        }
      } catch (error) {
        console.error("Error al parsear los datos de localStorage:", error);
        existingUsers = [];
      }
    }

    const newUser: UserInfo = {
      name: usersInfo.name,
      category: usersInfo.category,
    };

    const updatedUsers = [...existingUsers, newUser];

    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setUsersInfo({ name: "", category: "" });

    setUserList((prev) => [...prev, newUser]);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    setIsModified(true)
    console.log("Usuarios actuales en localStorage:", updatedUsers);
  };

  useEffect(() => {
    const storedData = localStorage.getItem("users");
    setIsModified(true)
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUserList(parsedData);
      console.log(parsedData);
    }
  }, []);

  const formValidation = (name: string, value: string) => {
    const errors: FormValidationErrors = {};
    if (name === "name") {
      if (!value) {
        errors.name = "El nombre es obligatorio";
      } else if (Number(value)) {
        errors.name = "Nombre inválido";
      }
    }
    
    if (name === "category") {
      if (!value) {
        errors.category = "El rango es obligatorio";
      } else if (Number(value) < 1 || Number(value) > 4) {
        errors.category = "El rango debe ser entre 1 y 4";
      }
    }
    return errors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUsersInfo((prev) => {
      const newUserInfo = { ...prev, [name]: value };
      return newUserInfo;
    });

    const newErrors = formValidation(name, value);
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      if (name === "name" || name === "category") {
        delete updatedErrors[name as keyof FormValidationErrors];
      }

      if (newErrors[name as keyof FormValidationErrors]) {
        updatedErrors[name as keyof FormValidationErrors] =
          newErrors[name as keyof FormValidationErrors];
      }

      return updatedErrors;
    });
  };

  const handleOrder = () => {
    if(!isModified)return
    setLoadOnOrganize(true);
    setOrder(true);
    setOrganizedUserList(userList);
    setTimeout(() => {
      setLoadOnOrganize(false);
    }, 2000);
    setIsModified(false)
  };

  return (
    <div className="flex flex-col w-full justify-center bg-gray-50 p-16 h-screen">
      <div className="flex items-center  w-full gap-32 h-full px-40 ">
        <div className="w-1/2">
          <div className="flex flex-col justify-center w-fit">
            <h1 className="text-lg text-center text-slate-700">
              AGREGAR NUEVO INTEGRANTE
            </h1>
            <form
              className=" flex justify-center shadow-md  flex-col gap-y-2 w-full mt-4 border p-6 rounded bg-slate-700"
              onSubmit={onSubmit}
            >
              <div className="flex flex-col gap-2 shadow-md">
                <span className="flex justify-between relative">
                  <label>Nombre:</label>
                  <input
                    value={usersInfo.name}
                    className="bg-gray-100 w-2/3 rounded-sm  text-black px-2"
                    type="text"
                    name="name"
                    onChange={handleInputChange}
                  />
                </span>
                <p className="min-h-6 text-red-300 font-normal text-sm">
                  {errors ? errors.name : ""}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="flex justify-between relative">
                  <label>Rango:</label>
                  <input
                    value={usersInfo.category}
                    className="bg-gray-100 w-2/3 rounded-sm text-black px-2"
                    type="number"
                    name="category"
                    onChange={handleInputChange}
                  />
                </span>
                <p className="min-h-6 text-red-300 font-normal text-sm">
                  {errors ? errors.category : ""}
                </p>
              </div>
              <div className="col-span-2 mx-auto mt-5">
                <button
                  className="w-full border text-black duration-300 border-none rounded p-2 bg-slate-100 hover:bg-slate-200"
                  type="submit"
                >
                  AGREGAR
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="flex justify-end w-1/2  ">
          <div className="w-2/3  min-h-40 rounded-md bg-slate-700 shadow-sm text-center  py-3">
            Lista de integrantes:
            <div className="flex rounded-md relative bg-slate-700 p-2  flex-col h-full justify-between no-underline">
              <ul className="min-h-24 relative  ">
                {isLoading ? (
                  <Spinner />
                ) : (
                  userList.map((e, index) => {
                    return (
                      <li className="no-underline" key={index}>
                        {e.name}
                      </li>
                    );
                  })
                )}
              </ul>
              <button
                onClick={handleOrder}
                className="w-full border text-black duration-300 border-none rounded p-1 bg-slate-100 hover:bg-slate-200"
              >
                ORGANIZAR
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center relative min-h-80 py-12 flex-col mt-8 px-40">
        {loadOnOrganize ? (
          <Spinner color="black" />
        ) : (
          <>
            <div className="flex w-full text-black items-center font-bold gap-2">
              <p>1</p>
              <div className="w-full flex items-center px-2 gap-4 h-12 bg-blue-100 rounded">
                {order && organizedUserList.map((e, index) => {
                  if (e.category === "1")
                    return (
                      <p className="text-black" key={index}>
                        {e.name}
                      </p>
                    );
                })}
              </div>
            </div>
            <div className="flex w-full text-black items-center mt-4 font-bold gap-2">
              <p>2</p>
              <div className="w-full h-12 flex items-center px-2 gap-4 bg-green-100 rounded">
                {order && organizedUserList.map((e, index) => {
                  if (e.category === "2")
                    return (
                      <p className="text-black" key={index}>
                        {e.name}
                      </p>
                    );
                })}
              </div>
            </div>
            <div className="flex w-full text-black items-center mt-4 font-bold gap-2">
              <p>3</p>
              <div className="w-full m-auto h-12 flex items-center px-2 gap-4 bg-slate-200  rounded">
                {order && organizedUserList.map((e, index) => {
                  if (e.category === "3")
                    return (
                      <p className="text-black" key={index}>
                        {e.name}
                      </p>
                    );
                })}
              </div>
            </div>
            <div className="flex w-full text-black items-center mt-4 font-bold gap-2">
              <p>4</p>
              <div className="w-full m-auto h-12 flex items-center px-2 gap-4 bg-orange-200  rounded">
                {order && organizedUserList.map((e, index) => {
                  if (e.category === "4")
                    return (
                      <p className="text-black" key={index}>
                        {e.name}
                      </p>
                    );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Test;
