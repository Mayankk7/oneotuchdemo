import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useContext, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import preReg from "../../animations/preReg.gif";
import { StateContext } from "../../context/StateProvider";

function AddtoShortlist() {
  // const [showElement, setShowElement] = useState(true);
  // Animation Time Function
  const { preRegModal, setPreRegModal, setisModalOpen } =
    useContext(StateContext);

  useEffect(() => {
    const timer = setTimeout(function () {
      setPreRegModal(false);
    }, 900000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {preRegModal ? (
        <div className="w-full  flex justify-center z-50 fixed">
          <Transition.Root show={preRegModal} as={Fragment}>
            <Dialog
              as="div"
              className="fixed z-10 inset-0 overflow-y-auto"
              onClose={setPreRegModal}
            >
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                {/* This element is to trick the browser into centering the modal contents. */}
                <span
                  className="hidden sm:inline-block sm:align-middle sm:h-screen"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <div className="inline-block align-bottom  bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                    <div>
                      <button
                        className="absolute outline-none border-none right-4 top-4  z-50! "
                        onClick={() => setPreRegModal(false)}
                      >
                        <AiOutlineClose className="text-2xl border-none text-main-red" />
                      </button>
                    </div>

                    <div>
                      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                        <img src={preReg} alt="" />
                      </div>
                      <div className="mt-3 text-center sm:mt-5">
                        <Dialog.Title
                          as="h1"
                          className="text-lg font-bold leading-6 text-main-blue"
                        >
                          Free Registration is Open Now
                        </Dialog.Title>
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-6 md:flex md:space-x-2 space-y-2 md:space-y-0 ">
                      <button
                        type="button"
                        className="items-center flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                        onClick={() => setisModalOpen(true)}
                      >
                        Register Now
                      </button>
                    </div>
                  </div>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default AddtoShortlist;
