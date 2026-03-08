using DevExpress.XtraReports.UI;
using ReportServer.Models;
using System;
using System.Collections;
using System.ComponentModel;
using System.Drawing;

namespace RestaurantDesigns
{
    public partial class Restaurant3 : DevExpress.XtraReports.UI.XtraReport
    {
        public Restaurant3()
        {
            InitializeComponent();
            if (BufferModel.reportItems?.Count > 0)
            {
                var allcat = BufferModel.reportItems.OrderBy(p=>p.priority).GroupBy(x => x.category.Trim()).Select(y => y.FirstOrDefault()).ToList();
                int i = 1;
                foreach (var cat in allcat)
                {
                    int j = 1;
                    foreach (var item in BufferModel.reportItems.Where(x => x.category.Trim() == cat.category.Trim()))
                    {
                        if (j == 1 && (i == 1 || i == 2)) {
                            if (i == 1)
                            {
                                cat1.Text = item.category;
                                firstCatValue.Text = item.name;
                                firstCatPrice.Text = string.Format("{0} Birr", item.price);
                            }
                            else if (i == 2)
                            {
                                cat2.Text = item.category;
                                SecondCatValue.Text = item.name;
                                SecondCatPrice.Text = string.Format("{0} Birr", item.price);
                            }
                        }
                        else
                        {
                            XRTableRow xrowDraw = new XRTableRow();
                            XRTableCell spaceCell1 = new XRTableCell();
                            spaceCell1.Text = " ";
                            XRTableCell spaceCell2 = new XRTableCell();
                            spaceCell2.Text = " ";
                            xrowDraw.BackColor = Color.Transparent;
                            xrowDraw.Padding = new DevExpress.XtraPrinting.PaddingInfo(2, 2, 3, 3);
                            xrowDraw.Cells.AddRange(new XRTableCell[] { spaceCell1, spaceCell2 });

                            XRTableRow xrowDraw3 = new XRTableRow();
                            xrowDraw3.BackColor = Color.Transparent;
                            XRTableCell spaceCell3 = new XRTableCell();
                            spaceCell3.Text = " ";
                            XRTableCell spaceCell4 = new XRTableCell();
                            spaceCell4.Text = " ";
                            xrowDraw3.Cells.AddRange(new XRTableCell[] { spaceCell3, spaceCell4 });

                            XRTableRow xrowDraw4 = new XRTableRow();
                            xrowDraw4.Padding = new DevExpress.XtraPrinting.PaddingInfo(2, 2, 5, 5);
                            XRTableCell detailValue = new XRTableCell();
                            detailValue.Text = item.name;
                            detailValue.WidthF = 262.95f;
                            detailValue.Font = new System.Drawing.Font("Tahoma", 12F, System.Drawing.FontStyle.Regular);
                            detailValue.ForeColor = Color.White;
                            XRTableCell detailPrice = new XRTableCell();
                            detailPrice.Text = string.Format("{0} Birr", item.price);
                            detailPrice.Font = new System.Drawing.Font("Tahoma", 12F, System.Drawing.FontStyle.Bold);
                            detailPrice.ForeColor = Color.Orange;
                            detailPrice.WidthF = 86.17f;
                            xrowDraw4.BackColor = Color.Transparent;
                            xrowDraw4.Cells.AddRange(new XRTableCell[] { detailValue, detailPrice });
                         

                            if (i % 2 != 0)
                            {
                                if (j == 1)
                                {
                                    XRTableRow xrowDraw2 = new XRTableRow();
                                    XRTableCell catDraw = new XRTableCell();
                                    catDraw.Text = item.category;
                                    catDraw.Padding = new DevExpress.XtraPrinting.PaddingInfo(5, 5, 7, 7);
                                    catDraw.Font = new System.Drawing.Font("Tahoma", 16F, System.Drawing.FontStyle.Bold);
                                    catDraw.ForeColor = Color.Black;
                                    catDraw.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopCenter;
                                    xrowDraw2.BackColor = Color.Orange;
                                    xrowDraw2.Cells.Add(catDraw);

                                    Table2.Rows.AddRange(new XRTableRow[] { xrowDraw, xrowDraw2, xrowDraw3, xrowDraw4 });
                                }
                                else
                                {
                                    Table2.Rows.AddRange(new XRTableRow[] { xrowDraw4 });
                                }

                            }
                            else
                            {
                                if (j == 1)
                                {
                                    XRTableRow xrowDraw2 = new XRTableRow();
                                    XRTableCell catDraw = new XRTableCell();
                                    xrowDraw2.BackColor = Color.Orange;
                                    catDraw.Text = item.category;
                                    catDraw.Font = new System.Drawing.Font("Tahoma", 16F, System.Drawing.FontStyle.Bold);
                                    catDraw.ForeColor = Color.Black;
                                    catDraw.Padding = new DevExpress.XtraPrinting.PaddingInfo(5, 5, 5, 5);
                                    catDraw.TextAlignment = DevExpress.XtraPrinting.TextAlignment.TopCenter;
                                    xrowDraw2.Cells.Add(catDraw);

                                    Table1.Rows.AddRange(new XRTableRow[] { xrowDraw, xrowDraw2, xrowDraw3, xrowDraw4 });
                                }
                                else
                                {
                                    Table1.Rows.AddRange(new XRTableRow[] {xrowDraw4 });
                                }

                            }
                        }
                       
                        j++;
                    }

                    i++;
                }
            }
        }
    }
}
