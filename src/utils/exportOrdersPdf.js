import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportOrdersToPdf = (orders) => {

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("FoodExpress - Orders Report", 14, 18);

    const tableData = orders.map(order => [
        order.id,
        order.customerName,
        order.phone,
        `₹${order.totalAmount}`,
        order.status,
        new Date(order.orderDate).toLocaleDateString()
    ]);

    autoTable(doc, {
        head: [[
            "Order ID",
            "Customer",
            "Phone",
            "Amount",
            "Status",
            "Date"
        ]],
        body: tableData,
        startY: 28,
        styles: {
            fontSize: 10
        },
        headStyles: {
            fillColor: [25, 135, 84]
        }
    });

    doc.save("Orders_Report.pdf");
};