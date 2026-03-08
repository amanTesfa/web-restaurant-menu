import React from "react";
import ReportViewer, {
  RequestOptions,
} from "devexpress-reporting-react/dx-report-viewer";
import "devextreme/dist/css/dx.light.css";
import "@devexpress/analytics-core/dist/css/dx-analytics.common.css";
import "@devexpress/analytics-core/dist/css/dx-analytics.light.css";
import "devexpress-reporting/dist/css/dx-webdocumentviewer.css";
function App() {
  const [showViewer, setShowViewer] = React.useState(false);
  const [selectedMenuType, setSelectedMenuType] = React.useState(1);
  const downloadPdf = async (menuType: number) => {
    setSelectedMenuType(menuType);
    setShowViewer(true);
  };

  const getReportUrl = (menuType: number) => {
    switch (menuType) {
      case 1:
        return "RestaurantDesigns.Restaurant1";
      case 2:
        return "RestaurantDesigns.Restaurant2";
      case 3:
        return "RestaurantDesigns.Restaurant3";
      case 4:
        return "RestaurantDesigns.Restaurant4";
      default:
        return "RestaurantDesigns.Restaurant1";
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-yellow-50 via-orange-100 to-yellow-100 flex flex-col items-center py-10">
      <div className="mb-10">
        <h1 className="text-5xl font-extrabold text-orange-600 drop-shadow-lg mb-2 text-center">
          Restaurant Menu Design
        </h1>
        <p className="text-lg text-orange-900 text-center">
          Please select a menu type from the buttons below to explore different
          design options.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        <button
          className="cursor-pointer px-6 py-3 bg-orange-600 text-white rounded-lg shadow-md hover:bg-orange-800 transition duration-300"
          onClick={() => downloadPdf(1)}
        >
          Menu #1
        </button>
        <button
          className="cursor-pointer px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-800 transition duration-300"
          onClick={() => downloadPdf(2)}
        >
          Menu #2
        </button>
        <button
          className="cursor-pointer px-6 py-3 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-800 transition duration-300"
          onClick={() => downloadPdf(3)}
        >
          Menu #3
        </button>
        <button
          className="cursor-pointer px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-800 transition duration-300"
          onClick={() => downloadPdf(4)}
        >
          Menu #4
        </button>
      </div>
      {showViewer && (
        <ReportViewer reportUrl={getReportUrl(selectedMenuType)}>
          <RequestOptions host="http://localhost:5000/" invokeAction="DXXRDV" />
        </ReportViewer>
      )}
    </div>
  );
}
export default App;
