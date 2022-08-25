import React, { useState ,useEffect} from "react";
import Btn from "../../subcomponents/buttons/Btn";
import Input from "../../subcomponents/inputs/Input";

function EditModal({ showModal, data, onEdit, setShowModal, title }) {
 
  const [information, setInformation] = useState(data);
  const handleInput = (e) => {
    setInformation({ ...information, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setInformation(i => {
    const {User_Id, ...rest} = i
return rest

    })
  
    return () => {
      
    }
  }, [])
  
  const saveChangeHandler = () => {
    onEdit(information);
    setShowModal(false);
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative  flex flex-col w-full text-black bg-white outline-none focus:outline-none">
                {/*header*/}{" "}
                <h1 className="text-center font-semibold text-2xl my-3 ">
                  {title}
                </h1>
                <div className="flex items-start justify-between p-5  border-b border-solid border-slate-200 rounded-t">
                  <div className="grid lg:grid-cols-2  gap-3 ">
                    {Object.keys(information).map((fieldName, index) => {
                      return (
                        <div key={index} className=" flex justify-between">
                          <div className="flex justify-center items-center">
                            <p className="font-semibold">{fieldName}:</p>
                          </div>

                          <div className="flex justify-center items-center">
                            <Input
                              name={fieldName}
                              type="text"
                              value={information[fieldName]}
                              onChange={handleInput}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="flex items-center justify-between p-6 border-t border-solid border-slate-200 rounded-b">
                  <Btn text="Close" onClick={() => setShowModal(false)} />
                  <Btn text="Save Changes" onClick={saveChangeHandler} />
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default EditModal;
