using DevExpress.XtraReports.UI;
using ReportServer.Models;
using System;
using System.Collections;
using System.ComponentModel;
using System.Drawing;
using static DevExpress.DataProcessing.InMemoryDataProcessor.AddSurrogateOperationAlgorithm;

namespace RestaurantDesigns
{
    public partial class Restaurant2 : DevExpress.XtraReports.UI.XtraReport
    {
        public Restaurant2()
        {
            InitializeComponent();
            // diagnostic: check whether the buffer has been populated
            var raw = BufferModel.reportItems;
            System.Diagnostics.Debug.WriteLine($"Restaurant2 ctor: BufferModel.reportItems count={raw?.Count}");
            // build a two-column data source by pairing sequential items
            List<ItemsModelMultiple> _datasource = new List<ItemsModelMultiple>();

            if (BufferModel.reportItems?.Count > 0)
            {
                var allitems = BufferModel.reportItems.OrderBy(p => p.priority).ToList();

                // iterate by twos so that each row contains at most two menu entries
                for (int i = 0; i < allitems.Count; i += 2)
                {
                    var first = allitems[i];
                    if (i + 1 < allitems.Count)
                    {
                        var second = allitems[i + 1];
                        _datasource.Add(new ItemsModelMultiple
                        {
                            name = first.name,
                            description = first.description,
                            price = first.price,
                            imageURL = first.url,
                            name2 = second.name,
                            description2 = second.description,
                            price2 = second.price,
                            imageURL2 = second.url
                        });
                    }
                    else
                    {
                        // odd count: add a single item in the left column only
                        _datasource.Add(new ItemsModelMultiple
                        {
                            name = first.name,
                            description = first.description,
                            price = first.price,
                            imageURL = first.url
                        });
                    }
                }
            }

            // if we didn't pair anything, log a warning so we can debug empty reports
            if (_datasource.Count == 0)
            {
                System.Diagnostics.Debug.WriteLine("Restaurant2: no items to display, check BufferModel.reportItems");
            }
            // bypass the designer's object data source and feed the list directly
            this.DataSource = _datasource;
            // setting the objectDataSource is unnecessary, but keep it for design-time compatibility
            if (this.objectDataSource1 != null)
                this.objectDataSource1.DataSource = _datasource;

        }
    }
}
