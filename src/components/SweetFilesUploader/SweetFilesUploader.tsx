import React, { useEffect, useRef, useState } from "react";

import { cla } from "src/App";
// import { Link } from "react-router-dom";
// import { useAppSelector } from "../app/hooks";

import style from "./SweetFilesUploader.module.scss";

import { ReactComponent as FileSvg } from "src/styling-constants/svg-items/file.svg";
import { ReactComponent as CloseSvg } from "src/styling-constants/svg-items/cross-close.svg";
import noImageSvgPath from "src/styling-constants/svg-items/no-image.svg";
import { useTranslation } from "react-i18next";

export type Base64StringT = string;

interface IPreviewObject {
  src: Base64StringT;
  fileName: string;
  nameAndSizeString: string;
}

// const joinArraysOfFiles = (arr1: File[], arr2: File[]) => {
//   return [...arr1, ...arr2];
// };

export const SweetFilesUploader: React.FC<{
  className?: string;
  getFilesToParent: (files: File[]) => any;
  errorFromParent?: string;
}> = ({ className, getFilesToParent, errorFromParent }) => {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [newfilesArray, setNewFilesArray] = useState<File[]>([]);
  const [filesArray, setFilesArray] = useState<File[]>([]);

  useEffect(() => {
    getFilesToParent(filesArray);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // getFilesToParent, // because setFieldValue (formik) causes changing useFormik return value.
    filesArray,
  ]);

  const [previewObjectsArray, setPreviewObjectsArray] = useState<(IPreviewObject | null)[]>([]);

  useEffect(() => {
    setPreviewObjectsArray((prev) => [...prev, ...newfilesArray.map((x) => null)]);

    const fullArrayOfFiles = [...filesArray, ...newfilesArray];
    const oldLength = filesArray.length;
    setFilesArray(fullArrayOfFiles);

    newfilesArray.forEach((file, ind) => {
      const gloIndex = oldLength + ind;
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result as Base64StringT;

        setPreviewObjectsArray((prev) => {
          const cop = [...prev];
          let thisSrc = noImageSvgPath;
          if (
            [
              //
              // "application/pdf",
              "image/svg+xml",
              "image/png",
              `image/jpeg`,
            ].includes(fullArrayOfFiles[gloIndex].type)
          ) {
            thisSrc = base64String;
          }

          const currItem = fullArrayOfFiles[gloIndex];
          const newV: IPreviewObject = {
            src: thisSrc,
            fileName: currItem.name,
            nameAndSizeString: currItem.name + String(currItem.size),
          };

          cop[gloIndex] = newV;

          return cop;
        });
      };

      // if (file.size < 1024 * 1024 * 5) {
      reader.readAsDataURL(file);
      // } else {
      //   console.log("too large, it is:", file.size);
      // }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newfilesArray]);

  // useEffect(() => {
  //   console.log(filesArray);
  //   console.log(previewObjectsArray);
  // }, [filesArray, previewObjectsArray]);

  return (
    <div className={cla(className, style.ground)}>
      <div className={style.uploadingFiles}>
        {previewObjectsArray.map((previewObject, ind) => {
          if (!previewObject) {
            return null;
          }

          return (
            <div key={previewObject.nameAndSizeString} className={style.fileBox}>
              <div className={style.left}>
                <div className={style.preview}>
                  <img className={style.imagePreview} alt="preview" src={previewObject.src} />
                </div>
                <div className={style.fileName}>{previewObject.fileName}</div>
              </div>
              <div className={style.right}>
                <div
                  className={style.closeSvgWrap}
                  onClick={() => {
                    if (fileInputRef.current) {
                      fileInputRef.current.value = "";
                    }

                    setFilesArray((prev) =>
                      prev.filter((x) => {
                        const currNameAndSize = x.name + String(x.size);
                        return previewObject.nameAndSizeString !== currNameAndSize;
                      }),
                    );

                    setPreviewObjectsArray((prev) =>
                      prev.filter((x) => x?.nameAndSizeString !== previewObject.nameAndSizeString),
                    );
                  }}
                >
                  <CloseSvg />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={style.buttonWrapToUploadFiles}>
        <input
          ref={fileInputRef}
          style={{ display: "none" }}
          className={style.input}
          multiple={true}
          type={"file"}
          // accept="image/*"
          onChange={(event) => {
            const files = event.target.files;
            // console.log(files);
            if (files) {
              const selectedFiles = Object.values(files);
              const legitFiles = selectedFiles.filter((x) => x.size <= 1024 * 1024 * 5);
              const nonLegitFiles = selectedFiles.filter((x) => x.size > 1024 * 1024 * 5);

              if (nonLegitFiles.length > 0) {
                alert(
                  `These files will not be uploaded because each of them is larger than 5 MB: ${nonLegitFiles.map(
                    (x) => x.name,
                  )}`,
                );
              }

              // -------------

              const nonDuplicateFiles = legitFiles.filter((x) => {
                const existingNamesAndSizes = filesArray.map((x) => x.name + String(x.size));
                const currNameAndSize = x.name + String(x.size);
                return !existingNamesAndSizes.includes(currNameAndSize);
              });

              const duplicateFiles = legitFiles.filter((x) => {
                const existingNamesAndSizes = filesArray.map((x) => x.name + String(x.size));
                const currNameAndSize = x.name + String(x.size);
                return existingNamesAndSizes.includes(currNameAndSize);
              });

              if (duplicateFiles.length > 0) {
                alert(
                  `These files will not be uploaded because they are already in upload list: ${duplicateFiles.map(
                    (x) => x.name,
                  )}`,
                );
              }

              setNewFilesArray((prev) => {
                return nonDuplicateFiles;
              });
            }
          }}
        />

        <div
          className={style.inputButton}
          onClick={(event) => {
            event.preventDefault();
            if (fileInputRef.current) {
              fileInputRef.current.click();
            }
          }}
        >
          <div className={style.titleBox}>
            <FileSvg className={style.fileSvg} />
            <div className={style.titleText}>{t("uploadPdfFile")}</div>
          </div>
        </div>
      </div>

      {errorFromParent && <div className={style.error}>{errorFromParent}</div>}
    </div>
  );
};
