using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using DevExpress.AspNetCore;
using DevExpress.AspNetCore.Reporting;
using DevExpress.XtraReports.Web.Extensions;
using DevExpress.XtraReports.UI;
using RestaurantDesigns;
using ReportServer.Controllers;
using ReportServer.Models;
using System.Diagnostics;

var builder = WebApplication.CreateBuilder(args);

// configure CORS to allow requests from the frontend
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddControllers();
builder.Services.AddDevExpressControls();
builder.Services.AddScoped<DevExpress.AspNetCore.Reporting.ReportDesigner.ReportDesignerController, CustomReportDesignerController>();
builder.Services.AddScoped<DevExpress.AspNetCore.Reporting.WebDocumentViewer.WebDocumentViewerController, CustomWebDocumentViewerController>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddScoped<ReportStorageWebExtension, CustomReportStorage>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
app.UseRouting();


app.UseAuthorization();
app.UseDevExpressControls();
app.MapControllers();
app.UseCors("AllowAll");
app.Run();

// Custom report storage implementation
public class CustomReportStorage : ReportStorageWebExtension
{

    public override bool CanSetData(string url) => true;
    public override bool IsValidUrl(string url) => true;

    public override byte[] GetData(string url)
    {
        XtraReport report = null;
        Debug.WriteLine("Reports are", BufferModel.reportItems);

        if (url == "RestaurantDesigns.Restaurant1")
        {

            report = new Restaurant1();
        }
        else if (url == "RestaurantDesigns.Restaurant2")
        {
            report = new Restaurant2();
        }
        else if (url == "RestaurantDesigns.Restaurant3")
        { report = new Restaurant3(); }

        else if (url == "RestaurantDesigns.Restaurant4")
        {
            report = new Restaurant4();
        }

        if (report != null)
        {
            using var ms = new MemoryStream();
            report.SaveLayoutToXml(ms);
            return ms.ToArray();
        }

        throw new DevExpress.XtraReports.Web.ClientControls.FaultException($"Report '{url}' not found.");
    }

    public override Dictionary<string, string> GetUrls()
    {
        return new Dictionary<string, string>
        {
            ["RestaurantDesigns.Restaurant1"] = "RestaurantDesigns.Restaurant1",
            ["RestaurantDesigns.Restaurant2"] = "RestaurantDesigns.Restaurant2",
            ["RestaurantDesigns.Restaurant3"] = "RestaurantDesigns.Restaurant3",
            ["RestaurantDesigns.Restaurant4"] = "RestaurantDesigns.Restaurant4"
        };
    }

    public override void SetData(XtraReport report, string url) { }
    public override string SetNewData(XtraReport report, string defaultUrl) => defaultUrl;
}
