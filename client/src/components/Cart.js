import React from "react";
import { Link } from "react-router-dom";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { useCart } from "../context/cart";

export default function ProductCards() {
  const [cart, setCart] = useCart();

  const removeCart = (pid) => {
    let mycart = [...cart];
    let index = mycart.findIndex((item) => item._id === pid);
    mycart.splice(index, 1);
    setCart(mycart);
    localStorage.setItem("cart", JSON.stringify(mycart));
  };
 
  return (
    <section className="h-100" style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol md="10">
            <div className="d-flex justify-content-between align-items-center mb-4"></div>
            {cart.length === 0 ? (
              <>
                <h1 className="d-flex justify-content-center align-items-center ">
                  {" "}
                  Your cart is empty. Start shopping now!
                </h1>
              </>
            ) : (
              <>
                <MDBTypography tag="h3" className="fw-normal mb-1 text-black">
                  Shopping Cart
                </MDBTypography>
                <MDBCard className="rounded-3 mb-4">
                  <MDBCardBody className="p-4">
                    {cart.map((p) => (
                      <MDBRow className="justify-content-between align-items-center">
                        <MDBCol md="2" lg="2" xl="2">
                          <MDBCardImage
                            className="rounded-3"
                            fluid
                            src={`http://localhost:8080/api/v1/products/product-photo/${p._id}`}
                            alt="Cotton T-shirt"
                          />
                        </MDBCol>
                        <MDBCol md="3" lg="3" xl="3">
                          <p className="lead fw-normal mb-2">{p.name}</p>
                        </MDBCol>
                        <MDBCol
                          md="3"
                          lg="3"
                          xl="2"
                          className="d-flex align-items-center justify-content-around"
                        >
                          <MDBBtn color="link" className="px-2">
                            <MDBIcon fas icon="minus" />
                          </MDBBtn>

                          <MDBInput
                            min={0}
                            defaultValue={1}
                            type="number"
                            size="sm"
                          />

                          <MDBBtn color="link" className="px-2">
                            <MDBIcon fas icon="plus" />
                          </MDBBtn>
                        </MDBCol>
                        <MDBCol md="3" lg="2" xl="2" className="offset-lg-1">
                          <MDBTypography tag="h5" className="mb-0">
                            ₹ {p.price}
                          </MDBTypography>
                        </MDBCol>
                        <MDBCol md="1" lg="1" xl="1" className="text-end">
                          <button
                            href="#!"
                            className="text-danger"
                            onClick={() => removeCart(p._id)}
                          >
                            <MDBIcon fas icon="trash text-danger" size="lg" />
                          </button>
                        </MDBCol>
                      </MDBRow>
                    ))}
                  </MDBCardBody>
                </MDBCard>

                <MDBCard>
                  <MDBCardBody>
                    <Link to="/checkout">
                      <MDBBtn className="ms-3" color="warning" block size="lg">
                        Checkout
                      </MDBBtn>
                    </Link>
                  </MDBCardBody>
                </MDBCard>
              </>
            )}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
