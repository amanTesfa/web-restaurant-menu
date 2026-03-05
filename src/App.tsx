import React from "react";
import { Toaster, toast } from "react-hot-toast";
import DataGrid, { Column, SearchPanel, Editing } from "devextreme-react/data-grid";
import { HeaderFilter } from "devextreme-react/data-grid";
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

  // **product table state**
  const [products, setProducts] = React.useState<
    { id: number; name: string; description: string; category:string; price: number }[]
  >(() => {
    // realistic restaurant items
    return [
      { id: 1, name: "Double cheese Burger", category: "Main Courses", description: "Beef, onion, cheese, egg", price: 400 },
      { id: 2, name: "Doro Wat", category: "Main Courses", description: "Chicken, Onion, Ginger, Garlic, Butter, Spices, Injera", price: 700 },
      { id: 3, name: "Veggie Soup", category: "Appetizers", description: "Tomato, bell pepper, onion, cheese", price: 150 },
      { id: 4, name: "Chicken Shawarma", category: "Main Courses", description: "Chicken, tahini, vegetables, pita", price: 1500 },
      { id: 5, name: "Caesar Salad", category: "Appetizers", description: "Lettuce, croutons, parmesan, dressing", price: 200 },
      { id: 6, name: "Beef Steak", category: "Main Courses", description: "Beef, salt, pepper, garlic", price: 2500 },
      { id: 7, name: "Margherita Pizza", category: "Main Courses", description: "Tomato sauce, mozzarella, basil", price: 550 },
      { id: 8, name: "Chicken Nuggets", category: "Main Courses", description: "Chicken, bread crumbs, spices", price: 600 },
      { id: 9, name: "Pineapple Juice", category: "Beverages", description: "Fresh pineapple, sugar, water", price: 118 },
      { id: 10, name: "Fish and Chips", category: "Main Courses", description: "Fish, potatoes, batter, tartar sauce", price: 200 },
      { id: 11, name: "Sambusa", category: "Appetizers", description: "Lentil, onion, spices", price: 50 },
      { id: 12, name: "Greek Salad", category: "Appetizers", description: "Tomato, cucumber, olives, feta", price: 1200 },
      { id: 13, name: "Mango Smoothie", category: "Beverages", description: "Mango, yogurt, milk, honey", price: 200 },
      { id: 14, name: "Spaghetti Bolognese", category: "Main Courses", description: "Beef, tomato, pasta, herbs", price: 350 },
      { id: 15, name: "Cappuccino", category: "Beverages", description: "Espresso, steamed milk, foam", price: 150 },
      { id: 16, name: "Lazanya", category: "Main Courses", description: "Layered pasta, meat sauce, ricotta", price: 900 },
      { id: 17, name: "Tiramisu", category: "Desserts", description: "Ladyfingers, mascarpone, coffee, cocoa", price: 1100 },
      { id: 18, name: "Chocolate Cake", category: "Desserts", description: "Cocoa, flour, sugar, eggs", price: 256 },
      { id: 19, name: "Fruit Salad", category: "Desserts", description: "Mixed fruits, honey, mint", price: 500 },
      { id: 20, name: "Latte Coffee", category: "Beverages", description: "Espresso, steamed milk, foam", price: 300 },
    ];
  });
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortConfig, setSortConfig] = React.useState<{
    key: keyof typeof products[number];
    direction: "asc" | "desc";
  } | null>(null);

  const [modalOpen, setModalOpen] = React.useState(false);
  const [editProduct, setEditProduct] = React.useState<any>(null);

  const downloadPdf = async (menuType: number) => {
    setSelectedMenuType(menuType);
    setShowViewer(true);
  };


  // helper to add toast messages
  const addToast = (msg: string) => {
    toast.success(msg);
  };

  const sortedFiltered = React.useMemo(() => {
    let items = products;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term)
      );
    }
    if (sortConfig !== null) {
      items = [...items].sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return items;
  }, [products, searchTerm, sortConfig]);

  const requestSort = (
    key: keyof typeof products[number]
  ) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const updateProduct = (
    id: number,
    field: keyof typeof products[number],
    value: string | number
  ) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, [field]: value } : p
      )
    );
    toast.success(`Product ${id} updated`);
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
      <div className="w-full max-w-4xl mt-10 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-orange-600 ">Product List</h2>
        <DataGrid
          dataSource={products}
          keyExpr="id"
          showBorders={true}
          onRowUpdated={e => {
            const { id, name, description, price, category } = e.data;
            updateProduct(id, 'name', name);
            updateProduct(id, 'description', description);
            updateProduct(id, 'price', price);
            updateProduct(id, 'category', category);
          }}
        >
          <SearchPanel width={300} visible={true} highlightCaseSensitive={false} />
          <HeaderFilter visible={true} />
          <Editing
            mode="popup"
            allowUpdating={true}
            useIcons={true}
            
            popup={{ title: 'Edit Product', showTitle: true, width: 700, height: 500 }}
          />
          <Column dataField="id" caption="SN" width={60} allowEditing={false} />
          <Column dataField="name" caption="Name" />
          <Column dataField="category" caption="Category" />
          <Column dataField="description" caption="Description" />
          <Column dataField="price" caption="Price" dataType="number" />
        </DataGrid>
      </div>

      {/* Edit Modal */}
      {modalOpen && editProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-11/12 max-w-md p-6 relative shadow-2xl">
            <button
              className="absolute top-3 right-3 text-gray-700 hover:text-gray-900"
              onClick={() => setModalOpen(false)}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Name</label>
              <input
                className="border px-3 py-2 w-full rounded"
                value={editProduct.name}
                onChange={e => setEditProduct({ ...editProduct, name: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Description</label>
              <input
                className="border px-3 py-2 w-full rounded"
                value={editProduct.description}
                onChange={e => setEditProduct({ ...editProduct, description: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Price</label>
              <input
                type="number"
                className="border px-3 py-2 w-full rounded"
                value={editProduct.price}
                onChange={e => setEditProduct({ ...editProduct, price: Number(e.target.value) })}
              />
            </div>
            <button
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-800"
              onClick={() => {
                updateProduct(editProduct.id, 'name', editProduct.name);
                updateProduct(editProduct.id, 'description', editProduct.description);
                updateProduct(editProduct.id, 'price', editProduct.price);
                setModalOpen(false);
                setEditProduct(null);
              }}
            >
              Save
            </button>
          </div>
        </div>
      )}
      <Toaster position="top-right" />
      {showViewer && (
        <ReportViewer reportUrl={getReportUrl(selectedMenuType)}>
          <RequestOptions host="http://localhost:5000/" invokeAction="DXXRDV" />
        </ReportViewer>
      )}
    </div>
  );
}
export default App;
