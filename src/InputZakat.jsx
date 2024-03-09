// InputZakat.js
import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./utils/api";
import "./styles/input.css";

export const InputZakat = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    item: "",
    createdAt: "",
    count: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.name.trim() === "") {
      alert("Name Tidak Boleh Kosong");
      return;
    }

    // Validate if there is a dot in the count field for "beras"
    if (formData.item === "uang" && formData.count.includes(".")) {
      alert("Tidak boleh ada titik karena titik untuk hitungan beras");
      return;
    }
    if (formData.item === "beras" && parseFloat(formData.count) > 100) {
      alert("Jumlah beras tidak boleh lebih dari 100 liter");
      return;
    }

    // Set the createdAt field to the current date
    const currentDate = new Date().toLocaleString();

    // Add the new Zakat data to the "datazakat" collection
    try {
      const zakatCollection = collection(db, "datazakat");
      await addDoc(zakatCollection, {
        ...formData,
        createdAt: currentDate,
      });

      // Clear the form after submission
      setFormData({
        name: "",
        gender: "",
        item: "",
        createdAt: "",
        count: "",
      });
    } catch (error) {
      console.error("Error adding Zakat data: ", error.message);
    }
  };

  return (
    <div className="containerInput">
      <h1>Input Zakat</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Gender:
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="pria">Pria</option>
            <option value="wanita">Wanita</option>
          </select>
        </label>
        <br />
        <label>
          Item:
          <select name="item" value={formData.item} onChange={handleChange}>
            <option value="">Select Item</option>
            <option value="beras">Beras</option>
            <option value="uang">Uang</option>
          </select>
        </label>
        <br />
        <label>
          Count:
          <input
            type="text"
            name="count"
            value={formData.count}
            onChange={handleChange}
          />
        </label>
        <br />

        <p>{formData.createdAt}</p>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
