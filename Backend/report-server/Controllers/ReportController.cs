using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using DevExpress.XtraReports.UI;
using RestaurantDesigns;
using DevExpress.AspNetCore.Reporting.WebDocumentViewer;
using DevExpress.AspNetCore.Reporting.WebDocumentViewer.Native.Services;
using ReportServer.Models;
using System.Diagnostics;

namespace ReportServer.Controllers
{
    [ApiController]
    [Route("api/report")]
    public class ReportController : WebDocumentViewerController
    {
        public ReportController(IWebDocumentViewerMvcControllerService controllerService) : base(controllerService)
        {
        }

        [HttpPost("StoreReport")]
        public IActionResult CreateReport([FromBody] List<ItemsModel> items)
        {
            Debug.WriteLine("Reports are", items);
            BufferModel.reportItems = items;
            return Ok();
        }
    }
}
