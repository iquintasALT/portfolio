import React, { useState } from "react";
import texts from "@content/texts.json";
import * as Toast from "@radix-ui/react-toast";

import AutoCloseToast from "./AutoCloseToast";

interface CVDownloadButtonProps {
  className?: string;
  style?: React.CSSProperties;
}

const CVDownloadButton: React.FC<CVDownloadButtonProps> = ({ className, style }) => {
  const useBlob = process.env.NEXT_PUBLIC_USE_BLOB === "true";
  const blobBaseUrl = process.env.NEXT_BLOB_BASE_URL || "";
  const href = useBlob ? `${blobBaseUrl}/cv/iago_quintas_diz_cv.pdf` : "/content/iago_quintas_diz_cv.pdf";
  const [open, setOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    if (useBlob) {
      try {
        const response = await fetch("/api/blob/cv/iago_quintas_diz_cv.pdf");
        if (!response.ok) throw new Error("Failed to fetch CV");
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "iago_quintas_diz_cv.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        setToastMsg("CV downloaded successfully!");
        setToastType("success");
        setOpen(true);
      } catch {
        setToastMsg("Failed to download CV. Please try again later.");
        setToastType("error");
        setOpen(true);
      }
    } else {
      try {
        const link = document.createElement("a");
        link.href = href;
        link.download = "iago_quintas_diz_cv.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setToastMsg("CV download started.");
        setToastType("success");
        setOpen(true);
      } catch {
        setToastMsg("Failed to download CV. Please try again later.");
        setToastType("error");
        setOpen(true);
      }
    }
    setLoading(false);
  };

  return (
    <>
      <button
        type="button"
        className={className}
        style={style}
        onClick={handleClick}
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4 text-primary" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
            </svg>
            {texts.about.cv}
          </span>
        ) : (
          texts.about.cv
        )}
      </button>
      <Toast.Root
        open={open}
        onOpenChange={setOpen}
        duration={3500}
        className={
          toastType === "success"
            ? "bg-green-600 border border-green-700 text-white rounded px-4 py-2 shadow-lg"
            : "bg-red-600 border border-red-700 text-white rounded px-4 py-2 shadow-lg"
        }
      >
        <Toast.Title>{toastMsg}</Toast.Title>
        {open && <AutoCloseToast setOpen={setOpen} duration={3500} />}
      </Toast.Root>
      <Toast.Viewport className="fixed bottom-4 right-4 z-[9999] w-[360px] max-w-full outline-none" />
    </>
  );
};

export default CVDownloadButton;
