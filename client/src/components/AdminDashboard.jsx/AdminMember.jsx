import axios from "axios";
import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useNavigate } from "react-router-dom";
import Btn from "../../subcomponents/buttons/Btn";
import Input from "../../subcomponents/inputs/Input";
import Title from "../../subcomponents/title/Title";
import AdminMenu from "../navbar/AdminMenu";
import LoveLoader from "../PopUpComponent/LoveLoader";

const AdminMember = () => {
  const [members, setMembers] = useState([]);

  axios
    .get("/api/auth/getAllmembers", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => {
      //console.log(res.data);
      setMembers(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  let serialNO = 0;

  const GenerateInvoice = ({ amountPaid, id, type }) => {
    axios(`/api/auth/invoice/${type}/${amountPaid}/${id}`, {
      method: "GET",
      responseType: "blob", //Force to receive data in a Blob Format
    })
      .then((response) => {
        //Create a Blob from the PDF Stream
        const file = new Blob([response.data], { type: "application/pdf" });
        //Build a URL from the file
        const fileURL = URL.createObjectURL(file);
        //Open the URL on new Window
        window.open(fileURL);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div style={{ backgroundColor: "yellow" }}>
      {/* Admin Navbar */}
      <div>
        <AdminMenu />
      </div>{" "}
      <div className="mx-10">
        <div>
          <Title title="Members" />
        </div>
        <div className="flex justify-center">
          <table class="fixed-table">
            <thead className="table-header-row">
              <tr>
                <th scope="col" style={{ width: "70px" }} rowspan="2">
                  Sr. No.
                </th>
                <th scope="col" rowspan="2">
                  User ID
                </th>
                <th scope="col" rowspan="2">
                  Activation Date
                </th>
                <th scope="col" rowspan="2">
                  Expires On{" "}
                </th>
                <th scope="col" rowspan="2">
                  Amount Paid{" "}
                </th>
                <th scope="col" rowspan="2">
                  Invoice
                </th>
                <th scope="col" rowspan="2">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => {
                
                const id = member.id ? member.id : null;
                const activationDate = member.activeDate
                  ? member.activeDate
                  : null;
                const amountPaid = member.amountpaid ? member.amountpaid : null;
                const type = member.type ? member.type : null;
                
                serialNO = serialNO + 1;

                //activationDate
                var date = new Date(activationDate);
                var dd = String(date.getDate()).padStart(2, "0");
                var mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
                var yyyy = date.getFullYear();
              
                date = mm + "/" + dd + "/" + yyyy;

                //ExpiryDate
                var expirydate = new Date(member.expiryDate);
                var dd = String(expirydate.getDate()).padStart(2, "0");
                var mm = String(expirydate.getMonth() + 1).padStart(2, "0"); //January is 0!
                var yyyy = expirydate.getFullYear();
              
                expirydate = mm + "/" + dd + "/" + yyyy;
                
                const curr = new Date().getTime();
                const exp = new Date(member.expiryDate).getTime();

                if(exp>curr){
                  var status = "Active"
                }
                else{
                  var status = "Expired"
                }
                return (
                  <tr>
                    <td scope="col" style={{ width: "70px" }} rowspan="2">
                      {serialNO}
                    </td>
                    <td scope="col" rowspan="2">
                      {id}
                    </td>
                    <td scope="col" rowspan="2">
                      {date}
                    </td>
                    <td scope="col" rowspan="2">
                      {expirydate}
                    </td>
                    <td scope="col" rowspan="2">
                      {amountPaid}
                    </td>
                    <td scope="col" rowspan="2">
                      <button
                        className="hover:underline"
                        onClick={() => {
                          GenerateInvoice({ amountPaid, id, type });
                        }}
                      >
                        Download
                      </button>
                    </td>
                    <td scope="col" rowspan="2">
                      {status}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminMember;
