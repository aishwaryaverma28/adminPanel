import React, { useState,useRef } from "react";
import axios from 'axios';
import styles from "./Styles/BlogAdd.module.css";
import "./Styles/Editor.css";
import ReactEditor from "./ReactEditor";
import trash from "../Assets/image/delete-icon.svg";


const BlogAdd = () => {
  const [sectionData, setSectionData] = useState([]);
  const [sectionTitle, setSectionTitle] = useState("");
  const [sectionSort, setSectionSort] = useState(null);
  const [uploadedSecImage, setUploadedSecImage] = useState(null);
  const [dataFromChild, setDataFromChild] = useState("");
  const [selectedTags, setSelectedTags] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const fileInputRef = useRef(null);

  const [isIndex, setIsIndex] = useState(0);

  function accordianClick(index) {
      if (index === isIndex) {
          setIsIndex(0);
      } else {
          setIsIndex(index);
      }

  }


  const [formData, setFormData] = useState({
    title: "",
    url: "",
    description: "",
  });

  const options = [
    { id: 1, value: "Tag 1" },
    { id: 2, value: "Tag 2" },
    { id: 3, value: "Tag 3" },
    { id: 4, value: "Tag 4" },
    { id: 5, value: "Tag 5" },
    { id: 6, value: "Tag 6" },
    { id: 7, value: "Tag 7" },
    { id: 8, value: "Tag 8" },
    { id: 9, value: "Tag 9" },
    { id: 10, value: "Tag 10" },
  ];
  // ===================================================================functions for tags addition and removal
  const handleTagSelection = (event) => {
    const tagId = event.target.value;
    setSelectedTags(selectedTags ? `${selectedTags},${tagId}` : tagId);
  };

  const handleTagRemoval = (tagIdToRemove,e) => {
    e.preventDefault();
    const updatedTags = selectedTags
      .split(",")
      .filter((tagId) => tagId !== tagIdToRemove)
      .join(",");

    setSelectedTags(updatedTags);
  };

  const getTagName = (tagId) => {
    const selectedOption = options.find(
      (option) => option.id.toString() === tagId
    );
    return selectedOption ? selectedOption.value : "";
  };
  //==================================================================== get image name from child component
  const handleImageUpload = (e) => {
    fileInputRef.current.click();
    e.preventDefault();
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImage(reader.result);
      setImageName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const handleEditImage = (e) => {
    setUploadedImage(null);
    e.preventDefault();
  };
  //===================================================================== function to add date in the form data
  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
  };

 

  //===================================================================== function to track on chnage of form paramerters
  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  }
// =====================================================================================section data trasfer

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
  newSectionData[index].section = data;
  setSectionData(newSectionData);
};

const handleSecImageUpload = (e) => {
  e.preventDefault();
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

const handleSecEditImage = (index,e) => {
  e.preventDefault();
  const newSectionData = [...sectionData];
  newSectionData[index].image = null;
  setSectionData(newSectionData);
};
//======================================================================================= sort and title data change
const handleTitle = (event) => {
  const title = event.target.value;
  setSectionTitle(title);
};

const handleSecSortChange = (event) => {
  const sort = parseInt(event.target.value);
  setSectionSort(sort);
  };
//=======================================================================================editor data transfer
const handleDataTransfer = (data) => {
  setDataFromChild(data);
};
//====================================================================================== handle section data in an array of objects
const handleAddSection = (e) => {
  e.preventDefault();
  const newSection = {
   heading : sectionTitle,
    sort: sectionSort,
    image: uploadedSecImage,
    section: dataFromChild,
  };
  setSectionData([...sectionData, newSection]);
  // Reset input fields and image state
  setSectionTitle("");
  setSectionSort(0);
  setUploadedSecImage(null);
  setDataFromChild("");
};
// =====================================================================================delete the targeted section
const handleDeleteSection = (index,e) => {
  e.preventDefault();
  const newSectionData = [...sectionData];
  newSectionData.splice(index, 1);
  setSectionData(newSectionData);
};

console.log(sectionData);

    // =====================================================================function to handle form data when submited
    function handleFormSubmit(event) {
      event.preventDefault();
      const updatedFormData = {
        ...formData,
        tag: selectedTags,
        image: imageName,
        date: selectedDate,
        sections: sectionData,
        };
        // console.log(updatedFormData);      
        axios.post("http://core.leadplaner.com:3000/api/admin/blog/add", updatedFormData)
        .then((response) => {
          console.log(response);
        })
    }

  function AddTag(event) {
    event.preventDefault();
  }
// ==========================================================================changes in section


  return (
    <>
      <header className="headerEditor">
        <h2> Add a new Blog</h2>
      </header>
      <form className={styles.scrollCover} onSubmit={handleFormSubmit}>
        <div className={styles.addBlogContainer}>
          {/*==============================================================right side of form starts here ============================================================*/}
          <div className={styles.addBlogMainForm}>
            <div className={styles.fromFiled}>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Blog Title"
                onChange={handleChange}
              />
            </div>
            <div className={styles.fromUrl}>
              <input
                type="text"
                name="url"
                id="url"
                placeholder="Url"
                onChange={handleChange}
              />
              <div>
                {!uploadedImage ? (
                  <div className={styles.imageUploaderData}>
                    <button
                      onClick={handleImageUpload}
                      className={styles.addSectionImageBtn}
                    >
                      Add Image <i className="fa-sharp fa-solid fa-plus"></i>
                    </button>
                  </div>
                ) : (
                  <div className={styles.editImg}>
                    <img
                      src={uploadedImage}
                      alt="Uploaded"
                      className={styles.imageHolder}
                    />
                    <div className={styles.imageUploaderData}>
                      <button onClick={handleEditImage}>Edit Image</button>
                    </div>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileInputChange}
                />
              </div>
            </div>
            <div className={styles.fromFiled}>
              <input
                type="text"
                name="description"
                id="description"
                placeholder="Description"
                onChange={handleChange}
              />
            </div>
            {/* <BlogSection/> */}

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
              onChange={handleSecSortChange}
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
          <div className={styles.sectionDropdown} onClick={() => accordianClick(section.sort)}>
            <h3>{section.heading}</h3>
            {(isIndex === section.sort) ? <span><i class="fa-sharp fa-solid fa-minus"></i></span> : <span><i className="fa-sharp fa-solid fa-plus"></i></span>}
            
          </div>
<div  className={(isIndex === section.sort) ? `${styles.answer} ${styles.display_answer}` : `${styles.answer}`}>
          <input
            type="text"
            name="heading"
            id="heading"
            placeholder="Section Title"
            className={styles.sectionHead}
            value={section.heading}
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
              initialContent={section.section}
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
        </div>
      ))}
    </>

                       
          </div>
          {/*==============================================================right side of form end here ============================================================*/}
          {/*==============================================================left side of form starts here ============================================================*/}
          <div className={styles.addBlogRightForm}>
            <div className={styles.tags}>
              <div className={styles.tagContent}>
                <h3>Tags</h3>
                <div className={styles.contentBox}>
                  <select
                    onChange={handleTagSelection}
                    className={styles.tagSelectBox}
                  >
                    <option value="">Select a tag</option>
                    {options.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.value}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={AddTag}
                    type="button"
                    className={styles.primaryBtn}
                  >
                    Add
                  </button>
                </div>
                <div className={styles.tagData}>
                  {selectedTags &&
                    selectedTags.split(",").map((tagId, index) => (
                      <div key={index} className={styles.tagItems}>
                        {getTagName(tagId)}
                        <button onClick={() => handleTagRemoval(tagId)}>
                          <i className="fa-solid fa-x"></i>
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <div className={styles.tags}>
              <div className={styles.tagContent}>
                <h3>Publish</h3>
                <div className={styles.contentBox}>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    placeholder="please publish date"
                    onChange={handleDateChange}
                  />
                  <input
                    type="submit"
                    value="Publish"
                    className={styles.secondaryBtn}
                  />
                </div>
              </div>
            </div>
          </div>
          {/*==============================================================left side of form ends here ============================================================*/}
        </div>
        
      </form>
    </>
  );
};

export default BlogAdd;
