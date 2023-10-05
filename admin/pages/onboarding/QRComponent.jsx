import { copyToClipBoard, trimAddress } from "@/utils";
import Image from "next/image";

import { useState } from "react";

export const QRComponent = (props) => {
  const { walletAddress, isShareQr } = props;
  const [showcopyText, setShowCopyText] = useState(false);

  const handleCopy = () => {
    copyToClipBoard(walletAddress);
    setShowCopyText(true);
    setTimeout(() => {
      setShowCopyText(false);
    }, 2000);
  };
  return (
    <div>
      <p className="text-white text-[20px] text-center m-2">
        {!isShareQr ? "You can deposit crypto into your account via address" : null}
      </p>
      <div className="flex items-center justify-center" />

      {!isShareQr ? (
        <div>
          <div className="flex items-center justify-center">
            <div className="w-fit mt-[15px] border-dashed border border-secondary-300 dark:border-secondaryDark-300 rounded-[10px] flex justify-center items-start md:items-center p-2">
              <div className=" text-white text-[14px] break-all">
                {trimAddress("0xe634a90edaab10dda5e44f85512657500d5cb957")}
              </div>
              <button className="w-6 h-6 ml-1" onClick={() => handleCopy()}>
                {/* <Image src={icons.copyIconWhite} alt="copyIcon" className="w-4 h-full" /> */}
              </button>
            </div>
          </div>
          {showcopyText && (
            <p className="text-white text-[14px] text-center mt-2">Copied!</p>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default QRComponent;
