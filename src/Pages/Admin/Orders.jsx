import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { exportOrdersToExcel } from "../../utils/exportOrders";
import { exportOrdersToPdf } from "../../utils/exportOrdersPdf";
import { generateInvoicePdf } from "../../utils/generateInvoicePdf";
import {
    getOrders,
    updateOrderStatus,
    deleteOrder
} from "../../services/orderService";

  export default function Orders() {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All");

    const [orderList, setOrderList] = useState([]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("");
  useEffect(() => {
    loadOrders();
}, []);
const [loading, setLoading] = useState(false);

const loadOrders = async () => {

    try {

        setLoading(true);

        const data = await getOrders();

        setOrderList(data);

    }
    catch(error){

        console.error(error);

        alert("Failed to load orders.");

    }
    finally{

        setLoading(false);

    }

};

    const filteredOrders = orderList.filter((order) => {
      const matchSearch =
    (order.customerName || "")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchStatus =
        status === "All" || order.status === status;

      return matchSearch && matchStatus;
    });

    const badgeColor = (status) => {

    switch(status){

        case "Pending":
            return "warning";

        case "Preparing":
            return "info";

        case "Out for Delivery":
            return "primary";

        case "Delivered":
            return "success";

        case "Cancelled":
            return "danger";

        default:
            return "secondary";
    }

};
    const saveStatus = async () => {

    try {

       const confirm = window.confirm(
"Update order status?"
);

if(!confirm)
return;


await updateOrderStatus(
selectedOrder.id,
currentStatus
);

        await loadOrders();

        setShowStatusModal(false);

        setSelectedOrder(null);

        alert("Order status updated successfully.");

    }
    catch (error) {

        console.error(error);

        alert("Failed to update order.");

    }

};

    return (
      <AdminLayout>

        <div className="d-flex justify-content-between align-items-center mb-4">

          <h2 className="fw-bold">Orders Management</h2>

          <button
    className="btn btn-warning"
    onClick={() => exportOrdersToExcel(filteredOrders)}
>
    <i className="bi bi-download me-2"></i>
    Export Orders
</button>
<button
    className="btn btn-danger ms-2"
    onClick={() => exportOrdersToPdf(filteredOrders)}
>
    <i className="bi bi-file-earmark-pdf me-2"></i>
    Export PDF
</button>
<button
className="btn btn-dark ms-2"
onClick={()=>{
    loadOrders();
    setSearch("");
    setStatus("All");
}}>
<i className="bi bi-arrow-clockwise"></i>
 Refresh
</button>


        </div>

        {/* Summary Cards */}

        <div className="row mb-4">

          <div className="col-lg-2 col-md-4">
            <div className="card shadow border-0">
              <div className="card-body text-center">
                <h6>Total Orders</h6>
                <h3>{orderList.length}</h3>
              </div>
            </div>
          </div>

          <div className="col-lg-2 col-md-4">
            <div className="card shadow border-0">
              <div className="card-body text-center">
                <h6>Pending</h6>
                <h3 className="text-warning">
                  {orderList.filter(o => o.status === "Pending").length}
                </h3>
              </div>
            </div>
          </div>

          <div className="col-lg-2 col-md-4">
            <div className="card shadow border-0">
              <div className="card-body text-center">
                <h6>Delivered</h6>
                <h3 className="text-success">
                  {orderList.filter(o => o.status === "Delivered").length}
                </h3>
              </div>
            </div>
          </div>

          <div className="col-lg-2 col-md-4">
            <div className="card shadow border-0">
              <div className="card-body text-center">
                <h6>Total Revenue</h6>
                <h3 className="text-primary">
                  ₹{orderList.reduce(
(sum,o)=>sum + Number(o.totalAmount),
0
).toFixed(2)}
                </h3>
              </div>
            </div>
          </div>
          <div className="col-lg-2 col-md-4">
<div className="card shadow border-0">
<div className="card-body text-center">

<h6>Preparing</h6>

<h3 className="text-info">
{
orderList.filter(
o=>o.status==="Preparing"
).length
}
</h3>

</div>
</div>
</div>
<div className="col-lg-2 col-md-4">
<div className="card shadow border-0">
<div className="card-body text-center">

<h6>Cancelled</h6>

<h3 className="text-danger">
{
orderList.filter(
o=>o.status==="Cancelled"
).length
}
</h3>

</div>
</div>
</div>

        </div>

        <div className="card shadow border-0">

          <div className="card-body">

            <div className="row mb-3">

              <div className="col-md-6">

                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Customer..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

              </div>

              <div className="col-lg-2 col-md-4">

<select
className="form-select"
value={status}
onChange={(e)=>setStatus(e.target.value)}
>

<option value="All">
All Status
</option>

<option value="Pending">
Pending
</option>

<option value="Preparing">
Preparing
</option>

<option value="Out for Delivery">
Out for Delivery
</option>

<option value="Delivered">
Delivered
</option>

<option value="Cancelled">
Cancelled
</option>

</select>

</div>
              </div>

            </div>
            {
loading ? (

<div className="text-center p-5">
    <div className="spinner-border text-warning"></div>
</div>

) : (

            <div className="table-responsive">

              <table className="table table-hover align-middle">

                <thead className="table-dark">

                  <tr>

                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Items</th>
                    <th>Action</th>
                  

                  </tr>

                </thead>

                <tbody>
                  {
filteredOrders.length === 0 && (

<tr>

<td colSpan="9" className="text-center">

No Orders Found

</td>

</tr>

)
}

                  {filteredOrders.map((order) => (

                    <tr key={order.id}>

                      <td>#{order.id}</td>

                      <td>{order.customerName}</td>

                      <td>{order.phone}</td>

                      <td>{order.address}</td>

                      <td>₹{Number(order.totalAmount).toFixed(2)}</td>

                      <td>

                        <span className={`badge bg-${badgeColor(order.status)}`}>
                          {order.status}
                        </span>

                      </td>

                      <td>{new Date(order.orderDate).toLocaleString()}</td>

                      <td>
{
order.orderItems?.length || 0
}
</td>

                      <td>

      <button
          className="btn btn-sm btn-primary me-2"
          onClick={() => {
              setSelectedOrder(order);
          }}
      >
          <i className="bi bi-eye"></i>
      </button>

      <button
      className="btn btn-sm btn-success me-2"
      onClick={() => {

          setCurrentStatus(order.status);

          setSelectedOrder(order);

          setShowStatusModal(true);

      }}
  >
      <i className="bi bi-pencil"></i>
  </button>
  <button
    className="btn btn-sm btn-secondary me-2"
    onClick={() => generateInvoicePdf(order)}
    title="Download Invoice"
>
    <i className="bi bi-file-earmark-pdf"></i>
</button>

      <button
          className="btn btn-sm btn-danger"
          onClick={async () => {

    if (!window.confirm("Delete this order?"))
        return;

    try {

       await deleteOrder(order.id);

await loadOrders();

setSearch("");
setStatus("All");

alert("Order deleted successfully.");

    }
    catch (error) {

        console.error(error);

        alert("Failed to delete order.");

    }

}}
      >
          <i className="bi bi-trash"></i>
      </button>

  </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>
)
  }

          </div>
        

        
        {selectedOrder && !showStatusModal && (

  <div
      className="modal d-block"
      style={{ background: "rgba(0,0,0,0.5)" }}
  >

      <div className="modal-dialog">

          <div className="modal-content">

              <div className="modal-header">

                  <h5>Order Details</h5>

                  <button
                      className="btn-close"
                      onClick={() => {
      setSelectedOrder(null);
      setShowStatusModal(false);
  }}
                  ></button>

              </div>

              <div className="modal-body">

    <p><strong>Order ID:</strong> #{selectedOrder.id}</p>

    <p><strong>Customer:</strong> {selectedOrder.customerName}</p>

    <p><strong>Phone:</strong> {selectedOrder.phone}</p>

    <p><strong>Address:</strong> {selectedOrder.address}</p>

    <p><strong>Total:</strong> ₹{Number(selectedOrder.totalAmount).toFixed(2)}</p>
    <p><strong>Status:</strong> {selectedOrder.status}</p>

    <p>
        <strong>Date:</strong>{" "}
        {new Date(selectedOrder.orderDate).toLocaleString()}
    </p>

    <hr />

    <h6 className="fw-bold mb-3">Ordered Items</h6>

    {selectedOrder.orderItems &&
    selectedOrder.orderItems.length > 0 ? (

        selectedOrder.orderItems.map((item, index) => (

            <div
                key={index}
                className="border rounded p-2 mb-2"
            >
                <p className="mb-1">
                    <strong>
{item.productName || "Product Removed"}
</strong>
                </p>

                <p className="mb-1">
                    Price : ₹{item.price}
                </p>

                <p className="mb-1">
                    Quantity : {item.quantity}
                </p>

                <p className="mb-0">
                  Subtotal : ₹{(item.price * item.quantity).toFixed(2)}
                </p>

            </div>

        ))

    ) : (

        <p>No Items Found.</p>

    )}

</div>

              <div className="modal-footer">

                  <button
                      className="btn btn-secondary"
                      onClick={() => {
      setSelectedOrder(null);
      setShowStatusModal(false);
  }}
                  >
                      Close
                  </button>

              </div>

          </div>

      </div>

  </div>

  )}
  {
  showStatusModal && (

  <div
      className="modal d-block"
      style={{ background: "rgba(0,0,0,0.5)" }}
  >

  <div className="modal-dialog">

  <div className="modal-content">

  <div className="modal-header">

  <h5>Update Order Status</h5>

  <button
      className="btn-close"
      onClick={() => {
          setShowStatusModal(false);
          setSelectedOrder(null);
      }}
  ></button>

  </div>

  <div className="modal-body">

  <label className="form-label">

  Status

  </label>

  <select

  className="form-select"

  value={currentStatus}

  onChange={(e)=>setCurrentStatus(e.target.value)}

  >

<option value="Pending">Pending</option>
<option value="Preparing">Preparing</option>
<option value="Out for Delivery">Out for Delivery</option>
<option value="Delivered">Delivered</option>
<option value="Cancelled">Cancelled</option>

  </select>

  </div>

  <div className="modal-footer">

  <button

  className="btn btn-secondary"

  onClick={() => {
      setShowStatusModal(false);
      setSelectedOrder(null);
  }}

  >

  Cancel

  </button>

  <button

  className="btn btn-success"

  onClick={saveStatus}

  >

  Save Changes

  </button>

  </div>

  </div>

  </div>

  </div>

  )
  }

      </AdminLayout>
    );
  }