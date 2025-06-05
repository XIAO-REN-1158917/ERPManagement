import * as XLSX from "xlsx"
import { saveAs } from "file-saver"

// NOTE:
// Enter the following command in the terminal
// npm install xlsx file-saver
// (Type declaration file)
// npm i --save-dev @type/file-saver


export function exportToExcel(data: any, header: string[]) {
    // create a new sheet based on selected data
    const ws = XLSX.utils.json_to_sheet(
        data, { header }
    )
    // create a new workbook
    const wb = XLSX.utils.book_new()
    // add the sheet to workbook and name the sheet
    XLSX.utils.book_append_sheet(wb, ws, "sheet1")
    //fomat data to binary
    const buf = XLSX.write(wb, { bookType: "xlsx", type: "buffer" })
    // save and download and name the file
    saveAs(new Blob([buf], { type: "application/octet-stream" }), "selected-data.xlsx")
}
