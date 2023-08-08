import React from 'react'
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { BiDownload } from 'react-icons/bi';


export const ExportToExcel = ({ apiData, fileName, station, setDownload, fetching }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (apiData, fileName) => {
    setDownload(true)
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = {
      Sheets: { [station]: ws }, SheetNames: [station]
    };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
    setDownload(false)
  };

  return (
    <button onClick={(e) => exportToCSV(apiData, fileName)} disabled={fetching} className='navButton'>Descargar Excel <BiDownload /></button>
  );
};