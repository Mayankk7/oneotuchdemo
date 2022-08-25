import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useEffect } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { StateContext } from "../../context/StateProvider";

export default function Example({ className }) {
  // const [open, setOpen] = useState(true);
  const { succeesmailShow, setsuccessmailShow, popupMsg, setPopupMsg } =
    useContext(StateContext);
  //console.log("Hiiiii");

  useEffect(() => {
    const timer = setTimeout(function () {
      setsuccessmailShow(false);
      setPopupMsg("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [succeesmailShow]);

  return (
    <Transition.Root show={succeesmailShow} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setsuccessmailShow}
      >
        <div className="flex items-end justify-center z-50 min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                <div
                  className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 ${className}`}
                >
                  <AiOutlineCheck />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    {popupMsg}
                  </Dialog.Title>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
