import { useEffect, useState } from "react";
import styles from "./create-project.module.css";

function createLogin() {
  const [projectName, setProjectName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [showStep2, setShowStep2] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const handleNext = () => {
    setProjectName(projectName);
    setShowStep2(true);
  };
  const handleAddProject = () => {
    setWebsiteUrl(websiteUrl);
    setProjectName(projectName);
  };
  const handleProjectChange = (e) => {
    setProjectName(e.target.value);
  };
  const handleUrlChange = (e) => {
    setWebsiteUrl(e.target.value);
  };

  return (
    <div className={`w-[100vw] h-[100vh] ${styles.loginBg}`}>
      <div className="w-full max-w-[600px] mx-auto h-full flex items-center justify-center">
        <div className="w-full flex flex-col items-center justify-center text-center">
          <p className="text-[#3F4145] text-[40px] font-bold mb-1">
            {showStep2 ? "Step 2" : "Step 1"}
          </p>
          <p className="text-[#3F4145] text-[24px]">Create new project</p>
          <input
            type="text"
            placeholder="Enter Project Name"
            value={projectName}
            onChange={handleProjectChange}
            className="w-full max-w-[450px] px-5 py-4 rounded-[20px] cursor-pointer mt-11 focus:outline-none"
          />
          {showStep2 ? (
            <input
              type="text"
              placeholder="Add Website URL"
              value={websiteUrl}
              onChange={handleUrlChange}
              className="w-full max-w-[450px] px-5 py-4 rounded-[20px] cursor-pointer mt-5 focus:outline-none"
            />
          ) : null}
          {showStep2 ? (
            <button
              className="w-full max-w-[400px] px-[100px] py-4 bg-[#EB6201] rounded-[40px] text-white cursor-pointer mt-11 disabled:bg-[#EB6201]/70"
              onClick={handleNext}
              disabled={!websiteUrl}
            >
              Add project
            </button>
          ) : (
            <button
              className="w-full max-w-[400px] px-[100px] py-4 bg-[#EB6201] rounded-[40px] text-white cursor-pointer mt-11 disabled:bg-[#EB6201]/70"
              onClick={handleNext}
              disabled={!projectName}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default createLogin;
