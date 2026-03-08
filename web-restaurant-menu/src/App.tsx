import React, { useRef } from "react";
import { Toaster, toast } from "react-hot-toast";
import DataGrid, {
  Column,
  SearchPanel,
  Editing,
  ColumnChooser,
  Toolbar,
  Item,
} from "devextreme-react/data-grid";
import { HeaderFilter } from "devextreme-react/data-grid";
import ReportViewer, {
  Callbacks,
  RequestOptions,
} from "devexpress-reporting-react/dx-report-viewer";
import "devextreme/dist/css/dx.light.css";
import "@devexpress/analytics-core/dist/css/dx-analytics.common.css";
import "@devexpress/analytics-core/dist/css/dx-analytics.light.css";
import "devexpress-reporting/dist/css/dx-webdocumentviewer.css";
import { view } from "devexpress-reporting/scopes/reporting-chart-internal-series";
function App() {
  const [showViewer, setShowViewer] = React.useState(false);
  const [selectedMenuType, setSelectedMenuType] = React.useState(1);
  // **product table state**
  const [products, setProducts] = React.useState<
    {
      id: number;
      name: string;
      description: string;
      category: string;
      price: number;
    }[]
  >(() => {
    // realistic restaurant items
    return [
      {
        id: 1,
        name: "Cheese Burger",
        category: "Main Courses",
        priority: 2,
        description: "Beef, onion, cheese, egg",
        price: 400,
        url: "https://www.pngall.com/wp-content/uploads/19/Double-Burger-Mouthwatering-Savory-Flavorful-Bite-PNG.png",
      },
      {
        id: 2,
        name: "Doro Wat",
        category: "Main Courses",
        priority: 2,
        description: "Chicken, Onion, Ginger, Garlic, Butter, Spices, Injera",
        price: 700,
        url: "https://www.pngall.com/wp-content/uploads/18/Satisfying-Chicken-Biryani-With-Egg-Homemade-Flavor-PNG.png",
      },
      {
        id: 3,
        name: "Veggie Soup",
        category: "Appetizers",
        priority: 1,
        description: "Tomato, bell pepper, onion, cheese",
        price: 150,
        url: "https://www.pngall.com/wp-content/uploads/2018/04/Soup-PNG-Pic.png",
      },
      {
        id: 4,
        name: "Chicken Shawarma",
        category: "Main Courses",
        priority: 2,
        description: "Chicken, tahini, vegetables, pita",
        price: 1500,
        url: "https://www.pngall.com/wp-content/uploads/2016/03/Meat-Transparent.png",
      },
      {
        id: 6,
        name: "Beef Steak",
        category: "Main Courses",
        priority: 2,
        description: "Beef, salt, pepper, garlic",
        price: 2500,
        url: "https://www.pngall.com/wp-content/uploads/14/Steak-Transparent.png",
      },
      {
        id: 7,
        name: "Margherita Pizza",
        category: "Main Courses",
        priority: 2,
        description: "Tomato sauce, mozzarella, basil",
        price: 550,
        url: "https://www.pngall.com/wp-content/uploads/4/Dominos-Pizza-Slice-PNG-Picture.png",
      },
      {
        id: 8,
        name: "Chicken Nuggets",
        category: "Main Courses",
        priority: 2,
        description: "Chicken, bread crumbs, spices",
        price: 600,
        url: "https://www.pngall.com/wp-content/uploads/15/Chicken-Nuggets-PNG-Photos.png",
      },
      {
        id: 9,
        name: "Orange Juice",
        category: "Beverages",
        priority: 4,
        description: "Fresh orange, sugar, water",
        price: 118,
        url: "https://www.pngall.com/wp-content/uploads/2016/04/Juice-Download-PNG.png",
      },
      {
        id: 11,
        name: "Sambusa",
        category: "Appetizers",
        priority: 3,
        description: "Lentil, onion, spices",
        price: 50,
        url: "https://www.pngall.com/wp-content/uploads/9/Fried-Chicken-PNG-Image-File.png",
      },
      {
        id: 12,
        name: "Greek Salad",
        category: "Main Courses",
        priority: 2,
        description: "Tomato, cucumber, olives, feta",
        price: 1200,
        url: "https://www.pngall.com/wp-content/uploads/2016/05/Salad-PNG.png",
      },
      {
        id: 13,
        name: "Mango Smoothie",
        category: "Beverages",
        priority: 4,
        description: "Mango, yogurt, milk, honey",
        price: 200,
        url: "https://www.pngall.com/wp-content/uploads/2016/04/Juice-PNG-Clipart.png",
      },
      {
        id: 14,
        name: "Spaghetti Bolognese",
        category: "Main Courses",
        priority: 2,
        description: "Beef, tomato, pasta, herbs",
        price: 350,
        url: "https://www.pngall.com/wp-content/uploads/13/Spaghetti-PNG-Photos.png",
      },
      {
        id: 15,
        name: "Cappuccino",
        category: "Beverages",
        priority: 4,
        description: "Espresso, steamed milk, foam",
        price: 150,
        url: "https://www.pngall.com/wp-content/uploads/3/Espresso-PNG-Free-Download.png",
      },
      {
        id: 17,
        name: "Tiramisu",
        category: "Desserts",
        priority: 3,
        description: "Ladyfingers, mascarpone, coffee, cocoa",
        price: 1100,
        url: "https://www.pngall.com/wp-content/uploads/19/Red-Velvet-Cake-Sweet-Cream-Cheese-Frosting-PNG.png",
      },
      {
        id: 18,
        name: "Chocolate Cake",
        category: "Desserts",
        priority: 3,
        description: "Cocoa, flour, sugar, eggs",
        price: 256,
        url: "https://www.pngall.com/wp-content/uploads/8/Chocolate-Cake-PNG-Pic.png",
      },
    ];
  });
  React.useEffect(() => {
    (async () => {
      await fetch("http://localhost:52938/api/report/StoreReport", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(products),
      });
    })();
  }, [products]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortConfig, setSortConfig] = React.useState<{
    key: keyof (typeof products)[number];
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
          p.description.toLowerCase().includes(term),
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

  const requestSort = (key: keyof (typeof products)[number]) => {
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
    field: keyof (typeof products)[number],
    value: string | number,
  ) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    );
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
        <h2 className="text-2xl font-bold mb-4 text-orange-600 ">
          Product List
        </h2>
        <DataGrid
          dataSource={products}
          keyExpr="id"
          showBorders={true}
          allowColumnReordering={true}
          onRowUpdated={(e) => {
            const { id, name, description, price, category } = e.data;
            updateProduct(id, "name", name);
            updateProduct(id, "description", description);
            updateProduct(id, "price", price);
            updateProduct(id, "category", category);
            toast.success(`Product ${id} updated`);
          }}
        >
          <SearchPanel
            width={300}
            visible={true}
            highlightCaseSensitive={false}
          />
          <HeaderFilter visible={true} />
          <Editing
            mode="popup"
            allowUpdating={true}
            useIcons={true}
            popup={{
              title: "Edit Product",
              showTitle: true,
              width: 700,
              height: 500,
            }}
          />
          <ColumnChooser enabled={true} />
          <Toolbar>
            <Item name="columnChooserButton" />
          </Toolbar>
          <Column
            dataField="id"
            caption="SN"
            width={60}
            allowEditing={false}
            allowSorting={false}
          />
          <Column dataField="name" caption="Name" />
          <Column dataField="category" caption="Category" />
          <Column dataField="description" caption="Description" />
          <Column dataField="price" caption="Price" dataType="number" />
        </DataGrid>
      </div>

      {/* Report Viewer Modal */}
      {showViewer && (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
          <div className="w-5xl h-full bg-white relative">
            <button
              className="absolute top-3 right-3 text-gray-700 hover:text-gray-900 text-2xl z-10"
              onClick={() => setShowViewer(false)}
            >
              ✕
            </button>
            <ReportViewer
              reportUrl={getReportUrl(selectedMenuType)}
              height="100%"
            >
              <RequestOptions
                host="http://localhost:52938/"
                invokeAction="DXXRDV"
              />
            </ReportViewer>
          </div>
        </div>
      )}

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
                onChange={(e) =>
                  setEditProduct({ ...editProduct, name: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Description</label>
              <input
                className="border px-3 py-2 w-full rounded"
                value={editProduct.description}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-semibold">Price</label>
              <input
                type="number"
                className="border px-3 py-2 w-full rounded"
                value={editProduct.price}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    price: Number(e.target.value),
                  })
                }
              />
            </div>
            <button
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-800"
              onClick={() => {
                updateProduct(editProduct.id, "name", editProduct.name);
                updateProduct(
                  editProduct.id,
                  "description",
                  editProduct.description,
                );
                updateProduct(editProduct.id, "price", editProduct.price);
                toast.success(`Product updated successfully`);
                setModalOpen(false);
                setEditProduct(null);
              }}
            >
              Save
            </button>
          </div>
        </div>
      )}
      <Toaster position="top-center" />
    </div>
  );
}
export default App;
