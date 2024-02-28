import { useState } from "react";
import Header from "../components/Header";
import Menu from "../views/modal/Menu";
import Search from "../views/modal/Search";
import categories from "../utils/data/categories.json";
import products from "../utils/data/products.json";

const NavBar = () => {
  const [modalSearchVisible, setSearchModalVisible] = useState(false);
  const [modalMenuVisible, setMenuModalVisible] = useState(false);
  const [searchProductQuery, setSearchProductQuery] = useState("");
  const [searchCategoryQuery, setSearchCategoryQuery] = useState("");
  const [filteredProductList, setFilteredProductList] = useState([]);
  const [filteredCategoryList, setFilteredCategoryList] = useState(categories);

  const onHandleSearchModal = (value) => {
    setSearchModalVisible(value);
  };

  const onHandleMenuModal = (value) => {
    setMenuModalVisible(value);
  };

  const onSearchProductQuery = (e) => {
    if (e) {
      const newData = products.filter((item) => {
        const itemData =
          item.title || item.brand || item.category
            ? item.title.toLowerCase() ||
              item.brand.toLowerCase() ||
              item.category.toLowerCase()
            : "".toLowerCase();
        const searchProductData = e.toLowerCase();
        return itemData.indexOf(searchProductData) > -1;
      });
      setFilteredProductList(newData);
      setSearchProductQuery(e);
    } else {
      setFilteredProductList([]);
      setSearchProductQuery(e);
    }
  };

  const onSearchCategoryQuery = (e) => {
    if (e) {
      const newData = categories.filter((item) => {
        const itemData = item ? item.toLowerCase() : "".toLowerCase();
        const searchCategoryData = e.toLowerCase();
        return itemData.indexOf(searchCategoryData) > -1;
      });
      setFilteredCategoryList(newData);
      setSearchCategoryQuery(e);
    } else {
      setFilteredCategoryList(categories);
      setSearchCategoryQuery(e);
    }
  };

  return (
    <>
      <Menu
        modalMenuVisible={modalMenuVisible}
        onHandleMenuModal={onHandleMenuModal}
        categories={filteredCategoryList}
        searchCategoryQuery={searchCategoryQuery}
        onSearchCategoryQuery={onSearchCategoryQuery}
      />
      <Search
        modalSearchVisible={modalSearchVisible}
        onHandleSearchModal={onHandleSearchModal}
        products={filteredProductList}
        searchProductQuery={searchProductQuery}
        onSearchProductQuery={onSearchProductQuery}
      />

      <Header
        onHandleMenuModal={onHandleMenuModal}
        onHandleSearchModal={onHandleSearchModal}
      />
    </>
  );
};

export default NavBar;
