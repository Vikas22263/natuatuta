import React, { useState, useEffect } from "react";

import axios from "axios";
import { Checkbox } from "antd";
import { Radio } from "antd";

import { useCart } from "../context/cart";
import { json, useNavigate } from "react-router-dom";
import { Prices } from "./prices";


const Homepage = () => {
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [selectedRadioValue, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [Loading, setLoading] = useState(false);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-category"
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8080/api/v1/products/product-list/${page}`
      );
      const { data } = response;
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (!checked.length || !selectedRadioValue.length) {
      getAllProducts();
    } else {
      filterProduct();
    }
  }, [checked, selectedRadioValue]);

  // filterby cat
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  // get filter products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/api/v1/products/product-filters",
        { checked, selectedRadioValue }
      );
     
      setProducts(data?.products);
    } catch (error) {
 
    }
  };
  //get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/products/product-count/"
      );
      setTotal(data?.total);
    } catch (error) {
     
    }
  };
  //loadmore
  const loadMore = async () => {
    setLoading(true);
    const { data } = await axios.get(
      `http://localhost:8080/api/v1/products/product-list/${page}`
    );
    setLoading(false);
    setProducts([...products, ...data.products]);
  };
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  return (
    <>
      <div className="row mt-3">
        <div className="col-md-2 ">
          <h4 className="text-center">Filter By Category</h4>

          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              on
              onClick={() => window.location.reload()}
            >
              RESET FILTER
            </button>
          </div>
        </div>
        <div className="col-md-9 ml-10 ">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`http://localhost:8080/api/v1/products/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className=" capitalize text-lg font-bold">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> ₹ {p.price}</p>
                  
                  <button
                    className="btn btn-primary ms-1 mt-2"
                    onClick={() => {setCart([...cart, p])
                    localStorage.setItem('cart',JSON.stringify([...cart, p]))   
                 }}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {Loading ? "Loading" : "Loadmore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
