import React, { useEffect, useState } from "react";
import AboutImg from "../../src/assets/donate1.jpg";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { baseURL } from "../../config";
import { loadStripe } from "@stripe/stripe-js";
import { getPrice } from "../constants/getPrice";

const Donate = () => {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const newformData = searchParams.get("Name") && {
    Name: searchParams.get("Name"),
    Amount: getPrice(searchParams.get("Amount")),
    Cause: searchParams.get("Cause"),
  };
  const users = JSON.parse(localStorage.getItem("users")) || [];
  console.log(users);
  useEffect(() => {
    if (newformData) {
      const userExist = users.some((val) => val.Name == newformData.Name);
      if (!userExist) {
        users.push(newformData);
        localStorage.setItem("users", JSON.stringify(users));
        // localStorage.clear()
        console.log("call");
      }
    }
  }, [location]);

  const [formData, setFormData] = useState({
    Name: "",
    PhoneNumber: "",
    Place: "",
    Amount: "",
    Cause: "Education",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const { Name, PhoneNumber, Place, Amount } = formData;

    // if (!Name.trim() || !PhoneNumber.trim() || !Place.trim() || !Amount.trim()) {
    //   setErrorMessage('Please fill out all fields.');
    //   return;
    // }
    // if (Name.length < 3) {
    //   setErrorMessage('Name must be at least 3 characters.');
    //   return;
    // }
    // if (Name.length > 25) {
    //   setErrorMessage('Full Name must be less than 25 characters.');
    //   return;
    // }
    // if (PhoneNumber.length !== 10 || isNaN(PhoneNumber)) {
    //   setErrorMessage('Phone Number must be exactly 10 numeric characters.');
    //   return;
    // }
    // if (Place.length < 3) {
    //   setErrorMessage('Place must be at least 3 characters.');
    //   return;
    // }
    // if (Place.length > 25) {
    //   setErrorMessage('Place must be less than 25 characters.');
    //   return;
    // }
    // if (isNaN(Amount)) {
    //   setErrorMessage('Amount must be in numeric format.');
    //   return;
    // }
    // try {
    //   await axios.post(`${baseURL}/api/donations`, formData);
    //   setFormData({ Name: '', PhoneNumber: '', Place: '', Amount: '' });
    //   setErrorMessage('');
    //   navigate('/donation-details', { state: { formData } });
    // } catch (error) {
    //   console.error('Error making donation', error);
    //   alert('Failed to make donation. Please try again later.');
    // }
    const stripePromise = loadStripe(
      "pk_test_51N5opgSB4aBHJM7aV6HE1GuwKPba8dyLcPDCEGbcFS1oFNKvtI7dEp5f5c8964ifIVnFWDXtKNrlmNVinstvigEY00PRH7xYuC"
    );
    const stripe = await stripePromise;
    const params = new URLSearchParams(formData).toString();

    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          // Use the price ID that corresponds to ₹2000
          price: formData?.Amount, // Replace with the actual price ID
          quantity: 1,
        },
      ],
      mode: "payment",
      successUrl: `https://dionation-app.vercel.app/donate?${params}`, // Replace with your actual success URL
      cancelUrl: "https://dionation-app.vercel.app/donate",

      shippingAddressCollection: {
        allowedCountries: ["IN", "US", "GB"], // List of allowed countries, can be adjusted
      },
      // Enable billing address collection (optional)
      billingAddressCollection: "auto", // Set to "auto" if you want Stripe to decide
    });
  };

  console.log(formData, "form");

  return (
    <section className="pt-[140px] 2xl:h-[800px]">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-[30px] items-center justify-between">
          <div className="flex-1 flex justify-center">
            <img src={AboutImg} alt="" className="w-full h-auto" />
          </div>
          <div className="flex-1">
            <div className="px-4 mx-auto max-w-screen-md">
              <form
                className="space-y-8 mt-1 hero__section"
                onSubmit={handleSubmit}
              >
                <div>
                  <label htmlFor="fullName" className="form__label">
                    Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="Name"
                    className="form__input mt-1"
                    value={formData.Name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="phoneNumber" className="form__label">
                    Phone number
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    name="PhoneNumber"
                    className="form__input mt-1"
                    value={formData.PhoneNumber}
                    onChange={handleChange}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="place" className="form__label">
                    Place
                  </label>
                  <input
                    type="text"
                    id="place"
                    name="Place"
                    className="form__input mt-1"
                    value={formData.Place}
                    onChange={handleChange}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="amount" className="form__label">
                    Cause
                  </label>

                  <select
                    id="options"
                    value={formData.Cause}
                    onChange={handleChange}
                    className="form__input mt-1"
                    name="Cause"
                  >
                    <option value="Education">Education</option>
                    <option value="Health">Health</option>
                    <option value="Food">Food</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="amount" className="form__label">
                    Amount (₹)
                  </label>

                  <select
                    id="options"
                    value={formData.Amount}
                    onChange={handleChange}
                    className="form__input mt-1"
                    name="Amount"
                  >
                    <option value="price_1Q5L6KSB4aBHJM7aQ5Lr5CIE">200</option>
                    <option value="price_1Q5Pl2SB4aBHJM7aZSWJBU0E">500</option>
                    <option value="price_1Q5PlWSB4aBHJM7awnVcu8zw">1000</option>
                    <option value="price_1Q5Pm3SB4aBHJM7a9S8ZBuUG">2000</option>
                    <option value="price_1Q5PmaSB4aBHJM7axnvEn6x8">3000</option>
                    <option value="price_1Q5Pn7SB4aBHJM7aYfh9P01c">5000</option>
                  </select>

                  {/*  <input
                    type="text"
                    id="amount"
                    name="Amount"
                    className="form__input mt-1"
                    value={formData.Amount}
                    onChange={handleChange}
                  />*/}
                </div>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                <button type="submit" className="btn rounded sm:w-fit">
                  Next
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Donate;
