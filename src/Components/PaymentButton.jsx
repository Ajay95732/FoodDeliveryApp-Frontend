import axios from "axios";


function PaymentButton(){

    const payNow = async()=>{

        try{

            // 1. Create Razorpay order

            const response = await axios.post(
                "https://localhost:7249/api/Payment/create-order",
                {
                    amount:500
                }
            );


            const order=response.data;


            // 2. Razorpay options

            const options={

                key:"rzp_test_TFixQhkoksdGGf",

                amount:order.amount,

                currency:"INR",

                name:"Food Delivery App",

                description:"Food Order Payment",

                order_id:order.id,


                handler:function(response){

                    verifyPayment(response);

                },


                theme:{
                    color:"#3399cc"
                }

            };



            const razor =
                new window.Razorpay(options);


            razor.open();


        }
        catch(error){

            console.log(error);

        }

    }




    const verifyPayment=async(payment)=>{


        const response =
        await axios.post(
            "https://localhost:7249/api/Payment/verify",
            {

                razorpayOrderId:
                payment.razorpay_order_id,


                razorpayPaymentId:
                payment.razorpay_payment_id,


                razorpaySignature:
                payment.razorpay_signature

            }
        );


        alert(response.data.message);


    }



    return(
        <button onClick={payNow}>
            Pay Now
        </button>
    )

}


export default PaymentButton;