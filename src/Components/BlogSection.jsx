// "sections": [
//     {
//         "heading": "blog nano -1",
//         "sort": 1,
//         "image": "section.jpg",
//         "section": "<section></section>",
//         "blogid": 1,
//         "date":"2022-02-02"
//     },
//     {
//         "heading": "blog nano-2",
//         "sort": 2,
//         "image": "section2.jpg",
//         "section": "<section2></section2>",
//         "blogid": 1,
//         "date":"2022-02-02"
//     }
// ]



import React, { useState } from "react";
import styles from "./Styles/BlogAdd.module.css";
import ReactEditor from "./ReactEditor";
import trash from "../Assets/image/delete-icon.svg";

const BlogSection = () => {
  const [sectionData, setSectionData] = useState([]);
  const [sectionTitle, setSectionTitle] = useState("");
  const [sectionSort, setSectionSort] = useState("");
  const [uploadedSecImage, setUploadedSecImage] = useState(null);
  const [dataFromChild, setDataFromChild] = useState("");

  const handleSecTitleChange = (event, index) => {
    const newSectionData = [...sectionData];
    newSectionData[index].title = event.target.value;
    setSectionData(newSectionData);
  };

  const handleSortChange = (event, index) => {
    const newSectionData = [...sectionData];
    newSectionData[index].sort = event.target.value;
    setSectionData(newSectionData);
  };

  const handleSecImageChange = (event, index) => {
    const file = event.target.files[0];
    const newSectionData = [...sectionData];
    newSectionData[index].image = URL.createObjectURL(file);
    setSectionData(newSectionData);
  };

  const handleEditorChange = (data, index) => {
    const newSectionData = [...sectionData];
    newSectionData[index].editor = data;
    setSectionData(newSectionData);
  };

  const handleSecImageUpload = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.addEventListener("change", handleSecFileInputChange);
    fileInput.click();
  };

  const handleSecFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setUploadedSecImage(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handleSecEditImage = (index) => {
    const newSectionData = [...sectionData];
    newSectionData[index].image = null;
    setSectionData(newSectionData);
  };
//======================================================================================= sort and title data change
  const handleTitle = (event) => {
    const title = event.target.value;
    setSectionTitle(title);
  };

  const handleChange = (event) => {
    const sort = event.target.value;
    setSectionSort(sort);
  };
//=======================================================================================editor data transfer
  const handleDataTransfer = (data) => {
    setDataFromChild(data);
  };
//====================================================================================== handle section data in an array of objects
  const handleAddSection = () => {
    const newSection = {
      title: sectionTitle,
      sort: sectionSort,
      image: uploadedSecImage,
      editor: dataFromChild,
    };
    setSectionData([...sectionData, newSection]);
    // Reset input fields and image state
    setSectionTitle("");
    setSectionSort("");
    setUploadedSecImage(null);
    setDataFromChild("");
  };
// =====================================================================================delete the targeted section
  const handleDeleteSection = (index) => {
    const newSectionData = [...sectionData];
    newSectionData.splice(index, 1);
    setSectionData(newSectionData);
  };

  console.log(sectionData);

  return (
    <>
      <div className={styles.addSection}>
        <div className={styles.fromBlogSection}>
          <input
            type="text"
            name="sectionTitle"
            id="sectiontitle"
            placeholder="Section Title"
            onChange={handleTitle}
            value={sectionTitle}
          />

          <div className={styles.formBtnBox}>
            <input
              type="number"
              name="Sort"
              id="Sort"
              value={sectionSort}
              placeholder="Sort"
              onChange={handleChange}
            />
            <div>
              {!uploadedSecImage ? (
                <div className={styles.imageUploaderData}>
                  <button
                    onClick={handleSecImageUpload}
                    className={styles.addSectionImageBtn}
                  >
                    Add Section Image
                  </button>
                </div>
              ) : (
                <div className={styles.editImg}>
                  <img
                    src={uploadedSecImage}
                    alt="Uploaded"
                    className={styles.imageHolder}
                  />
                  <div className={styles.imageUploaderData}>
                    <button onClick={handleSecEditImage}>Edit Image</button>
                  </div>
                </div>
              )}
            </div>

            <button onClick={handleAddSection} className={styles.addSectionBtn}>
              Add Section
            </button>
          </div>
        </div>

        <div className={styles.formEditor}>
          <ReactEditor onDataTransfer={handleDataTransfer} />
        </div>
      </div>

      {sectionData.map((section, index) => (
        <div key={index} className={styles.section}>
          <div className={styles.sectionDropdown}>
            <h3>{section.title}</h3>
            <i className="fa-sharp fa-solid fa-plus"></i>
          </div>

          <input
            type="text"
            name="sectionTitle"
            id="sectiontitle"
            placeholder="Section Title"
            className={styles.sectionHead}
            value={section.title}
            onChange={(event) => handleSecTitleChange(event, index)}
          />
          <div className={styles.sectionBlockOne}>
            <input
              type="number"
              name="Sort"
              id="Sort"
              placeholder="Sort"
              className={styles.sectionSort}
              value={section.sort}
              onChange={(event) => handleSortChange(event, index)}
            />
            <div>
              {!section.image ? (
                <div className={styles.imageUploaderData}>
                  <button
                    onClick={() => handleSecImageUpload(index)}
                    className={styles.addSectionImageBtn}
                  >
                    Add Section Image
                  </button>
                </div>
              ) : (
                <div className={styles.editImg}>
                  <img
                    src={section.image}
                    alt="Section"
                    className={styles.imageHolder}
                  />
                  <div className={styles.imageUploaderData}>
                    <button onClick={() => handleSecEditImage(index)}>
                      Edit Image
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className={styles.formEditor}>
            <ReactEditor
              onDataTransfer={(data) => handleEditorChange(data, index)}
              initialContent={section.editor}
            />
          </div>
          <div className={styles.deleteContainer}>
            <button
              onClick={() => handleDeleteSection(index)}
              className={styles.sectionDelete}
            >
              <img src={trash} className={styles.deleteIcon} alt="Delete" />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default BlogSection;


