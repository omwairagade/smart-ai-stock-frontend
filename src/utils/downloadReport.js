import { products, getStockStatus } from "../data/products";
import { suppliers } from "../data/suppliers";
import { purchaseOrders, calculateTotal } from "../data/purchaseOrders";
import { productForecasts } from "../data/forecasts";

function sanitizeFileName(name) {
  return name.replace(/[\\/:*?"<>|]/g, "-");
}

function formatMoney(value) {
  return "Rs. " + Number(value).toLocaleString("en-IN");
}

function statusLabel(status) {
  if (status === "out") return "Out of Stock";
  if (status === "low") return "Low Stock";
  return "Healthy";
}

function getReportTableData(category) {
  if (category === "Inventory") {
    return {
      headers: ["Product", "SKU", "Category", "Stock", "Reorder Pt.", "Unit Price", "Status"],
      rows: products.map(function (p) {
        return [
          p.name,
          p.sku,
          p.category,
          String(p.currentStock),
          String(p.reorderPoint),
          formatMoney(p.unitPrice),
          statusLabel(getStockStatus(p)),
        ];
      }),
    };
  }

  if (category === "Suppliers") {
    return {
      headers: ["Supplier", "Category", "Reliability", "On-Time Rate", "Total Orders", "Avg Delivery (days)", "Status"],
      rows: suppliers.map(function (s) {
        return [
          s.name,
          s.category,
          s.reliabilityScore + "%",
          s.onTimeRate + "%",
          String(s.totalOrders),
          String(s.avgDeliveryDays),
          s.status,
        ];
      }),
    };
  }

  if (category === "Purchases") {
    return {
      headers: ["PO ID", "Supplier", "Status", "Order Date", "Expected Delivery", "Total Value", "AI Suggested"],
      rows: purchaseOrders.map(function (po) {
        return [
          po.id,
          po.supplier,
          po.status,
          po.orderDate,
          po.expectedDelivery,
          formatMoney(calculateTotal(po.items)),
          po.isAiSuggested ? "Yes" : "No",
        ];
      }),
    };
  }

  if (category === "Forecasting") {
    return {
      headers: ["Product", "SKU", "Current Stock", "Predicted Demand (30d)", "Trend", "Reorder Qty", "Reorder Date", "Confidence"],
      rows: productForecasts.map(function (f) {
        return [
          f.name,
          f.sku,
          String(f.currentStock),
          String(f.predictedDemand30d),
          f.trend + " (" + f.trendPercent + "%)",
          String(f.recommendedReorderQty),
          f.recommendedReorderDate,
          f.confidence + "%",
        ];
      }),
    };
  }

  if (category === "Financial") {
    var totalStockCost = products.reduce(function (sum, p) { return sum + p.currentStock * p.costPrice; }, 0);
    var totalStockRetail = products.reduce(function (sum, p) { return sum + p.currentStock * p.unitPrice; }, 0);
    var totalOpenPOValue = purchaseOrders
      .filter(function (po) { return po.status !== "delivered" && po.status !== "cancelled"; })
      .reduce(function (sum, po) { return sum + calculateTotal(po.items); }, 0);

    return {
      headers: ["Metric", "Value"],
      rows: [
        ["Total Stock Value (Cost)", formatMoney(totalStockCost)],
        ["Total Stock Value (Retail)", formatMoney(totalStockRetail)],
        ["Total Open PO Value", formatMoney(totalOpenPOValue)],
        ["Total Purchase Orders", String(purchaseOrders.length)],
        ["Total Products Tracked", String(products.length)],
      ],
    };
  }

  return null;
}

function downloadAsPDF(report) {
  return Promise.all([import("jspdf"), import("jspdf-autotable")]).then(function (mods) {
    var jsPDF = mods[0].jsPDF;
    var autoTable = mods[1].default;

    var doc = new jsPDF();

    doc.setFontSize(16);
    doc.setFont(undefined, "bold");
    doc.text("StockSync AI - Report Export", 20, 20);

    doc.setDrawColor(200);
    doc.line(20, 25, 190, 25);

    doc.setFontSize(13);
    doc.setFont(undefined, "bold");
    doc.text(report.name, 20, 38);

    doc.setFontSize(11);
    doc.setFont(undefined, "normal");
    var lines = [
      "Category: " + report.category,
      "Generated Date: " + report.generatedDate,
      "File Size: " + report.size,
    ];
    var y = 48;
    lines.forEach(function (line) {
      doc.text(line, 20, y);
      y += 7;
    });

    var tableData = getReportTableData(report.category);

    if (tableData) {
      autoTable(doc, {
        startY: y + 6,
        head: [tableData.headers],
        body: tableData.rows,
        theme: "grid",
        styles: { fontSize: 8, cellPadding: 3 },
        headStyles: { fillColor: [37, 99, 235], textColor: 255, fontStyle: "bold" },
        alternateRowStyles: { fillColor: [245, 247, 250] },
      });
    }

    var finalY = tableData ? doc.lastAutoTable.finalY + 10 : y + 10;
    doc.setFontSize(9);
    doc.setTextColor(140);
    doc.text("This is a system-generated report from StockSync AI.", 20, finalY);

    doc.save(sanitizeFileName(report.name) + ".pdf");
  });
}

function downloadAsExcel(report) {
  return import("xlsx").then(function (XLSX) {
    var data = [
      ["StockSync AI - Report Export"],
      [],
      ["Report Name", report.name],
      ["Category", report.category],
      ["Generated Date", report.generatedDate],
      ["File Size", report.size],
      [],
    ];

    var tableData = getReportTableData(report.category);

    if (tableData) {
      data.push(tableData.headers);
      tableData.rows.forEach(function (row) {
        data.push(row);
      });
    }

    var worksheet = XLSX.utils.aoa_to_sheet(data);
    worksheet["!cols"] = (tableData ? tableData.headers : []).map(function () {
      return { wch: 20 };
    });

    var workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

    XLSX.writeFile(workbook, sanitizeFileName(report.name) + ".xlsx");
  });
}

export function downloadReport(report) {
  if (report.type === "Excel") {
    return downloadAsExcel(report);
  }
  return downloadAsPDF(report);
}
