import { ShieldExclamationIcon } from "@heroicons/react/solid";
import { hideError } from "../services/ErrorModalSlice";
import { useAppDispatch, useAppSelector } from "../services/Store";

export const ErrorModal = () => {
  const show = useAppSelector((state) => state.error.show);
  const message = useAppSelector((state) => state.error.message);
  const dispatch = useAppDispatch()

  const close = () => {
    dispatch(hideError())
  }

  return (
    <div className={`${show ? "" : "hidden"} fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20`}>
      <div className="relative top-48 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <ShieldExclamationIcon className="w-16 h-16 fill-red-500 mx-auto m-5" />
          </div>
          <h3 className="text-lg leading-6 font-medium text-gray-900 py-4">Error</h3>
          <div className="px-7 py-2">
            <p className="text-sm text-gray-500">
              {message}
            </p>
          </div>
          <div className="items-center px-4 py-3">
            <button
              className="px-4 py-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
              onClick={close}>
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}