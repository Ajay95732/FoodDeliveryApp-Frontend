import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportOrdersToExcel = (orders) => {

    const data = orders.map(order => ({
        "Order ID": order.id,
        "Customer": order.customerName,
        "Phone": order.phone,
        "Address": order.address,
        "Amount": order.totalAmount,
        "Status": order.status,
        "Date": new Date(order.orderDate).toLocaleString()
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Orders"
    );

    const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array"
    });

    const file = new Blob(
        [excelBuffer],
        {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        }
    );

    saveAs(file, "Orders.xlsx");
};