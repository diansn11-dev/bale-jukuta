import { NextResponse } from "next/server";
import ExcelJS from "exceljs";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  try {
    const { data: orders, error } = await supabaseAdmin
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw error;
    }

    const workbook = new ExcelJS.Workbook();

    workbook.creator = "Bale Juku' Ta'";
    workbook.created = new Date();

    const worksheet = workbook.addWorksheet("Laporan Penjualan");

    worksheet.columns = [
      {
        header: "No",
        key: "no",
        width: 8,
      },
      {
        header: "Tanggal",
        key: "tanggal",
        width: 20,
      },
      {
        header: "Nama Pelanggan",
        key: "pelanggan",
        width: 30,
      },
      {
        header: "No WhatsApp",
        key: "phone",
        width: 20,
      },
      {
        header: "Status",
        key: "status",
        width: 18,
      },
      {
        header: "Total",
        key: "total",
        width: 20,
      },
    ];

    // Header
    worksheet.getRow(1).font = {
      bold: true,
      color: { argb: "FFFFFF" },
    };

    worksheet.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: {
        argb: "0284C7",
      },
    };

    worksheet.getRow(1).alignment = {
      horizontal: "center",
      vertical: "middle",
    };

    orders?.forEach((order, index) => {
      worksheet.addRow({
        no: index + 1,
        tanggal: new Date(order.created_at).toLocaleDateString("id-ID"),
        pelanggan: order.customer_name,
        phone: order.customer_phone,
        status: order.status,
        total: Number(String(order.total_price).replace(/[^0-9]/g, "")),
      });
    });

    worksheet.getColumn("total").numFmt = '"Rp" #,##0';

    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: "thin" },
          bottom: { style: "thin" },
          left: { style: "thin" },
          right: { style: "thin" },
        };
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();

    return new NextResponse(Buffer.from(buffer), {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": 'attachment; filename="laporan-penjualan.xlsx"',
      },
    });
  } catch (error: any) {
    console.error("EXPORT EXCEL ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      },
    );
  }
}
