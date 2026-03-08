using DevExpress.XtraReports.UI;
using ReportServer.Models;
using System;
using System.Collections;
using System.ComponentModel;
using System.Drawing;
namespace RestaurantDesigns
{

    public partial class Restaurant4 : DevExpress.XtraReports.UI.XtraReport
    {

        public Restaurant4()
        {
            InitializeComponent();
            if (BufferModel.reportItems?.Count>0)
                BufferModel.reportItems= BufferModel.reportItems.OrderBy(p => p.category).ToList();
            this.DataSource = BufferModel.reportItems;  // Direct data source
            GroupField groupField = new GroupField("category");
            GroupHeader1.GroupFields.Add(groupField);
        }
    }
}
