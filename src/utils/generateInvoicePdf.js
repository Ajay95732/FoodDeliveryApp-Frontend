import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateInvoicePdf = (order) => {

    const doc = new jsPDF();

    // Title
    doc.setFontSize(20);
    doc.text("Food Delivery Invoice", 14, 20);

    // Order Details
    doc.setFontSize(12);

    doc.text(`Order ID : ${order.id}`, 14, 35);
    doc.text(`Customer : ${order.customerName}`, 14, 43);
    doc.text(`Phone : ${order.phone}`, 14, 51);
    doc.text(`Address : ${order.address}`, 14, 59);
    doc.text(`Status : ${order.status}`, 14, 67);
    doc.text(
        `Date : ${new Date(order.orderDate).toLocaleString()}`,
        14,
        75
    );

    // Items Table
    const rows = order.orderItems.map(item => [
        item.productName,
        item.quantity,
        `₹${item.price}`,
        `₹${item.price * item.quantity}`
    ]);

    autoTable(doc, {
        startY: 85,
        head: [[
            "Product",
            "Qty",
            "Price",
            "Total"
        ]],
        body: rows,
        theme: "grid",
        headStyles: {
            fillColor: [25, 135, 84]
        }
    });

    // Grand Total
    const finalY = doc.lastAutoTable.finalY + 10;

    doc.setFontSize(14);
    doc.text(
        `Grand Total : ₹${order.totalAmount}`,
        14,
        finalY
    );

    doc.save(`Invoice_Order_${order.id}.pdf`);
};