# Report Server (ASP.NET Core)

This folder contains a minimal ASP.NET Core Web API scaffold to serve DevExpress XtraReports.

Prerequisites

- .NET 8 SDK (or change TargetFramework in the csproj)
- Access to DevExpress NuGet packages (DevExpress.AspNetCore.Reporting and DevExpress.XtraReports)

Quick start

```powershell
cd report-server
dotnet restore
dotnet run --urls "https://localhost:5001"
```

Endpoints

- POST /api/report/pdf
  - Body: { "reportUrl": "MyNamespace.Reports.MenuReport", "parameters": { ... } }
  - Returns: application/pdf

Notes

- Place .repx layout files in the `Reports/` folder or use CLR type names for reports.
- If you have DevExpress Reporting server components, you can wire up the full WebDocumentViewer endpoints; otherwise this server provides a simple PDF generation endpoint.
