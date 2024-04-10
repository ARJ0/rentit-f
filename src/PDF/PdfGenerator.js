import moment from "moment";
import { equipmentCategoriesTypeName } from "../services/helper";
export const PDFHTML = ({ item, userData }) => {
return `
<div class="invoice-container">
   <div class="receipt-main col-xs-10 col-sm-10 col-md-12 col-xs-offset-1 col-sm-offset-1 col-md-offset-3">
      <div class="row">
         <div class="receipt-header">
            <div class="col-xs-6 col-sm-6 col-md-6">
               <div class="receipt-left">
                  <h1>Invoice</h1>
                  <img class="img-responsive" alt="iamgurdeeposahan" src=${"https://bootdey.com/img/Content/avatar/avatar6.png"} style="width: 71px; border-radius: 43px;" />
               </div>
            </div>
            <div class="col-xs-6 col-sm-6 col-md-6 text-right mr-5">
               <div class="receipt-right text-xl-end">
                  <h5>Company Info</h5>
                  <p>${item.companyId.company_name}</p>
                  <p>+1 ${item.companyId.mobile} <i class="fa fa-phone"></i></p>
                  <p>${item.companyId.email} <i class="fa fa-envelope-o"></i></p>
                  <p>${item.companyId.address} <i class="fa fa-location-arrow"></i></p>
               </div>
            </div>
         </div>
      </div>
      <div class="row">
         <div class="receipt-header receipt-header-mid">
            <div class="col-xs-8 col-sm-8 col-md-8 text-left">
               <div class="receipt-right text-start">
                  <h5>Customer Info</h5>
                  <p>${userData.fname} ${userData.lname}</p>
                  <p>+1 ${userData.mobile}</p>
                  <p>${userData.email}</p>
                  <p>${userData.address}</p>
               </div>
            </div>
         </div>
      </div>
      <div>
         <table class="table table-bordered">
            <thead>
               <tr>
                  <th>Description</th>
                  <th>Amount </th>
               </tr>
            </thead>
            <tbody>
               <tr>
                  <td class="col-md-9 min-vh-100" style="overflow: auto;">
                     <p><b>Name :</b>${item.equipmentId.title}</p>
                     <p><b>Type :</b>${equipmentCategoriesTypeName[item.equipmentId.category]}</p>
                  </td>
               </tr>
               <tr>
                  <td class="col-md-9">Per Day Rent </td>
                  <td class="col-md-3"><i class="fa fa-inr"></i> $ ${item.equipmentId.rent}</td>
               </tr>
               <tr>
                  <td class="col-md-9">
                     Total days
                  </td>
                  <td class="col-md-3"><i class="fa fa-inr"></i> ${moment(item.endDate).diff(item.startDate, 'days') + 1}</td>
               </tr>
               <tr>
                  <td class="text-right">
                     <p>
                        <strong>Total Amount: </strong>
                     </p>
                  </td>
                  <td>
                     <p>
                        <strong><i class="fa fa-inr"></i> $ ${item.totalRent}</strong>
                     </p>
                  </td>
               </tr>
               <tr>
                  <td class="text-right">
                     <h2><strong>Payable Amount: </strong></h2>
                  </td>
                  <td class="text-left text-danger">
                     <h2><strong><i class="fa fa-inr"></i> $ ${item.totalRent + 100}</strong></h2>
                  </td>
               </tr>
            </tbody>
         </table>
      </div>
      <div class="row">
         <div class="receipt-header receipt-header-mid receipt-footer">
            <div class="col-xs-8 col-sm-8 col-md-8 text-left">
               <div class="receipt-right text-start">
                  <p><b>Date :</b> ${moment().format('LL')}</p>
                  <h5 style="color: rgb(140, 140, 140)">Thanks for renting.!</h5>
               </div>
            </div>
            <div class="col-xs-4 col-sm-4 col-md-4">
               <div class="receipt-left">
                  <h1 style="color: rgb(140, 140, 140)">Stamp</h1>
               </div>
            </div>
         </div>
      </div>
   </div>
</div>
`
}
export const PDFCSS = `
.receipt-header::before {
   content: "RENTIT";
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%) rotate(-40deg);
   opacity: 0.3;
   font-size: 10em;
   color: #dcdcdc;
   pointer-events: none;
}
.text-danger strong {
   color: #9f181c;
}

.receipt-main p {
   color: #333333;
   line-height: 1.42857;
}

.receipt-footer h1 {
   font-size: 15px;
   font-weight: 400 !important;
   margin: 0 !important;
}

.receipt-main thead {
   background: #414143 none repeat scroll 0 0;
}

.receipt-right h5 {
   font-size: 16px;
   font-weight: bold;
   margin: 0 0 7px 0;
   margin-top: 30px;
}

.receipt-right p {
   font-size: 12px;
   margin: 0px;
}

.receipt-right p i {
   text-align: center;
   width: 18px;
}

.receipt-main td {
   padding: 9px 20px !important;
}

.receipt-main th {
   padding: 13px 20px !important;
}

.receipt-main td {
   font-size: 13px;
   font-weight: initial !important;
}

.receipt-main td p:last-child {
   margin: 0;
   padding: 0;
}

.receipt-main td h2 {
   font-size: 20px;
   font-weight: 900;
   margin: 0;
   text-transform: uppercase;
}

.receipt-header-mid .receipt-left h1 {
   font-weight: 100;
   margin: 34px 0 0;
   text-align: right;
   text-transform: uppercase;
}

.receipt-header-mid {
   margin: 24px 0;
   overflow: hidden;
}

#container-pdf {
   background-color: #dcdcdc;
}

.watermark-container {
   position: fixed;
   top: 100%;
   left: 50%;
   transform: translate(-50%, -50%);
   opacity: 0.2;
   pointer-events: none;
}

.receipt-main {
   padding: 20px;
   background-color: #fff;
   border: 1px solid #dee2e6;
   border-radius: 5px;
   margin-top: 20px;
}

.receipt-header {
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-bottom: 20px;
}

.receipt-left img {
   width: 71px;
   border-radius: 43px;
}

.receipt-right {
   text-align: right;
}

.receipt-right h5 {
   font-size: 18px;
   margin-bottom: 10px;
}

.receipt-right p {
   margin: 5px 0;
}

.receipt-header-mid {
   margin-bottom: 20px;
}

.table-bordered {
   width: 100%;
   border-collapse: collapse;
   margin-bottom: 20px;
}

.table-bordered th,
.table-bordered td {
   border: 1px solid #dee2e6;
   padding: 8px;
   text-align: left;
}

.text-right,
.text-xl-end {
   text-align: right;
}

.text-left {
   text-align: left;
}

.text-danger {
   color: red;
}

.receipt-footer {
   display: flex;
   justify-content: space-between;
   align-items: center;
}

.receipt-footer h5 {
   color: #8c8c8c;
}

.receipt-footer h1 {
   font-size: 24px;
   color: #000;
}
`



export const testSvg = (
   <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 797 277">
   <rect class="cls-1" width="797" height="277"/>
   <g>
     <path class="cls-2" d="M91.7,160.2v72.6h-35.1V43.1h55.7c3,0,6.1,0,9.3.3,22.5,0,39.4,19.4,39.6,40.8v9.5c0,9.3-.3,18.8-.3,28-.3,14.9-8.3,27.9-19.6,34.6l25.6,76.8h-36l-23.5-72.7h-15.7v-.2ZM111.2,70.7h-19.5v64.3h22c7.1,0,10.1-5.4,10.7-11.4.5-6.8.9-13.8.9-20.6s-.5-13.8-.9-20.6c-1.1-7.9-5.2-11.7-13.2-11.7h0ZM253.5,146.5h-37.4v60.6h56.4v25.8h-91.7V43.1h91.7v25.8h-56.4v52.3h37.4v25.3h0ZM370.3,43.1h35.6v189.9h-36.6l-43-115.1v115.1h-35.6V43.1h37.9l41.9,110V43.1s-.2,0-.2,0ZM463.5,68.8h-40.1v-25.7h115.6v25.8h-40.1v164h-35.5V68.9h.1v-.1Z"/>
     <path class="cls-2" d="M557.1,43.1h41.9v190.9h-41.9V43.1ZM561.8,47.6v181.8h32.6V47.6h-32.6ZM740.4,73.4h-38.8v160.6h-41.8V73.4h-38.8v-30h119l.4,30h0ZM697,229.4V68.8h38.8v-21h-109.7v20.8h38.8v160.6h32.1v.2Z"/>
   </g>
 </svg>
)