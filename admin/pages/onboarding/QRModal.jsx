import { copyToClipBoard, trimAddress } from "@/utils";
import { Dialog, Transition } from "@headlessui/react";
import dynamic from "next/dynamic";
import React, { Fragment, useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
// import { QRComponent } from "./QRCOmponent";
const useQRCodeStyling = (options) => {
  //Only do this on the client
  if (typeof window !== "undefined") {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const QRCodeStylingLib = require("qr-code-styling");
    const qrCodeStyling = new QRCodeStylingLib(options);
    return qrCodeStyling;
  }
  return null;
};

export default dynamic(() => Promise.resolve(QRModal), {
  ssr: false,
});
// const QRComponent = dynamic(() => import('./QRCOmponent'), {
//     ssr: false,
//   })

export const QRModal = (props) => {
  const { walletAddress, open, handleClose } = props;

  const [options] = useState({
    width: 240,
    height: 240,
    type: "svg",
    // image: icons.logo.src,
    margin: 5,
    qrOptions: {
      typeNumber: 0,
      mode: "Byte",
      errorCorrectionLevel: "Q",
    },
    dotsOptions: {
      type: "extra-rounded",
      color: "#FFFFFF",
    },
    // imageOptions: {
    //     hideBackgroundDots: true,
    //     imageSize: 0.5,
    //     margin: 5,
    //     crossOrigin: "anonymous",
    // },
    backgroundOptions: {
      color: "#2B2D30",
    },
  });
  const qrCode = useQRCodeStyling(options);
  const ref = useRef(null);

  useEffect(() => {
    qrCode?.append(ref.current);
  }, [qrCode]);
  useEffect(() => {
    qrCode?.update({
      data: walletAddress,
      dotsOptions: options?.dotsOptions,
      backgroundOptions: options?.backgroundOptions,
    });
  }, [open]);
  const [showcopyText, setShowCopyText] = useState(false);

  console.log(walletAddress, "wallet address");

  const handleCopy = () => {
    copyToClipBoard("0xe634a90edaab10dda5e44f85512657500d5cb957");
    setShowCopyText(true);
    setTimeout(() => {
      setShowCopyText(false);
    }, 2000);
  };

  if (typeof window === "object") {
    return ReactDOM.createPortal(
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-[1000]" onClose={handleClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-[1000] overflow-y-hidden md:rounded-[16px]">
            <div className="flex min-h-full items-end justify-center sm:items-center p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel
                  className={`bg-lightGray lg:min-w-[400px] rounded-[12px] w-full lg:w-[400px]  py-5`}
                >
                  <div className="flex  items-center justify-center">
                    <div className="flex flex-col items-center justify-center bg-black w-fit p-10 rounded-lg">
                      <p className="text-white text-[20px] text-center m-2">
                        You can deposit crypto into your account via address
                      </p>
                      <div className="w-fit mt-[15px] border-dashed border border-secondary-300 dark:border-secondaryDark-300 rounded-[10px] flex justify-center items-start md:items-center p-2">
                        <div className=" text-white text-[14px] break-all">
                          {trimAddress("0xe634a90edaab10dda5e44f85512657500d5cb957")}
                        </div>
                        <button className="ml-1 w-6 h-6" onClick={() => handleCopy()}>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M8 4V16C8 16.5304 8.21071 17.0391 8.58579 17.4142C8.96086 17.7893 9.46957 18 10 18H18C18.5304 18 19.0391 17.7893 19.4142 17.4142C19.7893 17.0391 20 16.5304 20 16V7.242C20 6.97556 19.9467 6.71181 19.8433 6.46624C19.7399 6.22068 19.5885 5.99824 19.398 5.812L16.083 2.57C15.7094 2.20466 15.2076 2.00007 14.685 2H10C9.46957 2 8.96086 2.21071 8.58579 2.58579C8.21071 2.96086 8 3.46957 8 4Z"
                              stroke="white"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M16 18V20C16 20.5304 15.7893 21.0391 15.4142 21.4142C15.0391 21.7893 14.5304 22 14 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V9C4 8.46957 4.21071 7.96086 4.58579 7.58579C4.96086 7.21071 5.46957 7 6 7H8"
                              stroke="white"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        </button>
                      </div>

                      {showcopyText && (
                        <p className="text-white text-[14px] text-center mt-2">Copied!</p>
                      )}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>,
      document.body,
    );
  }
  return null;
};
