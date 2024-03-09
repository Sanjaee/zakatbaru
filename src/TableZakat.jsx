import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./utils/api";
import "./styles/table.css"; // Import your CSS file for styling
import Jam from "./Jam";

const TableZakat = () => {
  const [zakat, setZakat] = useState([]);
  const [totalBerasCount, setTotalBerasCount] = useState(0);
  const [totalUangCount, setTotalUangCount] = useState(0);
  const [totalPriaCount, setTotalPriaCount] = useState(0);
  const [totalWanitaCount, setTotalWanitaCount] = useState(0);
  const [totalAllData, setTotalAllData] = useState(0); // New state variable

  useEffect(() => {
    const fetchData = async () => {
      const zakatCollection = collection(db, "datazakat");
      const zakatSnapshot = await getDocs(zakatCollection);
      const zakatData = zakatSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Calculate total counts for "beras", "uang", "pria", and "wanita"
      const berasCount = zakatData.reduce((total, data) => {
        return data.item === "beras" ? total + parseFloat(data.count) : total;
      }, 0);

      const uangCount = zakatData.reduce((total, data) => {
        return data.item === "uang" ? total + parseFloat(data.count) : total;
      }, 0);

      const priaCount = zakatData.filter(
        (data) => data.gender === "pria"
      ).length;
      const wanitaCount = zakatData.filter(
        (data) => data.gender === "wanita"
      ).length;

      // Calculate total count for all items
      const allDataCount = zakatData.length; // Use length property

      setTotalBerasCount(berasCount);
      setTotalUangCount(uangCount);
      setTotalPriaCount(priaCount);
      setTotalWanitaCount(wanitaCount);
      setTotalAllData(allDataCount);

      setZakat(zakatData);
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <img src="2.jpg" alt="" />
      <div className="dashboard-title">
        <Jam />
        <h1>Daftar Zakat</h1>

        <p>
          Total Jumblah Beras: <b>{totalBerasCount} Liter</b>
        </p>
        <p>
          Total Jumblah Uang: <b>Rp.{totalUangCount}</b>
        </p>
        <p>
          Total Jumblah Pria: <b>{totalPriaCount}</b>
        </p>
        <p>
          Total Jumblah Wanita: <b>{totalWanitaCount}</b>
        </p>
        <p>
          Total Semua Data: <b>{totalAllData}</b>{" "}
        </p>
      </div>
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Item</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {zakat.map((data, index) => (
            <tr key={data.id}>
              <td>{index + 1}</td>
              <td>{data.name}</td>
              <td>{data.gender}</td>
              <td>{data.item}</td>
              <td>{parseFloat(data.count)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <img className="img_botom" src="3.jpg" alt="" />
    </div>
  );
};

export default TableZakat;
