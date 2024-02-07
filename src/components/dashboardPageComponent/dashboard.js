import * as XLSX from "xlsx";
import React, { useEffect, useState } from "react";
import styles from "./dashboard.module.css";
import logo2 from "../images/logo.svg";
import bg from "../images/smallbg.svg";
import upload from "../images/Upload.svg";
import Notification from "../images/Notification.svg";
import calander from "../images/calander.svg";
import schedule from "../images/Schedule.svg";
import settings from "../images/Settings.svg";
import invoice from "../images/Invoice.svg";
import Dashboard from "../images/dash.png";
import uploadIcon from "../images/uploadIcon.svg";
import excelupload from "../images/excelupload.svg";
import Dropdown from "../dropDownComponent/dropdown";
import close from "../images/close.svg";
import close2 from "../images/plus.svg";
import threeLines from "../images/threeLines.svg";
import bell from "../images/bell.svg";
import Spinner from "../spinnerComponent/spinner";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.sessionStorage.getItem("loged") !== "yes") {
      navigate("/");
    }
  }, []);

  const [bufferData, setBufferData] = useState(null);
  const [objData, setObjData] = useState(null);
  const [fileName, setFileName] = useState("");
  const [toggle, setToggle] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const disabled = fileName.length === 0;

  const handleFile = (e) => {
    let file = e.target.files[0];
    setFileName(file.name);
    setBufferData(file);
  };

  function onSelect(data, indx) {
    setObjData((prev) => {
      return prev.map((a, i) => {
        if (prev[indx].selectedTags.includes(data)) return a;
        return i === indx
          ? { ...a, selectedTags: [...prev[indx].selectedTags, data] }
          : a;
      });
    });
  }

  const handleSubmit = () => {
    let reader = new FileReader();
    reader.readAsArrayBuffer(bufferData);

    reader.onload = (e) => {
      const wb = XLSX.read(e.target.result, { type: "buffer" });
      const wsName = wb.SheetNames[0];
      const ws = wb.Sheets[wsName];
      var data = XLSX.utils.sheet_to_json(ws);
      setObjData(
        data.map((a, index) => {
          return { ...a, selectedTags: [], id: index + 1 }; // Adding ID property
        })
      );
    };
  };

  function handleFilter(data, indx) {
    setObjData((prev) => {
      return prev.map((a, i) => {
        let tempData = prev[indx].selectedTags.filter((a) => a !== data);
        return i === indx ? { ...a, selectedTags: tempData } : a;
      });
    });
  }

  function menuToggle() {
    setToggle(!toggle);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setFileName(file.name);
    setBufferData(file);
  }

  return (
    <div className={styles.outter}>
      <div className={toggle ? styles.menu_toggle : styles.menu}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <img
            className={styles.menu_logo}
            style={{ alignSelf: "center" }}
            src={logo2}
            alt="logo2"
          />
          <img
            onClick={menuToggle}
            className={styles.close2}
            src={close2}
            style={{ cursor: "pointer" }}
            alt="close2"
          />
        </div>
        <div className={styles.menu_options}>
          <img
            style={{ marginLeft: "2rem", height: "1.4rem" }}
            src={Dashboard}
            alt="dashboard"
          />
        </div>
        <div className={styles.menu_options}>
          <img style={{ position: "absolute", left: "0" }} src={bg} alt="bg" />
          <img style={{ marginLeft: "2rem" }} src={upload} alt="upload" />
        </div>
        <div className={styles.menu_options}>
          <img style={{ marginLeft: "2rem" }} src={invoice} alt="invoice" />
        </div>
        <div className={styles.menu_options}>
          <img style={{ marginLeft: "2rem" }} src={schedule} alt="schedule" />
        </div>
        <div className={styles.menu_options}>
          <img style={{ marginLeft: "2rem" }} src={calander} alt="calender" />
        </div>
        <div className={styles.menu_options}>
          <img
            style={{ marginLeft: "2rem" }}
            src={Notification}
            alt="notifications"
          />
        </div>
        <div className={styles.menu_options}>
          <img style={{ marginLeft: "2rem" }} src={settings} alt="settings" />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.right_header}>
          <div className={styles.combined_toggle}>
            <img
              className={styles.title_logo}
              style={{
                alignSelf: "center",
                marginRight: "1.5rem",
                cursor: "pointer",
              }}
              src={threeLines}
              onClick={menuToggle}
              alt="toggle"
            />
            <img
              className={styles.title_logo}
              style={{ alignSelf: "center" }}
              src={logo2}
              alt="logo2"
            />
          </div>
          <span
            className={styles.span_main_title}
            style={{ fontSize: "1.2rem", fontWeight: "bold" }}
          >
            upload CSV
          </span>

          <div style={{ display: "flex", gap: "1rem" }}>
            <img style={{ cursor: "pointer" }} src={bell} alt="headericons" />
            <img
              style={{
                height: "1.8rem",
                borderRadius: "50%",
                cursor: "pointer",
              }}
              src={window.sessionStorage.getItem("picture")}
              alt="headericons"
            />
          </div>
        </div>
        <div className={styles.right_content}>
          <span
            className={styles.span_title}
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              alignSelf: "flex-start",
            }}
          >
            upload CSV
          </span>
          <div className={styles.upload}>
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className={styles.upload_inner}
              onClick={() => {}}
            >
              <img
                style={{ marginBottom: "1.5rem" }}
                src={excelupload}
                alt="excelIcon"
              />
              {fileName.length > 0 ? (
                <>
                  <span>{fileName}</span>
                  <span
                    style={{ color: "#D33030", marginTop: "1rem" }}
                    onClick={() => {
                      setBufferData(null);
                      setFileName("");
                      setObjData(null);
                      document.getElementById("fileInput").value = "";
                    }}
                  >
                    remove
                  </span>
                </>
              ) : (
                <>
                  <span className={styles.xl_txt} style={{ color: "#999CA0" }}>
                    Drop your excel sheet here or{" "}
                    <span
                      style={{ color: "var(--primary)" }}
                      onClick={() => {
                        document.getElementById("fileInput").click();
                      }}
                    >
                      browse
                    </span>
                  </span>
                  <span
                    className={styles.mobile_txt}
                    style={{ color: "#999CA0" }}
                  >
                    Upload your excel sheet{" "}
                    <span
                      style={{ color: "var(--primary)" }}
                      onClick={() => {
                        document.getElementById("fileInput").click();
                      }}
                    >
                      here
                    </span>
                  </span>
                </>
              )}
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleFile}
                accept=".csv"
              />
            </div>
            <button
              disabled={disabled}
              onClick={() => {
                handleSubmit();
                setFileName("");
                setBufferData(null);
                document.getElementById("fileInput").value = "";
              }}
            >
              {!showSpinner ? (
                <>
                  <img src={uploadIcon} alt="uploadIcon" />
                  <span style={{ color: "white", marginLeft: "1rem" }}>
                    upload
                  </span>
                </>
              ) : (
                <Spinner />
              )}
            </button>
          </div>
        </div>
        {objData && (
          <>
            <span
              className={styles.table_title}
              style={{
                fontWeight: "bold",
                fontSize: "1.2rem",
                marginBottom: "2rem",
                alignSelf: "flex-start",
              }}
            >
              Uploads
            </span>
            <div className={styles.excel_table}>
              <div className={styles.table_row_head}>
                <div>SI No.</div>
                <div>Links</div>
                <div>Prifix</div>
                <div>Add Tags</div>
                <div>Selected Tags</div>
              </div>
              {objData.map((val, i) => (
                <div key={i} className={styles.table_row}>
                  <div>{parseInt(val.id) < 10 ? `0${val.id}` : val.id}</div>
                  <div>
                    <a
                      href={`http://${val.links}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        textDecoration: "underline",
                        color: "#5B93FF",
                      }}
                    >
                      {val.links}
                    </a>
                  </div>
                  <div>{val.prefix}</div>
                  <div>
                    <Dropdown
                      getData={(data) => {
                        onSelect(data, i);
                      }}
                      data={
                        val["select tags"] ? val["select tags"].split(",") : []
                      }
                    />
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {val.selectedTags.map((a, indx) => (
                      <div
                        key={indx}
                        className={styles.tag}
                        onClick={() => handleFilter(a, i)}
                      >
                        <span style={{ marginRight: "1rem" }}>{a}</span>
                        <img alt="close" src={close} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
