import { useState } from "react";
import { Paperclip, FileText, Briefcase, Check } from "lucide-react";
import "./Attachment.css";

function Attachment({ setResume, setJobDescription }) {
  const [showOptions, setShowOptions] = useState(false);
  const [fileNames, setFileNames] = useState({
    resume: null,
    jobDescription: null,
  });

  const handleFileChange = (event, type) => {
    const file = event.target.files[0];
    if (!file) return;

    if (type === "resume") {
      setResume(file);
      setFileNames((prev) => ({ ...prev, resume: file.name }));
      console.log("Resume selected:", file.name);
    }

    if (type === "job_description") {
      setJobDescription(file);
      setFileNames((prev) => ({ ...prev, jobDescription: file.name }));
      console.log("Job description selected:", file.name);
    }
  };

  const attachedCount = (fileNames.resume ? 1 : 0) + (fileNames.jobDescription ? 1 : 0);

  return (
    <div className="attachment-container">
      <button
        className={`attachment-btn ${showOptions ? "active" : ""} ${attachedCount > 0 ? "has-attachments" : ""}`}
        onClick={() => setShowOptions(!showOptions)}
        aria-label="Upload Attachments"
        title="Upload or manage attachments"
      >
        <Paperclip size={18} strokeWidth={2.2} />
        {attachedCount > 0 ? (
          <span className="attachment-count-badge">{attachedCount}</span>
        ) : (
          <span className="attachment-badge-pulse" />
        )}
      </button>

      {showOptions && (
        <div className="attachment-options">
          <div className="attachment-header">
            <span>Attach Files</span>
          </div>

          {/* Resume Upload */}
          <label htmlFor="resume" className={`option-item ${fileNames.resume ? "completed" : ""}`}>
            <FileText size={16} className="item-icon" />
            <div className="item-text-group">
              <span className="item-label">
                {fileNames.resume ? "Resume" : "Upload Resume"}
              </span>
              {fileNames.resume && (
                <span className="item-subtext">{fileNames.resume}</span>
              )}
            </div>
            {fileNames.resume && <Check size={14} className="check-icon" />}
          </label>
          <input
            type="file"
            id="resume"
            accept=".pdf,.docx"
            onChange={(e) => handleFileChange(e, "resume")}
          />

          {/* Job Description Upload */}
          <label
            htmlFor="job-description"
            className={`option-item ${fileNames.jobDescription ? "completed" : ""}`}
          >
            <Briefcase size={16} className="item-icon" />
            <div className="item-text-group">
              <span className="item-label">
                {fileNames.jobDescription ? "Job Description" : "Upload Job Description"}
              </span>
              {fileNames.jobDescription && (
                <span className="item-subtext">{fileNames.jobDescription}</span>
              )}
            </div>
            {fileNames.jobDescription && <Check size={14} className="check-icon" />}
          </label>
          <input
            type="file"
            id="job-description"
            accept=".pdf,.docx"
            onChange={(e) => handleFileChange(e, "job_description")}
          />
        </div>
      )}
    </div>
  );
}

export default Attachment;