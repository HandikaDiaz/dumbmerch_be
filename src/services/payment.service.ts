import midtrans from "../libs/midtrans";
import * as paymentRepository from "../repositories/payment.repository";

export async function initiatePayment(totalAmount: number) {
    const params = {
        transaction_details: {
            order_id: `order-${Date.now()}`,
            gross_amount: totalAmount,
        },
        item_details: [],
        callbacks: {
            finish: "http://localhost:3000/finish"
        },
    };

    return await paymentRepository.createTransaction(params);
}