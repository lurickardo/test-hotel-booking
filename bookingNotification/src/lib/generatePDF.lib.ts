import * as fs from "node:fs";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { utils } from "../config/utils";
import type { Booking } from "../database/entities/booking.entity";
import { translatePaymentMethod } from "../enum/paymentMethod.enum";
import * as path from "node:path";
import { randomUUID } from "node:crypto";

export const generatePDF = {
	createBookingInfoPDF: async ({
		customerName,
		customerEmail,
		vlBooking,
		dtCheckIn,
		dtCheckOut,
		room,
		paymentMethod,
	}: Partial<Booking>): Promise<Buffer> => {
		const pdfDoc = await PDFDocument.create();
		const timesRomanFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
		const page = pdfDoc.addPage();
		const { height } = page.getSize();

		const lineHeight = 20;
		let yPosition = height - 50;

		const addLine = (text) => {
			page.drawText(text, {
				x: 50,
				y: yPosition,
				size: 15,
				font: timesRomanFont,
				color: rgb(0, 0, 0),
			});
			yPosition -= lineHeight;
		};

		page.drawText("Informações da sua reserva", {
			x: 50,
			y: yPosition,
			size: 30,
			font: timesRomanFont,
			color: rgb(0, 0, 0),
		});
		yPosition -= lineHeight * 2;

		addLine(`Cliente: ${customerName}`);
		addLine(`E-mail: ${customerEmail}`);
		addLine(`Valor da Reserva: ${vlBooking}`);
		addLine(`Check-In: ${utils.formatDate(String(dtCheckIn))}`);
		addLine(`Check-Out: ${utils.formatDate(String(dtCheckOut))}`);
		addLine(`Quarto: ${room}`);
		addLine(`Método de Pagamento: ${translatePaymentMethod(paymentMethod)}`);

		const pdfBytes = await pdfDoc.save();
		return Buffer.from(pdfBytes);
	},
};
